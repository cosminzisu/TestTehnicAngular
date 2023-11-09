import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(masina => 
      masina.Marca.toLowerCase().includes(searchText) ||
      masina.Model.toLowerCase().includes(searchText) ||
      masina.An.toString().includes(searchText) ||
      masina.CC.toString().includes(searchText) ||
      masina.Taxa.toString().includes(searchText)
    );
  }
}
