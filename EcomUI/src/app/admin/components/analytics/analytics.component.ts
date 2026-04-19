import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../service/admin.service';

interface PeriodOption {
  label: string;
  params: Record<string, number>;
}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AnalyticsComponent implements OnInit {

  data: any;
  reportForm: FormGroup;
  periodOptions: PeriodOption[] = [];
  downloading = false;

  // Chart
  chartData: any = null;
  chartOptions: any;
  chartLoading = false;

  fromYear: number | null = null;
  toYear: number | null = null;
  yearOptions: number[] = [];

  reportTypes = [
    { value: 'YEARLY', label: 'Yearly' },
    { value: 'QUARTERLY', label: 'Quarterly' },
    { value: 'MONTHLY', label: 'Monthly' }
  ];

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.adminService.getAnalytics().subscribe(res => {
      this.data = res;
    });

    this.reportForm = this.fb.group({
      type: [null, Validators.required],
      period: [null, Validators.required]
    });

    // Build year options: 2019 → current year
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 2019; y--) {
      this.yearOptions.push(y);
    }

    this.buildChartOptions();

    // Default: load current year
    this.fromYear = currentYear;
    this.toYear = currentYear;
    this.loadChart();
  }

  onFromYearChange(year: number): void {
    this.fromYear = year;
    if (this.toYear !== null && this.toYear < year) {
      this.toYear = year;
    }
    this.loadChart();
  }

  onToYearChange(year: number): void {
    this.toYear = year;
    if (this.fromYear !== null && this.fromYear > year) {
      this.fromYear = year;
    }
    this.loadChart();
  }

  get toYearOptions(): number[] {
    if (this.fromYear === null) return this.yearOptions;
    return this.yearOptions.filter(y => y >= this.fromYear!);
  }

  private loadChart(): void {
    if (this.fromYear === null || this.toYear === null) return;
    this.chartLoading = true;

    this.adminService.getSalesChart(this.fromYear, this.toYear).subscribe({
      next: (res) => {
        this.chartData = {
          labels: res.labels,
          datasets: [{
            label: 'Sales (₹)',
            data: res.amounts,
            fill: true,
            tension: 0.4,
            borderColor: '#007185',
            backgroundColor: 'rgba(0,113,133,0.10)',
            pointBackgroundColor: '#007185',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
          }]
        };
        this.chartLoading = false;
      },
      error: () => {
        this.chartLoading = false;
      }
    });
  }

  private buildChartOptions(): void {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#fff',
          borderColor: '#D5D9D9',
          borderWidth: 1,
          titleColor: '#0F1111',
          bodyColor: '#565959',
          padding: 12,
          callbacks: {
            label: (ctx: any) => ` ₹${ctx.parsed.y.toLocaleString('en-IN')}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#565959', font: { size: 12 } },
          border: { color: '#D5D9D9' }
        },
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.05)' },
          ticks: {
            color: '#565959',
            font: { size: 11 },
            callback: (value: number) => {
              if (value >= 100000) return '₹' + (value / 100000).toFixed(1) + 'L';
              if (value >= 1000)   return '₹' + (value / 1000).toFixed(0) + 'K';
              return '₹' + value;
            }
          },
          border: { color: '#D5D9D9' }
        }
      }
    };
  }

  onTypeChange(type: string): void {
    this.reportForm.get('period')?.setValue(null);
    this.periodOptions = this.buildPeriodOptions(type);
  }

  private buildPeriodOptions(type: string): PeriodOption[] {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (type === 'YEARLY') {
      return Array.from({ length: 10 }, (_, i) => {
        const year = currentYear - i;
        return { label: String(year), params: { year } };
      });
    }

    if (type === 'MONTHLY') {
      const options: PeriodOption[] = [];
      for (let month = currentMonth; month >= 1; month--) {
        const label = new Date(currentYear, month - 1, 1).toLocaleString('default', {
          month: 'long', year: 'numeric'
        });
        options.push({ label, params: { year: currentYear, month } });
      }
      return options;
    }

    if (type === 'QUARTERLY') {
      const getQuarter = (month: number): number => {
        if (month >= 4 && month <= 6) return 1;
        if (month >= 7 && month <= 9) return 2;
        if (month >= 10 && month <= 12) return 3;
        return 4;
      };
      const currentFYStart = currentMonth >= 4 ? currentYear : currentYear - 1;
      const currentFYEnd = currentFYStart + 1;
      const currentQ = getQuarter(currentMonth);
      const qMonthLabels = ['Apr–Jun', 'Jul–Sep', 'Oct–Dec', 'Jan–Mar'];
      const fyLabel = `FY ${currentFYStart}–${String(currentFYEnd).slice(-2)}`;

      const options: PeriodOption[] = [];
      for (let q = currentQ; q >= 1; q--) {
        const qYear = q === 4 ? currentFYEnd : currentFYStart;
        options.push({
          label: `Q${q} ${qMonthLabels[q - 1]} ${fyLabel}`,
          params: { year: qYear, quarter: q, fyStart: currentFYStart }
        });
      }
      return options;
    }

    return [];
  }

  downloadReport(): void {
    if (this.reportForm.invalid) {
      this.reportForm.markAllAsTouched();
      return;
    }
    const { type, period } = this.reportForm.value as { type: string; period: PeriodOption };
    this.downloading = true;

    this.adminService.getSalesReport(type, period.params).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sales-report-${type.toLowerCase()}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.downloading = false;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to download report', life: 4000 });
        this.downloading = false;
      }
    });
  }
}
