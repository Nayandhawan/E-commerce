package com.stack.order.service;

import com.stack.order.dto.AnalyticsResponse;
import com.stack.order.dto.OrderDto;
import com.stack.order.entity.CartItems;
import com.stack.order.entity.Order;
import com.stack.order.enums.OrderStatus;
import com.stack.order.repository.OrderRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminOrderServiceImpl {

    private final OrderRepository orderRepository;

    public AdminOrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<OrderDto> getAllPlacedOrders() {
        return orderRepository.findAllByOrderStatusNot(OrderStatus.PENDING)
                .stream().map(this::toDto).toList();
    }

    public AnalyticsResponse getAnalytics() {
        Calendar cal = Calendar.getInstance();
        Date now = cal.getTime();

        cal.set(Calendar.DAY_OF_MONTH, 1); cal.set(Calendar.HOUR_OF_DAY, 0); cal.set(Calendar.MINUTE, 0); cal.set(Calendar.SECOND, 0);
        Date currentMonthStart = cal.getTime();

        cal.add(Calendar.MONTH, -1);
        Date previousMonthStart = cal.getTime();

        cal.add(Calendar.MONTH, 1); cal.add(Calendar.DAY_OF_MONTH, -1); cal.set(Calendar.HOUR_OF_DAY, 23); cal.set(Calendar.MINUTE, 59); cal.set(Calendar.SECOND, 59);
        Date previousMonthEnd = cal.getTime();

        List<Order> allPlaced = orderRepository.findAllByOrderStatusNot(OrderStatus.PENDING);

        long currentMonthOrders = allPlaced.stream().filter(o -> o.getDate() != null && !o.getDate().before(currentMonthStart) && !o.getDate().after(now)).count();
        long previousMonthOrders = allPlaced.stream().filter(o -> o.getDate() != null && !o.getDate().before(previousMonthStart) && !o.getDate().after(previousMonthEnd)).count();
        long currentMonthEarnings = allPlaced.stream().filter(o -> o.getDate() != null && !o.getDate().before(currentMonthStart) && !o.getDate().after(now)).mapToLong(o -> o.getAmount() != null ? o.getAmount() : 0).sum();
        long previousMonthEarnings = allPlaced.stream().filter(o -> o.getDate() != null && !o.getDate().before(previousMonthStart) && !o.getDate().after(previousMonthEnd)).mapToLong(o -> o.getAmount() != null ? o.getAmount() : 0).sum();

        long placed   = allPlaced.stream().filter(o -> o.getOrderStatus() == OrderStatus.PLACED).count();
        long shipped  = allPlaced.stream().filter(o -> o.getOrderStatus() == OrderStatus.SHIPPED).count();
        long delivered= allPlaced.stream().filter(o -> o.getOrderStatus() == OrderStatus.DELIVERED).count();

        return new AnalyticsResponse(currentMonthOrders, previousMonthOrders, currentMonthEarnings, previousMonthEarnings, placed, shipped, delivered);
    }

    public OrderDto updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId).orElseThrow();
        order.setOrderStatus(OrderStatus.valueOf(status.toUpperCase()));
        return toDto(orderRepository.save(order));
    }

    public byte[] generateSalesReport(String type, int year, Integer month, Integer quarter) {
        Date[] range = resolveDateRange(type, year, month, quarter);
        List<Order> orders = orderRepository.findByDateBetweenAndOrderStatusIn(
                range[0], range[1],
                List.of(OrderStatus.PLACED, OrderStatus.SHIPPED, OrderStatus.DELIVERED)
        );
        return buildExcel(type, year, month, quarter, orders);
    }

    private Date[] resolveDateRange(String type, int year, Integer month, Integer quarter) {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.HOUR_OF_DAY, 0); cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0); cal.set(Calendar.MILLISECOND, 0);

        switch (type.toUpperCase()) {
            case "MONTHLY" -> {
                cal.set(Calendar.YEAR, year); cal.set(Calendar.MONTH, month - 1); cal.set(Calendar.DAY_OF_MONTH, 1);
                Date start = cal.getTime();
                cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
                cal.set(Calendar.HOUR_OF_DAY, 23); cal.set(Calendar.MINUTE, 59); cal.set(Calendar.SECOND, 59);
                return new Date[]{start, cal.getTime()};
            }
            case "QUARTERLY" -> {
                int startMonth = switch (quarter) { case 1 -> 4; case 2 -> 7; case 3 -> 10; default -> 1; };
                cal.set(Calendar.YEAR, year); cal.set(Calendar.MONTH, startMonth - 1); cal.set(Calendar.DAY_OF_MONTH, 1);
                Date start = cal.getTime();
                cal.add(Calendar.MONTH, 3);
                cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
                cal.set(Calendar.HOUR_OF_DAY, 23); cal.set(Calendar.MINUTE, 59); cal.set(Calendar.SECOND, 59);
                return new Date[]{start, cal.getTime()};
            }
            default -> {
                cal.set(year, Calendar.JANUARY, 1);
                Date start = cal.getTime();
                cal.set(year, Calendar.DECEMBER, 31, 23, 59, 59);
                return new Date[]{start, cal.getTime()};
            }
        }
    }

    private byte[] buildExcel(String type, int year, Integer month, Integer quarter, List<Order> orders) {
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Sales Report");
            SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");

            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            Font hFont = workbook.createFont(); hFont.setColor(IndexedColors.WHITE.getIndex()); hFont.setBold(true);
            headerStyle.setFont(hFont); headerStyle.setAlignment(HorizontalAlignment.CENTER);

            Row titleRow = sheet.createRow(0);
            Cell titleCell = titleRow.createCell(0);
            String label = switch (type.toUpperCase()) {
                case "MONTHLY" -> new java.text.DateFormatSymbols().getMonths()[month - 1] + " " + year;
                case "QUARTERLY" -> "Q" + quarter + " " + year;
                default -> String.valueOf(year);
            };
            titleCell.setCellValue("Sales Report — " + label);
            CellStyle titleStyle = workbook.createCellStyle();
            Font tFont = workbook.createFont(); tFont.setBold(true); tFont.setFontHeightInPoints((short) 14);
            titleStyle.setFont(tFont); titleCell.setCellStyle(titleStyle);
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 7));

            String[] cols = {"Order ID", "Date", "Address", "Items", "Total Amount", "Discount", "Amount Paid", "Status"};
            Row headerRow = sheet.createRow(2);
            for (int i = 0; i < cols.length; i++) {
                Cell c = headerRow.createCell(i); c.setCellValue(cols[i]); c.setCellStyle(headerStyle);
            }

            int rowIdx = 3; long totalRevenue = 0;
            for (Order order : orders) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(order.getId());
                row.createCell(1).setCellValue(order.getDate() != null ? sdf.format(order.getDate()) : "");
                row.createCell(2).setCellValue(order.getAddress() != null ? order.getAddress() : "");
                String items = order.getCartItems() == null ? "" :
                        order.getCartItems().stream()
                                .map(ci -> "Product#" + ci.getProductId() + " x" + ci.getQuantity())
                                .collect(Collectors.joining(", "));
                row.createCell(3).setCellValue(items);
                long total = order.getTotalAmount() != null ? order.getTotalAmount() : 0L;
                long disc  = order.getDiscount() != null ? order.getDiscount() : 0L;
                long paid  = order.getAmount() != null ? order.getAmount() : 0L;
                row.createCell(4).setCellValue(total);
                row.createCell(5).setCellValue(disc);
                row.createCell(6).setCellValue(paid);
                row.createCell(7).setCellValue(order.getOrderStatus() != null ? order.getOrderStatus().name() : "");
                totalRevenue += paid;
            }

            Row sumRow = sheet.createRow(rowIdx + 1);
            CellStyle bold = workbook.createCellStyle(); Font bf = workbook.createFont(); bf.setBold(true); bold.setFont(bf);
            Cell sl = sumRow.createCell(5); sl.setCellValue("Total Revenue:"); sl.setCellStyle(bold);
            Cell sv = sumRow.createCell(6); sv.setCellValue(totalRevenue); sv.setCellStyle(bold);

            for (int i = 0; i < cols.length; i++) sheet.autoSizeColumn(i);

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            return out.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Failed to generate sales report", e);
        }
    }

    private OrderDto toDto(Order o) {
        OrderDto dto = new OrderDto();
        dto.setId(o.getId()); dto.setOrderDescription(o.getOrderDescription());
        dto.setAddress(o.getAddress()); dto.setDate(o.getDate());
        dto.setAmount(o.getAmount()); dto.setOrderStatus(o.getOrderStatus());
        dto.setTrackingId(o.getTrackingId()); dto.setUserName("User #" + o.getUserId());
        if (o.getCoupon() != null) dto.setCouponName(o.getCoupon().getName());
        return dto;
    }
}
