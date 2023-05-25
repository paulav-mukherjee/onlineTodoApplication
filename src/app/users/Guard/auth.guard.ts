import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private route : Router){}

  canActivate(): boolean {
    if (localStorage.getItem('token'))
      {
        return true
      
      }else{
        alert('Please login / signin to view this section!')
        this.route.navigate(['/home'])
        return false

      }
    
  }

}
