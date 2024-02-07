// guards/client.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class ClientGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router) { }

    canActivate(): boolean {
        if (this.authService.isLoggedInUser()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
