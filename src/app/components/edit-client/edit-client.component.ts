import { ClientService } from './../../services/client.service';
import { Client } from 'src/app/Models/client';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string = "";
  client: Client = {
    firstName:"",
    lastName:"",
    email:"",
    phone:null,
    balance: 0
  }
  constructor(private clientService: ClientService, 
              private route: ActivatedRoute, 
              private router: Router,
              private flashMessages: FlashMessagesService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
  }
  
  onSubmit() {
    this.client.id = this.id;
    this.clientService.updateClient(this.client);
    this.flashMessages.show("Client updated with success", {cssClass: 'alert-warning', timeout: '3500'});
    this.router.navigate(['/client/', this.id]);
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: this.client.firstName+ ' ' + this.client.lastName + ' has been updated',
      showConfirmButton: false,
      timer: 3500
    })
  }

}
