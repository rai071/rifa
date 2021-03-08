import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Rifa } from './rifa.model';

@Component({
  selector: 'app-rifa',
  templateUrl: './rifa.component.html',
  styleUrls: ['./rifa.component.css'],
  animations: [
    trigger('rifatAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}),
        animate('300ms 0s ease-in-out')
      ])
    ])
  ]
})
export class RifaComponent implements OnInit {

  restaurantState = 'ready';

  @Input() rifa: Rifa;

  constructor() { }

  ngOnInit() {
  }

}
