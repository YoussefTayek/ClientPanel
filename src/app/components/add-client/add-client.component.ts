import { AuthClientService } from './../../services/auth-client.service';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/Models/client';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName:"",
    lastName:"",
    email:"",
    phone:null,
    balance: 0,
    user: ''
  }
  constructor(private clientService: ClientService, 
              private route: Router, 
              private flashMessages: FlashMessagesService,
              private authService: AuthClientService) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(userAuth => {
      this.client.user = userAuth.uid;
    })
  }

  onSubmit() {
    this.clientService.newClient(this.client);
    this.route.navigate(['/'])

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Client has been added',
      showConfirmButton: false,
      timer: 3500
    })
  }
}
