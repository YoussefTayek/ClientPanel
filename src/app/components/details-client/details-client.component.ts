import { Client } from './../../Models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.css']
})
export class DetailsClientComponent implements OnInit {
  id: string;
  showBalance: boolean;
  client: Client = {
    firstName:"",
    lastName:"",
    email:"",
    phone:null,
    balance: 0
  };
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
    this.showBalance = false;
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: 'Balance has been updated',
      showConfirmButton: false,
      timer: 3500
    })
  }

  delete(id) {
    Swal.fire({
      title: 'Are you sure, do you want to delete this client?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(id);
        Swal.fire(
          'Deleted!',
          'Client has been deleted.',
          'success'
        )
      }
      this.router.navigate(['/']);
    })    
  }
}
