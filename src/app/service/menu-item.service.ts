import { Injectable } from '@angular/core';
import { MenuItem } from '../model/menuItem';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MENUITEMS } from './mockMenuItems';
@Injectable()
export class MenuItemService {
  state: MenuItem[]
  constructor() { 
    this.state = MENUITEMS;
  }

  getState(): Observable<MenuItem[]> {
    return of(this.state);
  }
}
