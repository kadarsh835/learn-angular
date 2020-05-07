import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

//RxJS
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Observable<Array<Dish>> {
    // Using Observables RxJS
    return of(DISHES).pipe(delay(2000));
  }

  getDish(id: string): Observable<Dish>{
    // Using Observables RxJS
    return of(DISHES.filter((dish)=>(dish.id===id))[0]).pipe(delay(2000));
  }
  
  getFeaturedDish(): Observable<Dish>{
    // Using Observables RxJS
    return of(DISHES.filter((dish)=>dish.featured)[0]).pipe(delay(2000));
  }

  getDishIds(): Observable<Array<string> | any>{
    return of(DISHES.map(dish => dish.id));
  }
}