import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get('https://restcountries.com/v3.1/all');
  }
  getByName(name: string) {
    return this.http.get(
      `https://restcountries.com/v3.1/name/${name}?fullText=true`
    );
  }
  getByCodeName(name: string) {
    return this.http.get(`https://restcountries.com/v3.1/alpha/${name}`);
  }
  getByRegionName(name: string) {
    return this.http.get(`https://restcountries.com/v3.1/region/${name}`)
  }
}
