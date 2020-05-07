import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

//RxJS
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Array<Dish>> {

    // Using Observables RxJS
    return of(DISHES).pipe(delay(2000)).toPromise();

    // Without the use of RxJS- Just Promises to deal with the latency
    return new Promise(resolve=>{
      // Simulate Server Latency with 2 seconds delay
      setTimeout(()=> resolve(DISHES), 2000);
    });
  }

  getDish(id: string): Promise<Dish>{

    // Using Observables RxJS
    return of(DISHES.filter((dish)=>(dish.id===id))[0]).pipe(delay(2000)).toPromise();
    
    // Without the use of RxJS- Just Promises to deal with the latency
    return new Promise(resolve=>{
      // Simulate Server Latency with 2 seconds delay
      setTimeout(()=> resolve(DISHES.filter((dish)=>(dish.id===id))[0]), 2000);
    });
  }
  getFeaturedDish(): Promise<Dish>{

    // Using Observables RxJS
    return of(DISHES.filter((dish)=>dish.featured)[0]).pipe(delay(2000)).toPromise();
    
    // Without the use of RxJS- Just Promises to deal with the latency
    return new Promise(resolve=>{
      // Simulate Server Latency with 2 seconds delay
      setTimeout(()=> resolve(DISHES.filter((dish)=>dish.featured)[0]), 2000);
    });
  }
}