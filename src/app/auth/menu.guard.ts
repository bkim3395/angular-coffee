import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class MenuGuard implements CanActivate {
  constructor(private userService: UserService,
              private router: Router){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.userService.checkStatus()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  
}
