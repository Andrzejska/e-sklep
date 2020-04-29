import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Item } from 'src/app/models/itemElements';
import { RouterModule } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})


export class AddItemComponent implements OnInit {

  isOpenAddForsm: boolean = false;
  addForm: FormGroup;
  newItem: Item;
  isCorrectForm: boolean = true;

  constructor(private service: ItemService) {
  }
  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl(
        "", [
        Validators.required,
        Validators.minLength(1)
      ]
      ),
      price: new FormControl(
        "", [
        Validators.required
      ]
      ),
      nameOfSeller: new FormControl(
        "", [
        Validators.required,
        Validators.minLength(2)
      ]
      ),
      surnameOfSeller: new FormControl(
        "", [
        Validators.required,
        Validators.minLength(2)
      ]
      ),
      description: new FormControl(
        "", [
        Validators.required,
        Validators.minLength(0),
        Validators.maxLength(10000)
      ]
      ),
      phone: new FormControl(
        "", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12)
      ]
      ),
      img: new FormControl()
    });
  }

  //-----------------------onSubmit----------------------
  createNewCourse(): void {
    this.newItem = {
      name: null,
      price: null,
      nameOfSeller: null,
      surnameOfSeller: null,
      description: null,
      phone: null,
      id: null,
      imgPath: null,
    };
  }
  setCourseParameters(): void {
    var id = this.service.generateId();
    this.newItem.id = id;
    this.newItem.name = this.addForm.controls.name.value;
    this.newItem.description = this.addForm.controls.description.value;
    this.newItem.nameOfSeller = this.addForm.controls.nameOfSeller.value;
    this.newItem.surnameOfSeller = this.addForm.controls.surnameOfSeller.value;
    this.newItem.price = +this.addForm.controls.price.value;
    this.newItem.phone = this.addForm.controls.phone.value;
    if (this.addForm.controls.img.value != null) {
      this.newItem.imgPath = this.addForm.controls.img.value;
    } else {
      this.newItem.imgPath = '../../../assets/img/no-photo.png';
    }
  }
  onSubmit() {
    if (this.addForm.valid) {
      this.isCorrectForm = true;
      this.createNewCourse();
      this.setCourseParameters();
      this.service.addItem(this.newItem);
      this.addForm.reset();
    } else {
      this.isCorrectForm = false;
    }

  }

}


