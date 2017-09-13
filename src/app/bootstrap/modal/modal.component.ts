import { Component, ViewChild, TemplateRef } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-b-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  closeResult: string;
  title: string;
  body: string;
  buttons: {message: string, onclick: Function}[];

  @ViewChild('content')
  content: TemplateRef<any>;

  constructor(private modalService: NgbModal) { }

  // TODO: set a template ref for #content with ViewChild, check if we can use that instead of content.
  open() {
    this.modalService.open(this.content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
