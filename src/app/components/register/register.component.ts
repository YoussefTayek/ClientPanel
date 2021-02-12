import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';
import { AuthClientService } from './../../services/auth-client.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  constructor(private authService: AuthClientService, private route: Router, private flashMessages: FlashMessagesService) { }

  ngOnInit(): void {
  }

  onRegister() {
    this.authService.register(this.email, this.password)
    .then((register => {
      
        this.flashMessages.show("Congratulations you are logged", {
          cssClass: 'alert-success',
          timeout: 5000
        })
    }))
    .catch(error => {
      this.flashMessages.show(error.message, {
        cssClass: 'alert-danger',
        timeout: 5000
      })
    })
  }

}
