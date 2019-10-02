import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponent } from './material/material.component';
import { NceComponent } from './nce/nce.component';

@NgModule({
  declarations: [
    MaterialComponent,
    NceComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProdutosModule { }
