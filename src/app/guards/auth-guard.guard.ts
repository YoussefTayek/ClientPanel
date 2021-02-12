import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private route: Router) {}
  
  canActivate() : Observable<boolean> {
    return this.afAuth.authState.pipe(map(auth => {
      if(!auth) {
        this.route.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    }))
  }
}
