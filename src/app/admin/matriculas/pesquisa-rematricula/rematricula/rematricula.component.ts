import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rematricula',
  templateUrl: './rematricula.component.html',
  styleUrls: ['./rematricula.component.scss']
})
export class RematriculaComponent implements OnInit {
  @Input() aluno: any;

  constructor() { }

  ngOnInit() {
  }

}
