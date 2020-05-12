import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
// import { DISHES } from '../shared/dishes';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';

//RxJS
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  getDishes(): Observable<Array<Dish>> {
    // Using Observables RxJS
    return this.http.get<Array<Dish>>(baseURL+'dishes');
    // return of(DISHES).pipe(delay(2000));
  }

  getDish(id: string): Observable<Dish>{
    // Using Observables RxJS
    return this.http.get<Dish>(baseURL+ 'dishes/'+ id);
    // return of(DISHES.filter((dish)=>(dish.id===id))[0]).pipe(delay(2000));
  }
  
  getFeaturedDish(): Observable<Dish>{
    // Using Observables RxJS
    return this.http.get<Dish[]>(baseURL+ 'dishes?featured=true')
      .pipe(map(dishes => dishes[0]));
    // return of(DISHES.filter((dish)=>dish.featured)[0]).pipe(delay(2000));
  }

  getDishIds(): Observable<Array<string> | any>{
    return this.getDishes().pipe(map(dishes => dishes.map(dish=> dish.id)))
  }
}