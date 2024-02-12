import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import{ categoryService} from "./../services/categoryService"; 
import { Category } from '../shared/model/wordsCategory';
import{FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-choose-category',
  standalone: true,
  imports: [FormsModule,CommonModule,MatIcon,MatButtonModule,RouterModule],
  templateUrl: './choose-category.component.html',
  styleUrl: './choose-category.component.css'
})
export class ChooseCategoryComponent implements OnInit{
  categories: Category[] = [];

  constructor(private categoryService: categoryService, private router: Router) {}

  ngOnInit(): void {
    this.categories = this.categoryService.list();
  }
}
