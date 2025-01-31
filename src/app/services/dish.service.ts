import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
// import { DISHES } from '../shared/dishes';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';

//RxJS
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { ProcessHttpMsgService } from '../services/process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHttpMsgService) { }

  getDishes(): Observable<Array<Dish>> {
    // Using Observables RxJS
    return this.http.get<Array<Dish>>(baseURL+'dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    // return of(DISHES).pipe(delay(2000));
  }

  getDish(id: string): Observable<Dish>{
    // Using Observables RxJS
    return this.http.get<Dish>(baseURL+ 'dishes/'+ id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    // return of(DISHES.filter((dish)=>(dish.id===id))[0]).pipe(delay(2000));
  }
  
  getFeaturedDish(): Observable<Dish>{
    // Using Observables RxJS
    return this.http.get<Dish[]>(baseURL+ 'dishes?featured=true')
      .pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
    // return of(DISHES.filter((dish)=>dish.featured)[0]).pipe(delay(2000));
  }

  getDishIds(): Observable<Array<string> | any>{
    return this.getDishes().pipe(map(dishes => dishes.map(dish=> dish.id)))
      .pipe(catchError(error=> error));
  }

  putDish(dish: Dish): Observable<Dish>{
    const httpOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}