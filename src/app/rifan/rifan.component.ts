import { Component, OnInit } from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationService } from '../messages/notification.service';
import { Usuario } from '../security/login/user.model';

export interface PeriodicElement {
  id: number;
  numero: string;
  filme: string;
  email: string;
  price: number;
  flag: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, numero: '1', filme: 'Vingadores', email: '', flag: false, price: 2.00 },
  { id: 2, numero: '2', filme: 'Tropa de Elite', email: 'rai071@github.com', flag: false, price: 2.00 },
  { id: 3, numero: '3', filme: 'Star Wars', email: '', flag: false, price: 2.00 },
  { id: 4, numero: '4', filme: 'Godzilla', email: '', flag: false, price: 2.00 },
  { id: 5, numero: '5', filme: 'Matrix', email: '', flag: false, price: 2.00 },
  { id: 6, numero: '6', filme: 'John Wick', email: '', flag: false, price: 2.00 },
  { id: 7, numero: '7', filme: 'Farofeiros', email: '', flag: false, price: 2.00 },
  { id: 8, numero: '8', filme: 'Central do Brasil', email: '', flag: false, price: 2.00 },
  { id: 9, numero: '9', filme: 'Central do Brasil', email: '', flag: false, price: 2.00 },
  { id: 10, numero: '10', filme: 'Central do Brasil', email: '', flag: false, price: 2.00 },
  { id: 11, numero: '11', filme: 'Central do Brasil', email: '', flag: false, price: 2.00 },
  { id: 12, numero: '12', filme: 'Central do Brasil', email: '', flag: false, price: 2.00 },
  { id: 13, numero: '13', filme: 'Central do Brasil', email: '', flag: false, price: 2.00 },
  { id: 14, numero: '14', filme: 'Central do Brasil', email: '', flag: false, price: 2.00 }
];

@Component({
  selector: 'app-rifan',
  templateUrl: './rifan.component.html',
  styleUrls: ['./rifan.component.css']
})
export class RifanComponent implements OnInit {

  displayedColumns: string[] = ['numero', 'price', 'filme', 'email'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  usuario = {} as Usuario;

  email: string;

  notificationService: NotificationService;

  constructor(private router: Router) {
    if (sessionStorage.length > 0) {
      this.usuario = JSON.parse(sessionStorage.getItem('user'));
      const e = JSON.parse(sessionStorage.getItem('rifa_token'));
      if (e) {
        this.email = e.email;
      }
    }
  }

  ngOnInit() {
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {

    if (this.selection.selected.length > 0) {
      if (this.usuario) {
        this.selection.selected[0].email = this.usuario.user_email;
      } else {
        this.selection.selected[0].email = this.email;
      }
    }

    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected1(row?: PeriodicElement, event?: any) {
    this.notificationService = new NotificationService(this.router);
    row.flag = !row.flag;
    const s = row.email;
    let e: string;
    if (this.usuario) {
      e = this.usuario.user_email;
    } else if (this.email) {
      e = this.email;
    }
    if (s) {
      if (s === e && event === 1) {
        row.email = '';
      } else {
        const msg = `Número já selecionado`;
        this.notificationService.simpleAlert(msg);
      }
    } else if (this.usuario && this.usuario.user_email) {
      row.email = this.usuario.user_email;
      const msg = `Adicionado 1 item ao Carrinho`;
      this.notificationService.simpleAlert(msg);
    } else if (this.email) {
      row.email = this.email;
      const msg = `Adicionado 1 item ao Carrinho`;
      this.notificationService.simpleAlert(msg);
    } else {
      this.notificationService.alertConfirmation();
    }
  }

  emitAddEvent(item: any) {
    this.isAllSelected1(item.rifaItem, 1);
  }

}
