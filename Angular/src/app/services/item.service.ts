import { Injectable, OnInit } from '@angular/core';
import { Item } from '../models/itemElements';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService implements OnInit {

  private dbPath = '/Items';
  itemsRef: AngularFirestoreCollection<Item> = null;
  private items: Item[];

  ngOnInit(): void {
    this.updateItems();
  }

  constructor(private db: AngularFirestore) {
    this.itemsRef = db.collection(this.dbPath);
    this.updateItems();
  }

  public generateId(): number {
    var maxId = 0;
    if (this.items != null) {
      for (let c of this.items) {
        if (c.id > maxId) maxId = c.id;
      }
    }
    return maxId + 1;
  }


  getItemsRef(): AngularFirestoreCollection<Item> {
    return this.itemsRef;
  }

  public getItems() {
    return this.items;
  }

  private updateItems() {
    this.getItemsRef().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(products => {
      this.items = products;
    });
  }


  getItem(id: number): Observable<Item> {
    this.updateItems();
    return of(this.items.find(item => item.id == id));
  }

  updateItem(course: Item) {
    this.itemsRef.doc(course.id + "").set({ ...course });
  }

  addItem(item: Item): void {
    this.itemsRef.doc(item.id + "").set({ ...item });
  }

  deleteItem(id: number) {
    this.db.collection('Items').doc(id.toString()).delete();
  }

}











