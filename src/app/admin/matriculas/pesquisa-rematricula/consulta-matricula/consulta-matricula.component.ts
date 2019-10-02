import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DadosComponent } from './dados/dados.component';

@Component({
  selector: 'consulta-matricula',
  templateUrl: './consulta-matricula.component.html',
  styleUrls: ['./consulta-matricula.component.scss',
              '../pesquisa-rematricula.component.scss']
})
export class ConsultaMatriculaComponent implements OnInit {
  @Input() aluno: any;


  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    // console.log('aluno', this.aluno);
  }

  open(idMatricula) {
    const modalRef = this.modalService.open(DadosComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.idMatricula = idMatricula;
    // modalRef.componentInstance.mensagem = mensagem;
  }
}
