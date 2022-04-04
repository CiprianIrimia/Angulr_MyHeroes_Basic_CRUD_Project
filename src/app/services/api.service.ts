import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postHero(data: any) {
    return this.http.post<any>('http://localhost:5000/heroes/', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getHero() {
    return this.http.get<any>('http://localhost:5000/heroes').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  updateHero(data: any, id: number) {
    return this.http.put<any>('http://localhost:5000/heroes/' + id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  deleteHero(id: number) {
    return this.http.delete<any>('http://localhost:5000/heroes/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
