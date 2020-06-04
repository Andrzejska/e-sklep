
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Item } from '../../models/itemElements';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/User';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  // @ViewChild('ratemessage', { static: false }) rateMessage: ElementRef;
  user: User;
  private item: Item = null;
  isBought: boolean = false;
  constructor(
    private authService: AuthenticationService,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => this.user = user)
    this.getItem();
  }

  getItem(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.itemService.getItem(id).subscribe(item => this.item = item);
    if (this.item == null) {
      this.router.navigate(['404'])
    }
  }

  setPrice(price: number): string {
    if (price.toString().length > 0) {
      return price.toFixed(2) + "zł"
    } else {
      return "unknown";
    }
  }

  isAdmin(): boolean {
    if (this.authService.canEdit(this.user)) {
      return true;
    }
    return false;
  }

  addProductToOrder(): void {
    this.isBought = true;
  }
}
