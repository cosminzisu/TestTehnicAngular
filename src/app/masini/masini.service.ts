import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Masina } from './masini.model'; 


@Injectable({
  providedIn: 'root'
})
export class MasiniService {

  private apiUrl = 'http://localhost:4300/masini'; 

  constructor(private http: HttpClient) {}


    getMasini(): Observable<Masina[]> {
        return this.http.get<Masina[]>(this.apiUrl);
    }

   //delete

   deleteMasina(id: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete(deleteUrl);
}

    //put

    updateMasina(id: number, marca: string, model: string, an: number, cc: number, taxa: number | null): Observable<any> {

        taxa = this.calculateTaxa(cc);
      
        const updateUrl = `${this.apiUrl}/${id}`;
        const data = {
          id: id,
          marca: marca,
          model: model,
          an: an,
          cc: cc,
          taxa: taxa
        };
        return this.http.put(updateUrl, data);
      }

    // Metoda de adăugare masina

    calculateTaxa(capacitateCilindrica: number): number {
        if (capacitateCilindrica < 1500) {
          return 50;
        } else if (capacitateCilindrica > 1500 && capacitateCilindrica < 2000) {
          return 100;
        } else {
          return 200;
        }
    }

  adaugaMasina(marca: string, model: string, an: number, cc: number, taxa: number): Observable<any> {
  taxa = this.calculateTaxa(cc);

  const data = {
    marca: marca,
    model: model,
    an: an,
    cc: cc,
    taxa: taxa
  };

  return this.http.post(this.apiUrl, data);
}
//find

findMasini(search: string): Observable<Masina[]> {
    const url = `${this.apiUrl}?search=${search}`;
    return this.http.get<Masina[]>(url);
  }


}

