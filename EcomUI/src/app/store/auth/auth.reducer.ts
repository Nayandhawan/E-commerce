import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure, logout } from './auth.actions';

export interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(login, state => ({ ...state, loading: true, error: null })),
  on(loginSuccess, (state, { user, token }) => ({ ...state, user, token, loading: false, error: null })),
  on(loginFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(logout, () => initialAuthState)
);
