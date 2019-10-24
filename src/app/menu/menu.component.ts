import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../service/menu-item.service'
import { MenuItem } from '../model/menuItem';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MenuItemService]
})
export class MenuComponent implements OnInit {
  items: MenuItem[];
  constructor(private menuItemService: MenuItemService) {
   }

  ngOnInit() {
    this.menuItemService.getState()
    .subscribe((items) => {
      this.items = items;
    })
  }

}
