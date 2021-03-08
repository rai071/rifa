import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { RIFA_API } from '../api';
import { ErrorHandler } from '../app.error-handler';
import { Rifa } from './rifa/rifa.model';

export class RifasService {

    constructor(private http: HttpClient, private r: Rifa) {
        r.id = '1';
        r.name = 'teste';
        r.about = 'teste 2';
     }

    rif: Rifa[];

    rifas() {
        this.rif.push(this.r);
        console.log('>>>>>>>>>>>>', JSON.stringify(this.rif));
        return this.rif;
    }
}
