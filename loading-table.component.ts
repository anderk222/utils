import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-loading-table',
  templateUrl: './loading-table.component.html',
  template: `
  <style>
  .bg-loading{
    background-image: url(/assets/esperando2.jpeg);
    background-size:contain;
    background-repeat: no-repeat;
  }
  </style>
  <div class="w-full flex flex-col justify-center text-zinc-700 items-center gap-2 h-80" >

    <figure [style]="{ 'background-image' : 'url(' + photos[status] +')' }" class="bg-loading w-44 h-44" >
    </figure>
    <p *ngIf="status =='LOAD'" class="text-center" >Cargando...</p>
    <p *ngIf="status =='NOTHING'" class="text-center" >No hay elementos que mostrar</p>
    <p *ngIf="status =='ERROR'" class="text-center text-red-500"> Ha ocurrido un error</p>

</div>

`,
  styleUrls: ['./loading-table.component.css']
})
export class LoadingTableComponent implements OnChanges {

  @Input() status: StatusLoad = 'OK';

  message = '';

  ngOnChanges(changes: SimpleChanges): void { }

  photos: { [key in StatusLoad]?: string } = {

    ERROR: '',
    LOAD: '',
    NOTHING: 'assets/nothing.jpeg',

  };

}

export type StatusLoad = 'LOAD' | 'ERROR' | 'OK' | 'NOTHING';