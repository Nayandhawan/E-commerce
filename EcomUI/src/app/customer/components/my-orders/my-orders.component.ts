import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent implements OnInit {
  myOrders: any[] = [];
  cancellingId: number | null = null;

  showReturnDialog = false;
  returnOrderId: number | null = null;
  returnReason = '';
  returningId: number | null = null;

  constructor(
    private customerService: CustomerService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getMyOrders();
  }

  getMyOrders() {
    this.customerService.getOrdersByUserId().subscribe(res => {
      this.myOrders = res;
    });
  }

  canCancel(order: any): boolean {
    return order.orderStatus === 'PLACED';
  }

  canReturn(order: any): boolean {
    return order.orderStatus === 'DELIVERED';
  }

  cancelOrder(orderId: number) {
    this.cancellingId = orderId;
    this.customerService.cancelOrder(orderId).subscribe({
      next: () => {
        this.cancellingId = null;
        this.messageService.add({ severity: 'success', summary: 'Order Cancelled', detail: 'Your order has been cancelled.', life: 4000 });
        this.getMyOrders();
      },
      error: (err) => {
        this.cancellingId = null;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error || 'Could not cancel the order.', life: 4000 });
      }
    });
  }

  openReturnDialog(orderId: number) {
    this.returnOrderId = orderId;
    this.returnReason = '';
    this.showReturnDialog = true;
  }

  submitReturn() {
    if (!this.returnOrderId || !this.returnReason.trim()) return;
    this.returningId = this.returnOrderId;
    this.showReturnDialog = false;
    this.customerService.requestReturn(this.returnOrderId, this.returnReason.trim()).subscribe({
      next: () => {
        this.returningId = null;
        this.returnOrderId = null;
        this.messageService.add({ severity: 'success', summary: 'Return Requested', detail: 'Your return request has been submitted.', life: 5000 });
        this.getMyOrders();
      },
      error: (err) => {
        this.returningId = null;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error || 'Could not submit return request.', life: 4000 });
      }
    });
  }

  statusLabel(status: string): string {
    return status ? status.replace(/_/g, ' ') : status;
  }

  downloadInvoice(order: any) {
    const date = order.date ? new Date(order.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Invoice #${order.id}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Arial, sans-serif; font-size: 13px; color: #111; padding: 40px; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
  .brand { font-size: 22px; font-weight: 800; color: #ff9900; }
  .brand small { display: block; font-size: 11px; font-weight: 400; color: #555; }
  .inv-title { font-size: 18px; font-weight: 700; text-align: right; }
  .inv-title small { display: block; font-size: 12px; font-weight: 400; color: #666; }
  .divider { border: none; border-top: 1px solid #ddd; margin: 16px 0; }
  .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 24px; font-size: 12px; }
  .meta-label { color: #666; font-weight: 600; text-transform: uppercase; letter-spacing: .5px; }
  .meta-value { color: #111; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
  th { background: #f5f5f5; padding: 8px 10px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: .5px; }
  td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 12px; }
  .totals { margin-left: auto; width: 220px; }
  .totals tr td:first-child { color: #555; }
  .totals tr td:last-child { text-align: right; font-family: monospace; }
  .totals tr.grand td { font-weight: 700; font-size: 14px; border-top: 2px solid #111; }
  .footer { margin-top: 40px; font-size: 11px; color: #999; text-align: center; }
  @media print { body { padding: 20px; } button { display: none !important; } }
</style></head><body>
<div class="header">
  <div class="brand">ShopKart<small>Your trusted online store</small></div>
  <div class="inv-title">TAX INVOICE<small>Invoice #${order.id}</small></div>
</div>
<hr class="divider">
<div class="meta-grid">
  <div><span class="meta-label">Date</span><br><span class="meta-value">${date}</span></div>
  <div><span class="meta-label">Tracking ID</span><br><span class="meta-value" style="font-family:monospace;font-size:10px">${order.trackingId || '—'}</span></div>
  <div><span class="meta-label">Bill To</span><br><span class="meta-value">${order.userName || '—'}</span></div>
  <div><span class="meta-label">Ship To</span><br><span class="meta-value">${order.address || '—'}</span></div>
</div>
<hr class="divider">
<table>
  <thead><tr><th>#</th><th>Status</th><th style="text-align:right">Amount Paid</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>Order ${order.id} — ${order.orderStatus}</td><td style="text-align:right;font-family:monospace">₹${(order.amount || 0).toLocaleString('en-IN')}</td></tr>
  </tbody>
</table>
<table class="totals">
  <tr><td>Subtotal</td><td>₹${(order.totalAmount || order.amount || 0).toLocaleString('en-IN')}</td></tr>
  ${order.totalAmount && order.amount && order.totalAmount !== order.amount ? `<tr><td>Discount</td><td>−₹${(order.totalAmount - order.amount).toLocaleString('en-IN')}</td></tr>` : ''}
  <tr><td>Delivery</td><td>FREE</td></tr>
  <tr class="grand"><td>Total Paid</td><td>₹${(order.amount || 0).toLocaleString('en-IN')}</td></tr>
</table>
<div class="footer">This is a computer-generated invoice and does not require a signature. Thank you for shopping with ShopKart!</div>
<br>
<div style="text-align:center"><button onclick="window.print()" style="padding:8px 24px;background:#ff9900;border:none;border-radius:6px;font-weight:700;cursor:pointer;font-size:13px">Print / Save as PDF</button></div>
</body></html>`;

    const w = window.open('', '_blank');
    if (w) { w.document.write(html); w.document.close(); }
  }
}
