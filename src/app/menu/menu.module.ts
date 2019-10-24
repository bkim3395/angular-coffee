import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuItemComponent } from './menu-item/menu-item.component';

@NgModule({
  declarations: [MenuComponent, MenuItemComponent],
  imports: [
    CommonModule,
    MenuRoutingModule
  ]
})
export class MenuModule { }
