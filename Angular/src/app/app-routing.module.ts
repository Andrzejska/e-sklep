import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { AdminGuard } from './guards/admin.guard';
import { CanReadGuard } from './guards/can-read.guard';
import { AddItemComponent } from './components/add-item/add-item.component';

const routes: Routes = [
  { path: 'components/home', component: HomeComponent },
  { path: 'components/log-in', component: LogInComponent },
  { path: 'components/sign-up', component: SignUpComponent },
  { path: 'components/edit-item/:id', component: EditItemComponent, canActivate: [AdminGuard] },
  { path: 'components/item-details/:id', component: ItemDetailsComponent, canActivate: [CanReadGuard] },
  { path: 'components/add-item', component: AddItemComponent },
  { path: '', redirectTo: 'components/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [
  ItemDetailsComponent,
  PageNotFoundComponent,
  HomeComponent
]