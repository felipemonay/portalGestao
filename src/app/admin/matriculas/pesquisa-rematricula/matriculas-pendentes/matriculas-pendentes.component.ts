import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'matriculas-pendentes',
  templateUrl: './matriculas-pendentes.component.html',
  styleUrls: ['./matriculas-pendentes.component.scss']
})
export class MatriculasPendentesComponent implements OnInit {
  @Input() aluno: any;

  constructor() {
    console.log('entrou');
    console.log('aluno', this.aluno);
   }

  ngOnInit() {

    console.log('aluno', this.aluno);
  }

}
