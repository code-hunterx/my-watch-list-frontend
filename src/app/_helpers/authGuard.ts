import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import {TokenStorageService} from '../_services/token-storage.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private tokensStorageService: TokenStorageService,
        private route: ActivatedRoute
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token=  this.tokensStorageService.getToken();
       if(!token===undefined || this.tokensStorageService.getToken()!=null){
            return true;
       }else{
            this.router.navigate(['/login'],  { queryParams: { redirectTo: this.route.snapshot.url } });
            return false;
       }   
    }
}