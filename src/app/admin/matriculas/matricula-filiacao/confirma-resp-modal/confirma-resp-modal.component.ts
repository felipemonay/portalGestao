import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-confirma-resp-modal',
  templateUrl: './confirma-resp-modal.component.html',
  styleUrls: ['./confirma-resp-modal.component.scss']
})
export class ConfirmaRespModalComponent {
  
  constructor(
    public activeModal: NgbActiveModal
  ) { }

  submit(status: boolean) {
    this.activeModal.close(status);
    window.scrollTo(0, 0);
  }

}
