import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsComponent } from './components/clients.component';

const appRoutes: Routes = [
    {path: '', component: ClientsComponent},
    {path: '**', component: ClientsComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);