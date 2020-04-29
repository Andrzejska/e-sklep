import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/itemElements';
import { ItemComponent } from '../item/item.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/User';
import { map } from 'rxjs/operators';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})

export class ItemListComponent implements OnInit {

  searchTerm: string;
  searchTermECTS: string;
  searchTermSemester: string;
  searchTermRate: string;
  tmp: string;
  user: User;
  items: Item[]

  constructor(private itemsService: ItemService, private authServise: AuthenticationService) {
  }

  ngOnInit() {
    this.itemsService.getItemsRef().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(products => {
      this.items = products;
    });
    this.authServise.user$.subscribe(user => this.user = user)
  }

  isAdmin(): boolean {
    if (this.authServise.canEdit(this.user)) {
      return true;
    }
    return false;
  }

  removeItemFromList(itemToDelete: Item): void {
    this.items.forEach(function (item, index, all) {
      if (itemToDelete.id == item.id) all.splice(index, 1);
    });
    this.itemsService.deleteItem(itemToDelete.id);
  }


}













// private getCourses(): void {
//   this.courses = this.service.getCourses();
// }