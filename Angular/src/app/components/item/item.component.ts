import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/models/itemElements';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})


export class ItemComponent implements OnInit {
  constructor(private authServise: AuthenticationService, private router: Router, private afs: AngularFirestore) { }


  @Input() item: Item;
  @Output() removeItem = new EventEmitter<Item>();
  user: User;
  prise: string;

  remove(event: Event) {
    event.stopPropagation();
    this.removeItem.emit(this.item);
  }

  isAdmin(): boolean {
    if (this.authServise.canDelete(this.user)) {
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.authServise.user$.subscribe(user => this.user = user)
  }

  setPrice(price: number): string {
    if (price.toString().length > 0) {
      return price.toFixed(2) + "zł"
    } else {
      return "unknown";
    }
  }
}
