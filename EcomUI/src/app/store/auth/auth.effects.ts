import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { UserStorageService } from '../../services/storage/user-storage.service';
import { login, loginSuccess, loginFailure, logout } from './auth.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ username, password }) =>
        (this.authService.login(username, password) as Observable<boolean>).pipe(
          map(() => {
            const user = UserStorageService.getUser();
            const token = UserStorageService.getToken();
            return loginSuccess({ user, token });
          }),
          catchError(() => of(loginFailure({ error: 'Bad Credentials' })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(({ user }) => {
          if (user?.role === 'ADMIN') {
            this.router.navigateByUrl('admin/dashboard');
          } else {
            this.router.navigateByUrl('customer/dashboard');
          }
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          UserStorageService.signOut();
          this.router.navigateByUrl('login');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
