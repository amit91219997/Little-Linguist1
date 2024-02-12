import { Category } from "../shared/model/wordsCategory";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class categoryService {
  private readonly CATEGORIES_KEY = 'categories';
  private readonly NEXT_ID_KEY = 'nextId';

    constructor() { }

      private getNextId() : number {
        let nextIdString = localStorage.getItem(this.NEXT_ID_KEY);
        return nextIdString ? parseInt(nextIdString) : 0;
        }


       private setNextId(id : number) : void {
          localStorage.setItem(this.NEXT_ID_KEY, id.toString());
          }
          

       private setCategories(allcategories : Map<number, Category>) : void {
            localStorage.setItem(this.CATEGORIES_KEY,
            JSON.stringify(Array.from(allcategories.values())));
           }
    

           private getCategories() : Map<number, Category>{
            let categoriesString = localStorage.getItem(this.CATEGORIES_KEY);
            let idToCategory = new Map<number, Category>();
            if (categoriesString) {
            JSON.parse(categoriesString).forEach((category: Category) => {
            Object.setPrototypeOf(category, Category.prototype);
            idToCategory.set(category.id, category);
            });
            }
            return idToCategory;
           }


           list() : Category[] {
            return Array.from(this.getCategories().values());
            }
            


            get(id: number): Category {
              const categoriesMap = this.getCategories();
          
              if (!categoriesMap.has(id)) {
                  throw new Error("Failed to get person by id: " + id + " - Category not found");
              }
          
              return categoriesMap.get(id)!;
          }
           

       
           
        add(category : Category) {
          let newId = this.getNextId();
          let categoriesMap = this.getCategories();
          category.id = newId;
          categoriesMap.set(category.id, category);
          this.setCategories(categoriesMap);
          this.setNextId(++newId);
         }
    
          update(category: Category) {
          let categoriesMap = this.getCategories();

          if (!categoriesMap.has(category.id)) {
          throw new Error("Failed to update person by id: " + category.id + " - Category not found");
       }  

         categoriesMap.set(category.id, category);
         this.setCategories(categoriesMap);
        }
      
        delete(id: number): void {
          let categoriesMap = this.getCategories();
      
          if (!categoriesMap.has(id)) {
              throw new Error("Failed to delete person by id: " + id + " - Category not found");
          }
      
          categoriesMap.delete(id);
          this.setCategories(categoriesMap);
        }}