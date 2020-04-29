import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChild, ElementRef } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemComponent } from './components/item/item.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RateComponent } from './components/rate/rate.component';
import { SearchPipe } from './components/item-list/item-filter.pipe';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { SearchPipePrice } from './components/item-list/item-filterPrice.pipe';
import { SearchPipeCategoty } from './components/item-list/item-filterCategory.pipe';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { Routes, RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component'
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EditItemComponent } from './components/edit-item/edit-item.component';



@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ItemListComponent,
    AddItemComponent,
    RateComponent,
    SearchPipe,
    SearchPipePrice,
    SearchPipeCategoty,
    ItemDetailsComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavBarComponent,
    LogInComponent,
    SignUpComponent,
    EditItemComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule, // do obsługi autentykacji
    AngularFirestoreModule, // do obslugi baz danych
    AngularFireDatabaseModule, // do obslugi baz danych
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
