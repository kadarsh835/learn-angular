import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

//RxJS
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Array<Promotion>>{

    // Using Observables RxJS
    return of(PROMOTIONS).pipe(delay(2000)).toPromise();

    // Without the use of RxJS- Just Promises to deal with the latency
    return new Promise(resolve=>{
      setTimeout(()=>resolve(PROMOTIONS), 2000);
    });
  }

  getPromotion(id: string): Promise<Promotion>{

    // Using Observables RxJS
    return of(PROMOTIONS.filter((promotion)=>{promotion.id===id})[0]).pipe(delay(2000)).toPromise();

    // Without the use of RxJS- Just Promises to deal with the latency
    return new Promise(resolve=>{
      setTimeout(()=>resolve(PROMOTIONS.filter((promotion)=>{promotion.id===id})[0]), 2000);
    });
  }

  getFeaturedPromotion(): Promise<Promotion>{

    // Using Observables RxJS
    return of(PROMOTIONS.filter((promotion)=>promotion.featured)[0]).pipe(delay(2000)).toPromise();

    // Without the use of RxJS- Just Promises to deal with the latency
    return new Promise(resolve=>{
      setTimeout(()=>resolve(PROMOTIONS.filter((promotion)=>promotion.featured)[0]), 2000);
    });
  }
}
