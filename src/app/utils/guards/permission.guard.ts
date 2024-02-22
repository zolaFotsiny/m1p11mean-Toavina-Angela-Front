// permission.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'chemin-vers-votre-service-authentification'; // Assurez-vous d'importer le service d'authentification approprié

@Injectable({
    providedIn: 'root',
})
export class PermissionGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        // Vérifiez ici les autorisations de l'utilisateur en utilisant votre service d'authentification
        const isAuthenticated = this.authService.isAuthenticatedUser();
        const userRoles = this.authService.getUserRoles();

        if (isAuthenticated && userRoles.includes('admin')) {
            return true; // L'utilisateur authentifié et avec le rôle "admin" a accès à la page
        } else {
            // Redirigez l'utilisateur vers une page d'erreur ou une page de connexion
            this.router.navigate(['/page-non-autorisee']); // À remplacer par la route vers la page d'erreur
            return false;
        }
    }
}
