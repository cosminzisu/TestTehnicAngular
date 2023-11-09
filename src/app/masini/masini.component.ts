import { Component, OnInit } from '@angular/core';
import { MasiniService } from './masini.service';
import { Masina } from './masini.model';


@Component({
  selector: 'app-masini',
  templateUrl: './masini.component.html',
  styleUrls: ['./masini.component.css']
})

export class MasiniComponent implements OnInit {


  masini: Masina[] = [];
  masinaSelectata: Masina | null = null;
  searchText: string = '';
  
  constructor(private masiniService: MasiniService) {}

  ngOnInit() {
    this.getMasini();
  }

  getMasini() {
    this.masiniService.getMasini().subscribe((data: Masina[]) => {
      this.masini = data;
    });
  }

  //delete
  deleteMasina(id: number) {
    console.log("ID-ul care va fi trimis pentru ștergere:", id); 
    this.masiniService.deleteMasina(id).subscribe((response) => {
        this.getMasini();
        window.location.reload();
    });
}

  //put

  afiseazaFormular: boolean = false;
  deschideModal(masina: Masina) {
    this.masinaSelectata = { ...masina };
    this.afiseazaFormular = false;
  }

  actualizeazaMasina() {
    if (this.masinaSelectata) {
      this.masiniService.updateMasina(
        this.masinaSelectata.id,
        this.masinaSelectata.Marca,
        this.masinaSelectata.Model,
        this.masinaSelectata.An,
        this.masinaSelectata.CC,
        this.masinaSelectata.Taxa
      ).subscribe((response) => {
        console.log(response);
        this.getMasini();

        this.inchideModal();
      });
    }
  }

  // /put

  //post 
  marcaNou: string = '';
  modelNou: string = '';
  anNou: number = 0;
  ccNou: number = 0;
  taxaNou: number = 0;

deschideFormularAdaugare() {
  this.afiseazaFormular = true;
  this.masinaSelectata = null;
}
reseteazaDatele(): void {
  this.marcaNou = '';
  this.modelNou = '';
  this.anNou = 0;
  this.ccNou = 0;
  this.taxaNou = 0;
}
anuleazaAdaugare() {
  this.afiseazaFormular = false;
  this.reseteazaDatele();
}


modelValidat: boolean = true;

afiseazaEroareModel: boolean = false;
afiseazaEroareMarca: boolean = false;
afiseazaEroareAn: boolean = false;
afiseazaEroareCC: boolean = false;

adaugaMasina() {
  this.afiseazaEroareMarca = !this.marcaNou;
  this.afiseazaEroareModel = !this.modelNou;  
  this.afiseazaEroareAn = !this.anNou; 
  this.afiseazaEroareCC = !this.ccNou;

  if (!this.afiseazaEroareMarca && !this.afiseazaEroareModel && !this.afiseazaEroareAn && !this.afiseazaEroareCC) {
    this.masiniService
      .adaugaMasina(this.marcaNou, this.modelNou, this.anNou, this.ccNou, this.taxaNou)
      .subscribe((response) => {
        this.afiseazaFormular = false; 
        this.getMasini();
      });
  }
}
  // Închide modalul
  inchideModal() {
    this.masinaSelectata = null;
  }

  
}