import { Routes } from '@angular/router';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { CategoryFormComponent } from './category-form/category-form.component';

export const routes: Routes = [
{path:"",component:CategoriesTableComponent},
{path:"editcategory/:id",component:CategoryFormComponent},
{path:"newcategory",component:CategoryFormComponent}

]
