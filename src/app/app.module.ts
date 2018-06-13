import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { MatCardModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { ClientsComponent, DialogOverviewExampleDialog } from './components/clients.component';
import { MatSnackBarModule } from "@angular/material";
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    HttpModule,
    routing,
    MatSnackBarModule,
    MatDialogModule
  ],
  entryComponents: [DialogOverviewExampleDialog],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
