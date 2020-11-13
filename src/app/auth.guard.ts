import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from  '@angular/router';
@Injectable({
  providedIn: 'root'
})
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router){}
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//       return this.authService.isLoggedIn();
//   }
// }

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.isLoggedIn) {
      return false;
    } else {
      return true;
    }
  }
}

// export class AuthGuardService implements CanActivate {

//   constructor(private auth: AuthService, private router: Router) { }

//   canActivate(next: ActivatedRouteSnapshot,
//     _state: import('@angular/router').RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//     let isLoggedIn = false;
//     const idToken = next && next.queryParamMap.get('id_token');
//     try {
//       const expiresAt = idToken && JSON.parse(window.atob(idToken.split('.')[1])).exp * 1000;
//       if (idToken && expiresAt) {
//         isLoggedIn = true;
//         localStorage.setItem('id_token', idToken);
//         localStorage.setItem('expires_at', String(expiresAt));
//       } else {
//         isLoggedIn = this.auth.isLoggedIn();
//       }
//     } catch (e) {
//       console.error(e);
//       isLoggedIn = this.auth.isLoggedIn();
//     }
//     if (!isLoggedIn) {
//       //this section is important for you:
//       this.router.navigate(['/login'], { queryParams: { returnUrl: _state.url }});
//     }
//     return isLoggedIn;
//   }
// }
