import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Rifa } from './rifa/rifa.model';

import { Observable } from 'rxjs';
import { RifasService } from './rifas.service';

@Component({
  selector: 'app-rifas',
  templateUrl: './rifas.component.html',
  styleUrls: ['./rifas.component.css'],
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        'max-height': '0px'
      })),
      state('visible', style({
        opacity: 1,
        'max-height': '70px',
        'margin-top': '20px'
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})

export class RifasComponent implements OnInit {

  searchBarState = 'hidden';
  rifas: Rifa[];

  searchForm: FormGroup;
  searchControl: FormControl;

  constructor() {
  }

  ngOnInit() {
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }

}
