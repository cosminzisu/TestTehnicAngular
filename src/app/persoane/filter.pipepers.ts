import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPersoane'
})
export class FilterPipePers implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase(); 

    return items.filter(item => {
      if (item && item.Nume && item.Prenume && item.CNP && item.Varsta) {
        return (
          item.Nume.toLowerCase().includes(searchText) ||
          item.Prenume.toLowerCase().includes(searchText) ||
          item.CNP.toLowerCase().includes(searchText) ||
          item.Varsta.toString().includes(searchText)
        );
      } else {
        console.log('Element cu proprietăți lipsă sau definite în mod necorespunzător:', item);
        return false; 
      }
    });
  }
}
