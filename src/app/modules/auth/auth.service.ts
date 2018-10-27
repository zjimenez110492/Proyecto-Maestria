import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};


@Injectable()
export class AuthService
{

  constructor(private httpClient: HttpClient){}

  authUser()
  {
    //return this.httpClient.post();
  }

  login()
  {
    return true;
  }

}
