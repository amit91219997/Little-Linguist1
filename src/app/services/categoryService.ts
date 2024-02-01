import { Category } from "../shared/model/wordsCategory";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class categoryService {
    categories = new Map<number, Category>();
    nextId= 1;

    constructor() { }
    list() : Category[] {
        return Array.from(this.categories.values());
      }

      get(id : number) : Category | undefined {
        console.log('Fetching category with ID:', id);
        return this.categories.get(id);
      }
    
      add(newCategoryData:Category) {
        newCategoryData.id = this.nextId
        this.categories.set(this.nextId, newCategoryData);
        this.nextId++;
      }
    
      update(existingCategory : Category) : void {
        if (this.categories.has(existingCategory.id)) {
          this.categories.set(existingCategory.id, existingCategory);
        }
      }

      delete(existingCategoryId : number) : void {
        this.categories.delete(existingCategoryId);
      }
}