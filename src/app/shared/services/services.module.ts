import { CidadesResolver, EstadosResolver, TipoSexosResolver, NacionalidadesResolver } from './dropdown.resolver';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnderecoService } from './endereco.service';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    EnderecoService,
    NacionalidadesResolver,
    TipoSexosResolver,
    EstadosResolver,
    CidadesResolver

  ]
})
export class ServicesModule { }
