import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { flatMap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { HeroModel } from './hero-interface.model';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css'],
})
export class HeroesListComponent implements OnInit {
  formValue!: FormGroup;
  heroModelObject: HeroModel = new HeroModel();
  heroData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      heroName: [''],
      superpowerName: [''],
    });
    this.getAllHeroes();
  }

  clickAddHero() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postHeroDetails() {
    this.heroModelObject.firstName = this.formValue.value.firstName;
    this.heroModelObject.lastName = this.formValue.value.lastName;
    this.heroModelObject.heroName = this.formValue.value.heroName;
    this.heroModelObject.superpowerName = this.formValue.value.superpowerName;

    this.api.postHero(this.heroModelObject).subscribe(
      (res) => {
        console.log(res);
        alert('Hero added successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllHeroes();
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }
  getAllHeroes() {
    this.api.getHero().subscribe((res) => {
      this.heroData = res;
    });
  }
  deleteHero(hero: any) {
    this.api.deleteHero(hero.id).subscribe((res) => {
      alert('Hero was deleted');
      this.getAllHeroes();
    });
  }
  onEditHero(hero: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.heroModelObject.id = hero.id;
    this.formValue.controls['firstName'].setValue(hero.firstName);
    this.formValue.controls['lastName'].setValue(hero.lastName);
    this.formValue.controls['heroName'].setValue(hero.heroName);
    this.formValue.controls['superpowerName'].setValue(hero.superpowerName);
  }
  updateHeroDetails() {
    this.heroModelObject.firstName = this.formValue.value.firstName;
    this.heroModelObject.lastName = this.formValue.value.lastName;
    this.heroModelObject.heroName = this.formValue.value.heroName;
    this.heroModelObject.superpowerName = this.formValue.value.superpowerName;

    this.api
      .updateHero(this.heroModelObject, this.heroModelObject.id)
      .subscribe((res) => {
        alert('Updated Succesfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllHeroes();
      });
  }
}
