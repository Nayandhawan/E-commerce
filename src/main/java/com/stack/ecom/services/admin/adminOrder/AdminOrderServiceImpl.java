package com.stack.ecom.services.admin.adminOrder;


import com.stack.ecom.dto.AnalyticsResponse;
import com.stack.ecom.dto.OrderDto;
import com.stack.ecom.dto.SalesChartResponse;
import com.stack.ecom.entity.CartItems;
import com.stack.ecom.entity.Order;
import com.stack.ecom.enums.OrderStatus;
import com.stack.ecom.repository.OrderRepository;
import com.stack.ecom.services.email.EmailService;
import com.stack.ecom.services.notification.NotificationService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdminOrderServiceImpl implements AdminOrderService{

    private final OrderRepository orderRepository;
    private final NotificationService notificationService;
    private final EmailService emailService;

    public AdminOrderServiceImpl(OrderRepository orderRepository, NotificationService notificationService,
                                 EmailService emailService) {
        this.orderRepository = orderRepository;
        this.notificationService = notificationService;
        this.emailService = emailService;
    }

    public List<OrderDto> getAllPlacedOrders(){
        List<Order> orderList = orderRepository.findAllByOrderStatusIn(List.of(
                OrderStatus.PLACED, OrderStatus.SHIPPED, OrderStatus.DELIVERED,
                OrderStatus.RETURN_REQUESTED, OrderStatus.RETURNED));
        return orderList.stream().map(Order::getOrderDto).collect(Collectors.toList());
    }

    public OrderDto changeOrderStatus(Long orderId, String status){
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()){
            Order order = optionalOrder.get();
            if (Objects.equals(status, "Shipped")){
                order.setOrderStatus(OrderStatus.SHIPPED);
                notificationService.create(order.getUser().getId(),
                    "Your order #" + orderId + " has been shipped!");
                emailService.sendShippingNotification(
                    order.getUser().getEmail(), order.getUser().getName(), order);
            } else if (Objects.equals(status, "Delivered")) {
                order.setOrderStatus(OrderStatus.DELIVERED);
                notificationService.create(order.getUser().getId(),
                    "Your order #" + orderId + " has been delivered. Enjoy!");
            }
            return orderRepository.save(order).getOrderDto();
        }
        return null;
    }

    public OrderDto processReturn(Long orderId, String action) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isEmpty()) return null;
        Order order = optionalOrder.get();
        if (order.getOrderStatus() != OrderStatus.RETURN_REQUESTED) return null;
        Long userId = order.getUser().getId();
        if ("approve".equalsIgnoreCase(action)) {
            order.setOrderStatus(OrderStatus.RETURNED);
            notificationService.create(userId, "Your return request for order #" + orderId + " has been approved.");
        } else if ("reject".equalsIgnoreCase(action)) {
            order.setOrderStatus(OrderStatus.DELIVERED);
            order.setReturnReason(null);
            notificationService.create(userId, "Your return request for order #" + orderId + " was rejected.");
        }
        return orderRepository.save(order).getOrderDto();
    }

    public AnalyticsResponse calculateAnalytics(){
        LocalDate currentDate = LocalDate.now();
        LocalDate previousMonthDate = currentDate.minusMonths(1);

        Long currentMonthOrders = getTotalOrdersForMonth(currentDate.getMonthValue(), currentDate.getYear());
        Long previousMonthOrders = getTotalOrdersForMonth(previousMonthDate.getMonthValue(), previousMonthDate.getYear());

        Long currentMonthEarnings = getTotalEarningsForMonth(currentDate.getMonthValue(), currentDate.getYear());
        Long previousMonthEarnings = getTotalEarningsForMonth(previousMonthDate.getMonthValue(), previousMonthDate.getYear());

        // Single aggregate query instead of 3 separate COUNT queries
        Map<OrderStatus, Long> statusCounts = new java.util.HashMap<>();
        orderRepository.countGroupedByStatus(List.of(OrderStatus.PLACED, OrderStatus.SHIPPED, OrderStatus.DELIVERED))
            .forEach(row -> statusCounts.put((OrderStatus) row[0], (Long) row[1]));
        Long placed = statusCounts.getOrDefault(OrderStatus.PLACED, 0L);
        Long shipped = statusCounts.getOrDefault(OrderStatus.SHIPPED, 0L);
        Long delivered = statusCounts.getOrDefault(OrderStatus.DELIVERED, 0L);

        return new AnalyticsResponse(placed, shipped, delivered, currentMonthOrders, previousMonthOrders,currentMonthEarnings, previousMonthEarnings);
    }

    public Long getTotalOrdersForMonth(int month, int year){
        Date[] range = monthRange(month, year);
        Long count = orderRepository.countByDateRangeAndStatus(range[0], range[1], OrderStatus.DELIVERED);
        return count != null ? count : 0L;
    }

    public Long getTotalEarningsForMonth(int month, int year){
        Date[] range = monthRange(month, year);
        Long sum = orderRepository.sumAmountByDateRangeAndStatus(range[0], range[1], OrderStatus.DELIVERED);
        return sum != null ? sum : 0L;
    }

    private Date[] monthRange(int month, int year) {
        Calendar cal = Calendar.getInstance();
        cal.set(year, month - 1, 1, 0, 0, 0);
        cal.set(Calendar.MILLISECOND, 0);
        Date start = cal.getTime();
        cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
        cal.set(Calendar.HOUR_OF_DAY, 23);
        cal.set(Calendar.MINUTE, 59);
        cal.set(Calendar.SECOND, 59);
        return new Date[]{start, cal.getTime()};
    }

    @Override
    public SalesChartResponse getSalesChart(int fromYear, int toYear) {
        LocalDate today = LocalDate.now();
        List<String> labels = new ArrayList<>();
        List<Long> amounts = new ArrayList<>();

        if (fromYear == toYear) {
            // Single year — show Jan → current month (or Dec if past year)
            String[] monthNames = {"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"};
            int lastMonth = (fromYear == today.getYear()) ? today.getMonthValue() : 12;
            for (int m = 1; m <= lastMonth; m++) {
                labels.add(monthNames[m - 1]);
                amounts.add(getTotalEarningsForMonth(m, fromYear));
            }
        } else {
            // Year range — one data point per year
            for (int y = fromYear; y <= toYear; y++) {
                labels.add(String.valueOf(y));
                long yearTotal = 0L;
                int lastMonth = (y == today.getYear()) ? today.getMonthValue() : 12;
                for (int m = 1; m <= lastMonth; m++) {
                    yearTotal += getTotalEarningsForMonth(m, y);
                }
                amounts.add(yearTotal);
            }
        }

        return new SalesChartResponse(labels, amounts);
    }

    @Override
    public byte[] generateSalesReport(String type, int year, Integer month, Integer quarter) {
        Date[] range = resolveDateRange(type, year, month, quarter);
        List<Order> orders = orderRepository.findByDateRangeAndStatusesWithItems(
                range[0], range[1],
                List.of(OrderStatus.PLACED, OrderStatus.SHIPPED, OrderStatus.DELIVERED)
        );
        return buildExcel(type, year, month, quarter, orders);
    }

    private Date[] resolveDateRange(String type, int year, Integer month, Integer quarter) {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);

        Date start, end;

        switch (type.toUpperCase()) {
            case "MONTHLY" -> {
                cal.set(Calendar.YEAR, year);
                cal.set(Calendar.MONTH, month - 1);
                cal.set(Calendar.DAY_OF_MONTH, 1);
                start = cal.getTime();
                cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
                cal.set(Calendar.HOUR_OF_DAY, 23);
                cal.set(Calendar.MINUTE, 59);
                cal.set(Calendar.SECOND, 59);
                end = cal.getTime();
            }
            case "QUARTERLY" -> {
                // Q1=Apr-Jun, Q2=Jul-Sep, Q3=Oct-Dec, Q4=Jan-Mar
                int startMonth = switch (quarter) {
                    case 1 -> 4;
                    case 2 -> 7;
                    case 3 -> 10;
                    default -> 1;
                };
                cal.set(Calendar.YEAR, year);
                cal.set(Calendar.MONTH, startMonth - 1);
                cal.set(Calendar.DAY_OF_MONTH, 1);
                start = cal.getTime();
                cal.add(Calendar.MONTH, 3);
                cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
                cal.set(Calendar.HOUR_OF_DAY, 23);
                cal.set(Calendar.MINUTE, 59);
                cal.set(Calendar.SECOND, 59);
                end = cal.getTime();
            }
            default -> { // YEARLY
                cal.set(Calendar.YEAR, year);
                cal.set(Calendar.MONTH, Calendar.JANUARY);
                cal.set(Calendar.DAY_OF_MONTH, 1);
                start = cal.getTime();
                cal.set(Calendar.MONTH, Calendar.DECEMBER);
                cal.set(Calendar.DAY_OF_MONTH, 31);
                cal.set(Calendar.HOUR_OF_DAY, 23);
                cal.set(Calendar.MINUTE, 59);
                cal.set(Calendar.SECOND, 59);
                end = cal.getTime();
            }
        }
        return new Date[]{start, end};
    }

    private byte[] buildExcel(String type, int year, Integer month, Integer quarter, List<Order> orders) {
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Sales Report");
            SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");

            // Header style
            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            Font headerFont = workbook.createFont();
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            headerStyle.setAlignment(HorizontalAlignment.CENTER);

            // Title row
            Row titleRow = sheet.createRow(0);
            Cell titleCell = titleRow.createCell(0);
            String periodLabel = switch (type.toUpperCase()) {
                case "MONTHLY" -> new java.text.DateFormatSymbols().getMonths()[month - 1] + " " + year;
                case "QUARTERLY" -> "Q" + quarter + " " + year;
                default -> String.valueOf(year);
            };
            titleCell.setCellValue("Sales Report — " + periodLabel);
            CellStyle titleStyle = workbook.createCellStyle();
            Font titleFont = workbook.createFont();
            titleFont.setBold(true);
            titleFont.setFontHeightInPoints((short) 14);
            titleStyle.setFont(titleFont);
            titleCell.setCellStyle(titleStyle);
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 8));

            // Column headers
            String[] columns = {"Order ID", "Date", "Customer", "Address", "Items", "Total Amount", "Discount", "Amount Paid", "Status"};
            Row headerRow = sheet.createRow(2);
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
            }

            // Data rows
            CellStyle dateCellStyle = workbook.createCellStyle();
            dateCellStyle.setAlignment(HorizontalAlignment.CENTER);

            int rowIdx = 3;
            long totalRevenue = 0;
            for (Order order : orders) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(order.getId());
                Cell dateCell = row.createCell(1);
                dateCell.setCellValue(order.getDate() != null ? sdf.format(order.getDate()) : "");
                dateCell.setCellStyle(dateCellStyle);
                row.createCell(2).setCellValue(order.getUser() != null ? order.getUser().getName() : "");
                row.createCell(3).setCellValue(order.getAddress() != null ? order.getAddress() : "");

                // Items summary
                String items = order.getCartItems() == null ? "" :
                        order.getCartItems().stream()
                                .map(ci -> ci.getProduct().getName() + " x" + ci.getQuantity())
                                .collect(Collectors.joining(", "));
                row.createCell(4).setCellValue(items);

                long totalAmt = order.getTotalAmount() != null ? order.getTotalAmount() : 0L;
                long discount = order.getDiscount() != null ? order.getDiscount() : 0L;
                long paid = order.getAmount() != null ? order.getAmount() : 0L;

                row.createCell(5).setCellValue(totalAmt);
                row.createCell(6).setCellValue(discount);
                row.createCell(7).setCellValue(paid);
                row.createCell(8).setCellValue(order.getOrderStatus() != null ? order.getOrderStatus().name() : "");

                totalRevenue += paid;
            }

            // Summary row
            Row summaryRow = sheet.createRow(rowIdx + 1);
            CellStyle summaryStyle = workbook.createCellStyle();
            Font summaryFont = workbook.createFont();
            summaryFont.setBold(true);
            summaryStyle.setFont(summaryFont);

            Cell summaryLabel = summaryRow.createCell(6);
            summaryLabel.setCellValue("Total Revenue:");
            summaryLabel.setCellStyle(summaryStyle);
            Cell summaryValue = summaryRow.createCell(7);
            summaryValue.setCellValue(totalRevenue);
            summaryValue.setCellStyle(summaryStyle);

            // Auto-size columns
            for (int i = 0; i < columns.length; i++) {
                sheet.autoSizeColumn(i);
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            return out.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Failed to generate sales report", e);
        }
    }

}
