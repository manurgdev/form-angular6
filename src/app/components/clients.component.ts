import { Component, Inject } from '@angular/core';
import { Client } from '../models/client';
import {RequestService} from '../services/request.service';
import {MatSnackBar} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
    selector: 'clients-tag',
    templateUrl: '../views/clients.component.html',
    providers: [RequestService, MatSnackBar]
})

export class ClientsComponent{
    public client: Client;
    public catchmentTypes = [
        {value: 'telefónica'},
        {value: 'web'},
        {value: 'presencial'},
    ];

    constructor(
        private _requestService: RequestService,
        public snackBar: MatSnackBar,
        public dialog: MatDialog
    ){
        this.client = new Client("","","","0","","","","","","","","");
    }

    onSubmit(){
        this._requestService.addOrUpdateClient(this.client).subscribe(
            result => {
                if(result.client){
                    this.client._id = result.client._id;
                }
                this.openSnackBar(result.message, '');
            },
            error => {
                var errorMessage = <any>error;
                this.openSnackBar('Error al crear/actualizar cliente', '');
            }
        )
    }

    cleanClient(){
        this.client = new Client("","","","0","","","","","","","","");
    }

    validateDNI(value){
        let validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
        let nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
        let nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
        let str = value.toString().toUpperCase();

        if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

        let nie = str
            .replace(/^[X]/, '0')
            .replace(/^[Y]/, '1')
            .replace(/^[Z]/, '2');

        let letter = str.substr(-1);
        let charIndex = parseInt(nie.substr(0, 8)) % 23;

        if (validChars.charAt(charIndex) === letter) return true;

        return false;
    }

    validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    searchDni(dni){
        if(this.validateDNI(dni)){
            this._requestService.getUserByDni(dni).subscribe(
                result => {
                    if(result.client){
                        if(this.client._id !== '' && this.client._id===result.client._id){
                            this.openSnackBar('Editando al cliente ' + result.client.email, '');
                        }else{
                            this.openSnackBar('Existe el cliente', '');
                            this.openDialog(result.client);
                        }
                    }
                },
                error => {
                    var errorMessage = <any>error;
                }
            )
        }
    }

    searchEmail(email){
        if(this.validateEmail(email)){
            this._requestService.getUserByEmail(email).subscribe(
                result => {
                    if(result.client){
                        if(this.client._id !== '' && this.client._id===result.client._id){
                            this.openSnackBar('Editando al cliente ' + result.client.email, '');
                        }else{
                            this.openSnackBar('Existe el cliente', '');
                            this.openDialog(result.client);
                        }
                    }
                },
                error => {
                    var errorMessage = <any>error;
                }
            )
        }
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
    }

    openDialog(client): void {
        let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
          width: '250px',
          data: client
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if(result){
              this.client = result;
          }else{
              this.client = new Client("","","","0","","","","","","","","");
          }
        });
    }
    
}

  @Component({
    selector: 'dialog-overview-example-dialog',
    template: `
            <div mat-dialog-content>
                <p style="text-align:center;">¿Quiere recuperar sus datos para modificarlos?</p>
            </div>
            <div mat-dialog-actions>
                <button mat-button (click)="onNoClick()">No</button>
                <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Sí</button>
            </div>
  `
  })
  export class DialogOverviewExampleDialog {
  
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    showAnything(data){
        data.getClient(data);
    }
  
  }