// shared/authentication.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private isLoggedIn: boolean = false;
    private isAdmin: boolean = false;

    login(username: string, password?: string): boolean {
        if(username==='admin'){
           this.isLoggedIn=true;
           this.isAdmin=true;
        }
        else{
           this.isLoggedIn=true;
           this.isAdmin=false;
        }
        // Implémentez votre logique d'authentification ici
        // Définissez isLoggedIn et isAdmin en fonction du résultat de l'authentification
        return this.isAdmin;
    }

    logout(): void {
        // Implémentez la logique de déconnexion ici
        this.isLoggedIn = false;
        this.isAdmin = false;
    }

    isLoggedInUser(): boolean {
        return this.isLoggedIn;
    }

    isAdminUser(): boolean {
        return this.isAdmin;
    }
}
