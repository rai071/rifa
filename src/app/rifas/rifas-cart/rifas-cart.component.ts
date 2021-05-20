import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { RifasCartService } from './cart-service';
import { RifasComponent } from '../rifas.component';
import { RifanComponent } from 'src/app/rifan/rifan.component';

@Component({
  selector: 'app-rifas-cart',
  templateUrl: './rifas-cart.component.html',
  styleUrls: ['./rifas-cart.component.css'],
  providers: [RifasCartService, RifasComponent],
  animations: [
    trigger('row', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', animate('300ms 0s ease-in', keyframes([
        style({ opacity: 0, transform: 'translateX(-30px)', offset: 0 }),
        style({ opacity: 0.8, transform: 'translateX(10px)', offset: 0.8 }),
        style({ opacity: 1, transform: 'translateX(0px)', offset: 1 })
      ]))),
      transition('ready => void', animate('300ms 0s ease-out', keyframes([
        style({ opacity: 1, transform: 'translateX(0px)', offset: 0 }),
        style({ opacity: 0.8, transform: 'translateX(-10px)', offset: 0.2 }),
        style({ opacity: 0, transform: 'translateX(30px)', offset: 1 })
      ])))
    ])
  ]
})
export class RifasCartComponent implements OnInit {

  rowState = 'ready';
  itemAllRemove: any;

  constructor(
    private rifasCartService: RifasCartService,
    private rifa: RifasComponent,
    private rifan: RifanComponent) { }

  ngOnInit() {
  }

  items(): any[] {
    return this.rifasCartService.items;
  }

  clear() {
    this.itemAllRemove = 'all';
    this.rifa.emitAddEvent(this.itemAllRemove);
    this.rifasCartService.clear();
  }

  removeItem(item: any) {
    // this.rifa.emitAddEvent(item);
    this.rifan.emitAddEvent(item);
    this.rifasCartService.removeItem(item);
  }

  addItem(item: any) {
    this.rifasCartService.addItem(item);
  }

  total(): number {
    return this.rifasCartService.total();
  }

  comprar() {

  }
}
