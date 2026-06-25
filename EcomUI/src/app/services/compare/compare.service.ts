import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CompareService {
  private _items = new BehaviorSubject<any[]>([]);
  compare$ = this._items.asObservable();

  has(id: number): boolean { return this._items.value.some(p => p.id === id); }
  get count(): number { return this._items.value.length; }

  toggle(product: any) {
    const list = this._items.value;
    if (list.some(p => p.id === product.id)) {
      this._items.next(list.filter(p => p.id !== product.id));
    } else if (list.length < 3) {
      this._items.next([...list, product]);
    }
  }

  clear() { this._items.next([]); }
  getAll() { return this._items.value; }
}
