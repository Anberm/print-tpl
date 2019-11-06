import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TplEditService } from '../tpl-edit.service';
import { TplPrintService } from '../tpl-print.service';

@Component({
  selector: 'lm-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.less'],
})
export class ToolBarComponent {
  @ViewChild('tplPrint', { static: false }) tplPrint: ElementRef;
  constructor(public srv: TplEditService, private printSrv: TplPrintService) {}

  preview($event) {
    console.log(this.tplPrint);
    const pObj = this.srv.convertPreviewPrint();
    this.printSrv.convert(pObj);
    this.printSrv.print(this.tplPrint.nativeElement.innerHTML);
  }
  save($event) {}
}
