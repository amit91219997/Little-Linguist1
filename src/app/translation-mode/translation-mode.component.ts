import { Component, Input, OnInit } from '@angular/core';
import{ categoryService} from "./../services/categoryService"; 
import { Category } from '../shared/model/wordsCategory';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Language } from '../shared/model/Languages-enum';


@Component({
  selector: 'app-translation-mode',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,CommonModule ],
  templateUrl: './translation-mode.component.html',
  styleUrl: './translation-mode.component.css'
})
export class TranslationModeComponent implements OnInit  {
  category: Category = new Category(0, "", Language.English, Language.Hebrew, []);
  @Input()
  id?: string;
  showTestResults: boolean = false; // Controls visibility of test results
  errorMessage: string = '';

  constructor(private categoryService: categoryService) { }

  ngOnInit(): void {
    if (this.id) {
      this.category = this.categoryService.get(parseInt(this.id));
      this.category.Words.forEach(word => word.translation = '');
    }
  }

  checkTranslations(): void {
    let incorrectTranslations = 0;
  
    for (const word of this.category.Words) {
      if (word.targetWord !== word.translation) {
        incorrectTranslations++;
      }
    }
  
    if (incorrectTranslations > 0) {
      this.showTestResults = true;
      this.errorMessage = `Try again, you made a mistake in ${incorrectTranslations} words out of ${this.category.Words.length}.`;
    } else {
      this.showTestResults = true;
      this.errorMessage = `Well done, You finished successfully!`;
    }
  }

  revealAllTranslations(): void {
    for (let word of this.category.Words) {
      word.translation = word.targetWord;
    }
  }
}