import { Component, OnInit } from '@angular/core';
import { PersoaneService } from './persoane.service';
import { Persoana } from './persoane.model';
import { Masina } from '../masini/masini.model';


@Component({
  selector: 'app-persoane',
  templateUrl: './persoane.component.html',
  styleUrls: ['./persoane.component.css']
})
export class PersoaneComponent implements OnInit {
  masiniDisponibile: Masina[] = [];
  persoane: Persoana[] = [];
  persoanaSelectata: Persoana | null = null;
  searchText: string = '';
  masiniFormatate: any[] = [];
 
  

 
  constructor(private persoaneService: PersoaneService) {}

  ngOnInit() {
    this.getPersoane();
    this.getMasiniNeselectate();
  }
  getMasiniNeselectate() {
    this.persoaneService.getMasiniDisponibile().subscribe((data: Masina[]) => {
      this.masiniDisponibile = data;
    });
  }

  

  getPersoane() {
    this.persoaneService.getPersoane().subscribe((data: Persoana[]) => {
      this.persoane = data;
    });
  }

  //delete
  deletePersoana(id: number) {
    this.persoaneService.deletePersoana(id).subscribe((response) => {
      this.getPersoane();
      window.location.reload();
    });
  }

  

  //put

  deschideModal(persoana: Persoana) {
    this.persoanaSelectata = { ...persoana };
    this.afiseazaFormular = false;
  }

  actualizeazaPersoana() {
    if (this.persoanaSelectata) {
      this.persoaneService.updatePersoana(
        this.persoanaSelectata.id,
        this.persoanaSelectata.Nume,
        this.persoanaSelectata.Prenume,
        this.persoanaSelectata.CNP,
        this.persoanaSelectata.Varsta,
        this.persoanaSelectata.masini
      ).subscribe((response) => {
        console.log(response);
        this.getPersoane();
        this.inchideModal();
      });
    }
  }
  // Închide modalul
  inchideModal() {
    this.persoanaSelectata = null;
  }


//post 

  numeNou: string = '';
  prenumeNou: string = '';
  cnpNou: string = '';
  varstaNoua: number = 0;
  masiniNou: { Marca: string, Model: string, An: number, CC: number, Taxa: number }[] = [];

deschideFormularAdaugare() {
  this.afiseazaFormular = true;
  this.persoanaSelectata = null;
}
reseteazaDatele(): void {
  this.numeNou = '';
  this.prenumeNou = '';
  this.cnpNou = '';
  this.varstaNoua = 0;
  this.masiniNou = [];
}
anuleazaAdaugare() {
  this.afiseazaFormular = false;
  this.reseteazaDatele();
}



numeValidat: boolean = true;

afiseazaFormular: boolean = false;
afiseazaEroareNume: boolean = false;
afiseazaEroarePrenume: boolean = false;
afiseazaEroareCNP: boolean = false;

adaugaPersoana() {
  this.afiseazaEroareNume = !this.numeNou;
  this.afiseazaEroarePrenume = !this.prenumeNou;
  this.afiseazaEroareCNP = !this.cnpNou;
  const masiniFormatate = this.masiniNou.map(masina => `Masina - ${masina.Marca} / ${masina.Model}, An - ${masina.An}, Capacitate Cilindrica - ${masina.CC}, Taxa - ${masina.Taxa} lei`);
  if (!this.afiseazaEroareNume && !this.afiseazaEroarePrenume && !this.afiseazaEroareCNP) {
    const masiniFormatateString = masiniFormatate.join('\n');
    this.persoaneService
      .adaugaPersoana(this.numeNou, this.prenumeNou, this.cnpNou, this.varstaNoua, masiniFormatateString)
      .subscribe((response) => {
        const { idPersoana, idMasini } = response;

        idMasini.forEach((idMasina: number) => {
          const dataJonctiune = {
            id_person: idPersoana,
            id_car: idMasina
          };

          this.persoaneService.adaugaJonctiune(dataJonctiune).subscribe(() => {
            console.log('Joncțiunea s-a efectuat cu succes!');
            this.afiseazaFormular = false;
            this.getPersoane();
          });
        });
      });
  }
}

calculeazaVarsta() {
  this.varstaNoua = this.persoaneService.calculateAgeFromCNP(this.cnpNou);
}
  
}