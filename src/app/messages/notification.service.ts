import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

export class NotificationService {

    router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    simpleAlert(msg: string) {
        Swal.fire({
            title: msg,
            icon: 'warning',
            showCancelButton: false,
            cancelButtonText: 'Fechar'
        });
    }

    alertConfirmation() {
        Swal.fire({
            title: 'Você precisa estar logado !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Login',
            cancelButtonText: 'Fechar'
        }).then((result) => {
            if (result.value) {
                this.router.navigateByUrl('login');
            }
        });
    }

    alertNovoCadastroConfirmation() {
        Swal.fire({
            title: 'Usuário não encontrado !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Cadastrar',
            cancelButtonText: 'Fechar'
        }).then((result) => {
            if (result.value) {
                this.router.navigateByUrl('cadastro');
            }
        });
    }
}
