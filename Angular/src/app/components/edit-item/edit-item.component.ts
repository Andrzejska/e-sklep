import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/itemElements';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  editForm: FormGroup;
  private item: Item = null;
  isCorrectForm: boolean = true;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCourse();
    this.editForm = new FormGroup({
      name: new FormControl(
        this.item.name, [
        Validators.required,
        Validators.minLength(2),
      ]
      ),
      price: new FormControl(
        this.item.price.toString(), [
        Validators.required,
        Validators.minLength(1)
      ]
      ),
      nameOfSeller: new FormControl(
        this.item.nameOfSeller, [
        Validators.required,
        Validators.minLength(2)
      ]
      ),
      surnameOfSeller: new FormControl(
        this.item.surnameOfSeller, [
        Validators.required,
        Validators.minLength(1)
      ]
      ),
      phone: new FormControl(
        this.item.phone, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]
      ),
      description: new FormControl(
        this.item.description, [
        Validators.required,
        Validators.min(0)
      ]
      ),
      img: new FormControl(this.item.imgPath, [])
    });
  }

  getCourse(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.itemService.getItem(id).subscribe(course => this.item = course);
    if (this.item == null) {
      this.router.navigate(['404'])
    }
  }

  displayErrorText() {
    if (this.isCorrectForm) {
      return 'none';
    }
    else {
      return 'block';
    }
  }

  onEdit(): void {
    if (this.editForm.valid) {
      this.itemService.updateItem(this.item);
      this.item.name = this.editForm.controls.name.value;
      this.item.nameOfSeller = this.editForm.controls.nameOfSeller.value;
      this.item.surnameOfSeller = this.editForm.controls.surnameOfSeller.value;
      this.item.price = +this.editForm.controls.price.value;
      this.item.phone = this.editForm.controls.phone.value;
      this.item.description = this.editForm.controls.description.value;
      if (this.editForm.controls.img.value.toString() != null) {
        this.item.imgPath = this.editForm.controls.img.value;
      } else {
        this.item.imgPath = '../../../assets/img/no-photo.png';
      }
      this.itemService.updateItem(this.item);
      this.isCorrectForm = true;
      this.router.navigate(['/components/home/']);
    } else {
      this.isCorrectForm = false;
    }

  }
}
