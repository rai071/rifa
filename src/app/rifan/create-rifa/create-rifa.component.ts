import { AfterViewInit, Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RIFA_API } from 'src/app/api';
import { UserDetailsComponent } from 'src/app/header/user-details/user-details.component';
import { NotificationService } from 'src/app/messages/notification.service';
import { Usuario } from 'src/app/security/login/user.model';
import { ServiceConf } from 'src/app/service/service-config';
import { CreateRifa } from './create-rifa-model';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginator } from '@angular/material/paginator';
import { GroupRifa } from './group-rifa';
import { GroupNameRifa } from './group-name-rifa';
import Swal from 'sweetalert2';

export interface PeriodicElement {
  position: number;
  name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Filmes' },
  { position: 2, name: 'Animes' },
  { position: 3, name: 'Esporte' },
  { position: 4, name: 'Veiculos' },
];

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-create-rifa',
  templateUrl: './create-rifa.component.html',
  styleUrls: ['./create-rifa.component.css']
})
export class CreateRifaComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  displayedColumnsGroup: string[] = ['id', 'nome'];
  dataSourceGroup = new MatTableDataSource<GroupNameRifa>();

  addRifaForm: FormGroup;
  createRifa = {} as CreateRifa;
  groupRifa = {} as GroupRifa;
  groupNameId = {} as GroupRifa;
  groupNameRifa = {} as GroupNameRifa;
  nomeRifa: string;
  notificationService: NotificationService;
  isSelecionado: number;

  nameGroupSelected: string;

  usuario = {} as Usuario;

  displayedColumns: string[] = ['select', 'name'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  favoriteSeason: string;
  seasons: string[] = ['Filmes', 'Animes', 'Esportes', 'Veículos'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: ServiceConf
  ) {
    if (sessionStorage.length > 0) {
      this.usuario = JSON.parse(sessionStorage.getItem('user'));
    }

  }

  ngOnInit() {
    this.isSelecionado = 0;
    this.addRifaForm = this.formBuilder.group({
      nomeRifa: this.formBuilder.control('', [Validators.required]),
      favoriteSeason: this.formBuilder.control('', [Validators.required])
    });
  }

  addrifa() {
    this.notificationService = new NotificationService(this.router);
    this.createRifa.rifa_name = this.addRifaForm.value.nomeRifa;
    this.createRifa.user_token = this.usuario.user_token;
    const group = JSON.stringify(this.selection.selected);

    this.service.createRifa(this.createRifa).subscribe({
      next: data => {
        this.showMessage('Adicionado com sucesso');
        this.usuario.rifa_token = data.rifa_token;
        sessionStorage.clear();
        sessionStorage.setItem('user', JSON.stringify(this.usuario));
        this.selection.selected.forEach(element => {
          this.groupRifa.rifa_token = this.usuario.rifa_token;
          this.groupRifa.user_token = this.usuario.user_token;
          this.groupRifa.group_id = '' + element.position;
          this.service.createGroupRifa(this.groupRifa).subscribe({
            next: dt => {
              console.log('addgroup sucess');
            },
            error: erro => {
              console.log('addgroup error', erro);
            }
          });
        });
      },
      error: erro => {
        if (erro && erro.error.info) {
          this.showMessage(erro.error.info);
        } else {
          this.msgShowError();
        }
      }
    });
  }

  showMessage(msg: any) {
    this.notificationService.simpleAlert(msg);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  isValidateForme(form: any, tbl: any) {
    if (this.addRifaForm.value.nomeRifa !== '' && this.addRifaForm.value.nomeRifa.length >= 5 && tbl) {
      return false;
    }
    return true;
  }

  viewGroup(row: any) {
    if (this.selection.hasValue()) {
      this.nameGroupSelected = row.name;
      this.groupNameId.group_id = '' + row.position;
      this.service.findNameGroup(this.groupNameId).subscribe({
        next: data => {
          this.dataSourceGroup = new MatTableDataSource(data);
          this.dataSourceGroup.paginator = this.paginator;
        },
        error: erro => {
          console.log(JSON.stringify(erro));
        }
      });
    }
  }

  ngAfterViewInit() {
    this.dataSourceGroup.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceGroup.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceGroup.paginator) {
      this.dataSourceGroup.paginator.firstPage();
    }
  }

  createNewUser(id: number): GroupNameRifa {
    const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

    return {
      id: id.toString(),
      nome: name
    };
  }

  msgShowError() {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      html: '<div style="font-size: 14px"> Algo deu errado! </div>'
    });
  }

}
