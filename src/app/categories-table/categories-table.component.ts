import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../shared/model/wordsCategory';
import { RouterModule } from '@angular/router';
import{MatTableModule} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import{ categoryService} from "./../services/categoryService"; 
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';
import {  MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-categories-table',
  standalone: true,
  imports: [RouterModule,MatTableModule,MatIcon,DatePipe, MatPaginatorModule,MatSortModule],
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.css'
})


export class CategoriesTableComponent  implements OnInit {
  allCategories: Category[] = [];
  displayedColumns: string[] = ['categoryName', 'numberOfWords', 'lastModificationDate', 'action'];
  dataSource = new MatTableDataSource<Category>(this.allCategories);
  sortedData: Category[];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private categoryService: categoryService, private dialogService: MatDialog) {
    this.sortedData = this.allCategories.slice();
  }

  ngOnInit(): void {
    this.allCategories = this.categoryService.list();
    this.dataSource = new MatTableDataSource<Category>(this.allCategories);
    this.dataSource.sort = this.sort;
  }

  public calculateNumberOfWords(category: Category): number {
    return category.Words.length;
  }

  getDateAsString(): string {
    const today = new Date();
    return today.toLocaleDateString();
  }

  sortData() {
    const data = this.allCategories.slice();
    if (!this.sort.active || this.sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'categoryName':
          return this.compare(a.categoryName, b.categoryName, isAsc);
        case 'numberOfWords':
          return this.compare(this.calculateNumberOfWords(a), this.calculateNumberOfWords(b), isAsc);
        case 'lastModificationDate':
          return this.compare(this.getDateAsString(), this.getDateAsString(), isAsc);
        default:
          return 0;
      }
    });
  }


  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  deleteCategory(id: number, fullName: string) {
    const dialogRef = this.dialogService.open(DeleteCategoryDialogComponent, { data: fullName });

    dialogRef.afterClosed().subscribe((deletionResult) => {
      if (deletionResult) {
        this.categoryService.delete(id);
        this.allCategories = this.categoryService.list();
        this.dataSource.data = this.allCategories;
      }
    });
  }
}
