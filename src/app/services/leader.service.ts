import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader'
import { LEADERS } from '../shared/leaders';

//RxJS
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Array<Leader>>{

    // Using Observables RxJS
    return of(LEADERS).pipe(delay(2000)).toPromise();

    // Without the use of RxJS- Just Promises to deal with the latency
    return new Promise(resolve=>{
      //Simulate 2 sec Server Latency
      setTimeout(()=>resolve(LEADERS), 2000);
    });
  }

  getLeader(id: string): Promise<Leader>{

    // Using Observables RxJS
    return of(LEADERS.filter((leader)=> (leader.id===id))[0]).pipe(delay(2000)).toPromise();

    // Without the use of RxJS- Just Promises to deal with the latency
    return new Promise(resolve=>{
      //Simulate 2 sec Server Latency
      setTimeout(()=>resolve(LEADERS.filter((leader)=> (leader.id===id))[0]), 2000);
    });
  }

  getFeaturedLeader(): Promise<Leader>{

    // Using Observables RxJS
    return of(LEADERS.filter((leader)=>(leader.featured))[0]).pipe(delay(2000)).toPromise();

    // Without the use of RxJS- Just Promises to deal with the latency
    return new Promise(resolve=>{
      //Simulate 2 sec Server Latency
      setTimeout(()=>resolve(LEADERS.filter((leader)=>(leader.featured))[0]), 2000);
    });
  }
}