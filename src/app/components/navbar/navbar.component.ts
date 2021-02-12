import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthClientService } from './../../services/auth-client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  connect: boolean = false;
  userLoggedIn: string;

  constructor(private authService: AuthClientService,
              private flashMessages: FlashMessagesService,
              private route: Router) { }

  ngOnInit(): void {
    
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.connect = true;
        this.userLoggedIn = auth.email;
      } else {
        this.connect = false;
      }
    })
  }

  onLogout() {
    this.authService.logout();
    this.route.navigate(['/login']);
  }

}
