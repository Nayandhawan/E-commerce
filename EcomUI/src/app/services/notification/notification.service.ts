import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserStorageService } from '../storage/user-storage.service';

const BASE = 'http://localhost:8080/api/customer/notifications';

@Injectable({ providedIn: 'root' })
export class NotificationService implements OnDestroy {

  private unreadCount$ = new BehaviorSubject<number>(0);
  unreadCount = this.unreadCount$.asObservable();

  private pollSub: Subscription | null = null;

  constructor(private http: HttpClient) {}

  startPolling() {
    if (this.pollSub) return;
    this.fetchUnreadCount();
    this.pollSub = interval(30000).pipe(
      switchMap(() => this.http.get<{ count: number }>(`${BASE}/${UserStorageService.getUserId()}/unread-count`))
    ).subscribe(res => this.unreadCount$.next(res.count));
  }

  stopPolling() {
    this.pollSub?.unsubscribe();
    this.pollSub = null;
    this.unreadCount$.next(0);
  }

  fetchUnreadCount() {
    const userId = UserStorageService.getUserId();
    if (!userId) return;
    this.http.get<{ count: number }>(`${BASE}/${userId}/unread-count`)
      .subscribe(res => this.unreadCount$.next(res.count));
  }

  getNotifications() {
    return this.http.get<any[]>(`${BASE}/${UserStorageService.getUserId()}`);
  }

  markAllRead() {
    const userId = UserStorageService.getUserId();
    return this.http.patch(`${BASE}/${userId}/read-all`, {}).subscribe(() => {
      this.unreadCount$.next(0);
    });
  }

  ngOnDestroy() { this.stopPolling(); }
}
