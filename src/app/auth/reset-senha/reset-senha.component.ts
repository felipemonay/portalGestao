import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-reset-senha',
  templateUrl: './reset-senha.component.html',
  styleUrls: ['./reset-senha.component.scss']
})
export class ResetSenhaComponent implements OnInit {

    f: FormGroup;
    errorCredentials = false;
  
    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService,
      private toastrSrv: ToastrService,
    ) { }
  
    ngOnInit() {
      localStorage.clear();
      this.f = this.formBuilder.group({
        cpf:            [null, [Validators.required, Validators.minLength(9)]],
        dataNascimento: [null, [Validators.required]]
      });
    }
  
    onSubmit() {
      if (this.f.valid) {
        this.authService.resetSenha(this.f.value).subscribe(success => {
          console.log('success', success);
          let email = success.email;
            this.toastrSrv.success(`Enviamos para o e-mail ${email} a nova senha.`, 'Senha resetada com sucesso!', {timeOut: 6000});
            this.navigateTo();
  
          }, (err) => {
            this.trataErro(err);
          }
        );
  
      } else {
        window.scrollTo(0, 0);
        this.mostraErrosForm(this.f);
      }
    }

    trataErro(err: HttpErrorResponse) {
      // console.log(err);
      try {
        const arrKeys = Object.keys(err.error);
        const config = {
          'progressBar': true,
          maxOpened: 5
        };
        arrKeys.forEach(key => {
          const arrKeyErros = err.error[key];
          if (Array.isArray(arrKeyErros)) {
            arrKeyErros.forEach(errorMessage => {
              this.toastrSrv.error(errorMessage, '', config).onTap.pipe(take(1));
            });
          } else {
            this.toastrSrv.error(arrKeyErros, '').onTap.pipe(take(1));
          }
        });
      } catch (error) {
        console.log('Erro Não tratado handle', error);
        this.toastrSrv.error('Ocorreu um erro inesperado!!!', '').onTap.pipe(take(1));
      }
    }
  
    navigateTo() {
      this.router.navigate(['auth/login']);
    }
    mostraErrosForm(formGroup) {
      Object.keys(formGroup.controls).forEach(campo => {
        const control = formGroup.get(campo);
        if (control instanceof FormControl) {
          control.markAsDirty();
          control.markAsTouched();
  
          if (control.invalid) {
            this.toastrSrv.warning(`O campo ${campo} deve ser prenchido` , 'Existem campos incompletos', {timeOut: 3000});
          }
        } else if (control instanceof FormGroup) {
          this.mostraErrosForm(control);
        }
      });
    }
  }
  
  