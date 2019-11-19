import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SharedService {
  user:any
 userName =new  BehaviorSubject(this.user);

  userName$ = this.userName.asObservable();

  constructor() {
    console.log('userName$  :', this.userName$);
  }

  getName(): Observable<any> {
    console.log('Service get method :', this.userName);
    return this.userName$;
  }

  setName(name) {
    // console.log('Service set method :', name);
    this.userName.next(name)
  }
  
}