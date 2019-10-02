import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'modal-confirma-cpf',
  templateUrl: './modal-confirma-cpf.component.html',
  styleUrls: ['./modal-confirma-cpf.component.scss']
})
export class ModalConfirmaCpfComponent {
  
  constructor(
    public activeModal: NgbActiveModal
  ) { }

  submit(status: boolean) {
    this.activeModal.close(status);
    window.scrollTo(0, 0);
  }

}
