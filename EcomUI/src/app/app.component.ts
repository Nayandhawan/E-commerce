import { Component, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UserStorageService } from './services/storage/user-storage.service';
import { Router } from '@angular/router';
import { NotificationService } from './services/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('buttonHover', [
      state('normal', style({ transform: 'scale(1)', backgroundColor: '#fff' })),
      state('hovered', style({ transform: 'scale(1.1)', backgroundColor: '#e0e0e0' })),
      transition('normal <=> hovered', animate('300ms ease-in-out'))
    ])
  ]
})
export class AppComponent {
  buttonStates: { [key: string]: string } = {
    'trackOrder': 'normal', 'register': 'normal', 'login': 'normal'
  };
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();
  isCustomerLoggedIn: boolean = UserStorageService.isCustomerLoggedIn();
  dropdownOpen = false;
  mobileMenuOpen = false;
  notifOpen = false;
  notifications: any[] = [];
  unreadCount = 0;
  readonly currentYear = new Date().getFullYear();
  userDetails: any = null;
  userName = '';
  userInitial = '';

  constructor(private router: Router, public notifService: NotificationService) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
      this.loadUser();
      if (this.isCustomerLoggedIn) {
        this.notifService.startPolling();
      } else {
        this.notifService.stopPolling();
      }
    });
    this.loadUser();
    if (this.isCustomerLoggedIn) this.notifService.startPolling();
    this.notifService.unreadCount.subscribe(c => this.unreadCount = c);
  }

  private loadUser() {
    if (UserStorageService.isCustomerLoggedIn()) {
      this.userDetails = UserStorageService.getUser();
      const name: string = this.userDetails?.name ?? this.userDetails?.email ?? 'User';
      this.userName = name.split(' ')[0];
      this.userInitial = name.charAt(0).toUpperCase();
    }
  }

  toggleNotif() {
    this.notifOpen = !this.notifOpen;
    this.dropdownOpen = false;
    if (this.notifOpen) {
      this.notifService.getNotifications().subscribe(list => {
        this.notifications = list;
        this.notifService.markAllRead();
      });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: Event) {
    const target = e.target as HTMLElement;
    if (!target.closest('.sk-notif-wrap')) this.notifOpen = false;
    if (!target.closest('.sk-user')) this.dropdownOpen = false;
  }

  openProfile() {
    this.dropdownOpen = false;
    this.mobileMenuOpen = false;
    this.router.navigateByUrl('customer/profile');
  }

  closeMobileMenu() { this.mobileMenuOpen = false; }

  logout() {
    this.mobileMenuOpen = false;
    this.notifService.stopPolling();
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }

  onMouseEnter(button: string) { this.buttonStates[button] = 'hovered'; }
  onMouseLeave(button: string) { this.buttonStates[button] = 'normal'; }
}
