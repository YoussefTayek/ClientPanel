import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthClientService } from './../../services/auth-client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(
              private authService: AuthClientService, 
              private flashMessages: FlashMessagesService,
              private route: Router
              ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.route.navigate(['/']);
      }
    })
  }

  onLogin() {
    this.authService.login(this.email, this.password)
    .then(auth => {
      if(auth) {
        this.flashMessages.show('You are logged successfully', {
          cssClass: "alert-success",
          timeout: 5000
        })
        this.route.navigate(['/'])
      }
    })
    .catch(error => {
      this.flashMessages.show(error.message, {
        cssClass: "alert-danger",
        timeout: 10000
      })
    })
  }

  onLoginWithGoogle() {
    this.authService.loginWithGoogle()
    .then(auth => {
      if(auth) {
        this.flashMessages.show('You are logged successfully', {
          cssClass: "alert-success",
          timeout: 5000
        })
        this.route.navigate(['/'])
      }
    })
    .catch(error => {
      this.flashMessages.show(error.message, {
        cssClass: "alert-danger",
        timeout: 10000
      })
    })
  }
}

