import { Component, Input, OnInit, ViewChild, forwardRef } from '@angular/core';
import { AbstractControl, FormsModule, NG_VALIDATORS, NgModelGroup, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Category } from '../shared/model/wordsCategory';
import { Language } from '../shared/model/Languages-enum';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import{ categoryService} from "./../services/categoryService";
import { NgForm } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';





@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatSelectModule,MatInputModule ,MatButtonModule,MatError,
    CommonModule,MatIcon,MatTableModule,ReactiveFormsModule ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CategoryFormComponent),
      multi: true,
    },
  ],

})



export class CategoryFormComponent implements OnInit, Validator    {
  currentCategory:Category = new Category(0,"",Language.English,Language.Hebrew,[]);
  @ViewChild('wordsGroup') wordsGroup? : NgModelGroup;


  @Input()
  id? : string;

  constructor(private  categoryService:  categoryService, private router: Router) {}

  ngOnInit(): void {
    console.log('Provided ID:', this.id);

    if (this.id) {
      let categoryFromService = this.categoryService.get(parseInt(this.id));
      console.log('Category loaded:', this.currentCategory);

      if (categoryFromService) {
        this.currentCategory = categoryFromService;
        console.log('Category loaded:', this.currentCategory);
      }
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.atLeastOneWordPair()(control);
  }

  validateWords(form: NgForm) {
    const wordsArray = this.currentCategory.Words;
  
    if (!wordsArray || wordsArray.length === 0) {
      this.wordsGroup?.control.setErrors({ 'noWords': true });
    } else {
      this.wordsGroup?.control.setErrors(null);
    }
  }


    atLeastOneWordPair(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const wordsArray = control.get('wordsGroup')?.value;
  
      if (!wordsArray || wordsArray.length === 0) {
        return { 'noWords': true };
      }
  
      for (const word of wordsArray) {
        if (word.sourceWord && word.targetWord) {
          return null; 
        }
      }
  
      return { 'noWords': true }; 
    };
  }
 
  onSubmitRegistration(form: NgForm) {
    console.log("Form submitted!");
    this.validateWords(form);
    
    if (form.valid && !this.wordsGroup?.control?.hasError('noWords')) {
      if (this.id) {
        this.categoryService.update(this.currentCategory);
      } else {
        this.categoryService.add(this.currentCategory);
      }
  
      this.router.navigate(['/']);
    }
  }



  addNewWord() {
    this.currentCategory.Words.push({ sourceWord: '', targetWord: '' });
  }


  deleteNewWord(index: number) {
    this.currentCategory.Words.splice(index, 1);
    this.wordsGroup?.control.markAsDirty();

  }
}