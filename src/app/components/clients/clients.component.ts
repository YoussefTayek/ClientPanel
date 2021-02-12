import { FlashMessagesService } from 'flash-messages-angular';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/Models/client';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  total:number = 0;

  constructor(private clientService: ClientService, private flashMessages: FlashMessagesService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.total   = this.getTotal();
      console.log(this.clients);
    });
  }

  getTotal() {
   return this.clients.reduce((total, client) => {
     return  total + parseFloat(client.balance.toString());
   
    }, 0)
    }

    deleteClient(id) {
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
      })
    }
    
  }


