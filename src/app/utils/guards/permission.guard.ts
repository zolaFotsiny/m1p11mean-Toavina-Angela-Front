// permission.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
// import { AuthService } from 'chemin-vers-votre-service-authentification'; // Assurez-vous d'importer le service d'authentification approprié

@Injectable({
    providedIn: 'root',
})
export class PermissionGuard implements CanActivate {

    constructor( private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        // ...

        let userToken: string | null = localStorage.getItem('token');

        if (userToken !== null) {
            const decodedToken: any = jwtDecode(userToken);

            if (decodedToken && decodedToken.type_utilisateur === 'admin') {
                return true;
            } else {
                this.router.navigate(['/denied']);
                return false;
            }
        } else {
            // Gérer le cas où le token n'est pas présent dans le localStorage
            this.router.navigate(['/denied']);
            return false;
        }

    }
}
