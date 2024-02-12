import { Routes } from '@angular/router';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ChooseCategoryComponent } from './choose-category/choose-category.component';
import { TranslationModeComponent } from './translation-mode/translation-mode.component';

export const routes: Routes = [
{path:"",component:CategoriesTableComponent},
{path:"editcategory/:id",component:CategoryFormComponent},
{path:"newcategory",component:CategoryFormComponent},
{path:"choosecategory", component:ChooseCategoryComponent},
{path:"TranslationMode/:id",component:TranslationModeComponent}

]
