import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Persoana } from './persoane.model';
import { Masina } from '../masini/masini.model';
import { mergeMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersoaneService {
  private apiUrl = 'http://localhost:4300/persoane'; 
  private apiUrlJonctiune = 'http://localhost:4300/jonctiune';

  constructor(private http: HttpClient) {}


  getPersoane(): Observable<Persoana[]> {
    return this.http.get<Persoana[]>(this.apiUrl);
  }
  //delete
  deletePersoana(id: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete(deleteUrl);
  }

  //put
  updatePersoana(id: number, nume: string, prenume: string, cnp: string, varsta: number, masini: string | null): Observable<any> {
    const calculatedAge = this.calculateAgeFromCNP(cnp);
  
    const updateUrl = `${this.apiUrl}/${id}`;
    const data = {
      id: id,
      nume: nume,
      prenume: prenume,
      cnp: cnp,
      varsta: calculatedAge,
      masini: masini
    };
    return this.http.put(updateUrl, data);
  }

  

//post



calculateAgeFromCNP(cnp: string): number {
    const year = parseInt(cnp.substring(1, 3), 10);
    const currentYear = new Date().getFullYear() % 100;
    let age = currentYear - year;

    if (age < 0) {
      age += 100;
    }
  
    return age;
  }
  
  // Metoda de adăugare persoană, inclusiv calculul vârstei din CNP
  adaugaPersoana(nume: string, prenume: string, cnp: string, varsta: number, masini: string): Observable<any> {
    const calculatedAge = this.calculateAgeFromCNP(cnp);
  
    const dataPersoana = {
      nume: nume,
      prenume: prenume,
      cnp: cnp,
      varsta: calculatedAge,
      masini: masini
    };
  
    return this.http.post(this.apiUrl, dataPersoana).pipe(
      mergeMap((persoanaAdaugata: any) => {
        const idPersoana = persoanaAdaugata.id;
        const idMasini = masini.split(',').map(Number);
        return forkJoin(
          idMasini.map((idMasina: number) => {
            const dataJonctiune = {
              id_person: idPersoana,
              id_car: idMasina
            };
  
            return this.http.post(this.apiUrlJonctiune, dataJonctiune);
          })
        ).pipe(
          map(() => ({ idPersoana, idMasini })) 
        );
      })
    );
  }
//find

  findPersoane(search: string): Observable<Persoana[]> {
    const url = `${this.apiUrl}?search=${search}`;
    return this.http.get<Persoana[]>(url);
  }

// masini disponibile
private apiUrlMasini = 'http://localhost:4300/masini';

getMasiniDisponibile(): Observable<Masina[]> {
    return this.http.get<Masina[]>(this.apiUrlMasini);
  }

  // jonctiune

  adaugaJonctiune(data: any): Observable<any> {
    return this.http.post(this.apiUrlJonctiune, data);
  }
}