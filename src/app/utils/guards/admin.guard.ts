// guards/admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router) { }

    canActivate(): boolean {
        return this.authService.login('admin');
        // if (this.authService.isLoggedInUser() && this.authService.isAdminUser()) {
        //     return true;
        // } else {
        //     this.router.navigate(['/login']);
        //     return false;
        // }
    }
}
