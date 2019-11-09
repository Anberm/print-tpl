import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { TplEditService } from '../tpl-edit.service';
import { TplPrintService } from '../tpl-print.service';
import { NzModalService } from 'ng-zorro-antd';
import { TplElement } from '../interface';

@Component({
  selector: 'lm-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.less'],
})
export class ToolBarComponent {
  @ViewChild('tplPrint', { static: false }) tplPrint: ElementRef;

  _fieldObj: TplElement = {
    title: '',
    value: '',
    style: '',
    selected: false,
    type: 'label',
  };
  fieldObj = Object.assign({}, this._fieldObj);
  types = [
    {
      title: '标签',
      value: 'label',
    },
    {
      title: '输入',
      value: 'input',
    },
  ];
  areas = [
    {
      title: '表头',
      value: 'header',
    },
    {
      title: '表体',
      value: 'header',
    },
    {
      title: '合计',
      value: 'count',
    },
    {
      title: '表尾',
      value: 'footer',
    },
  ];
  @ViewChild('fieldTpl', { static: false }) fieldTpl: TemplateRef<any>;
  constructor(public srv: TplEditService, private printSrv: TplPrintService, private modalSrv: NzModalService) {}

  preview($event) {
    console.log(this.tplPrint);
    const pObj = this.srv.convertPreviewPrint();
    this.printSrv.convert(pObj);
    setTimeout(() => {
      this.printSrv.print(this.tplPrint.nativeElement.innerHTML);
    }, 100);
  }
  save($event) {
    this.srv.save();
  }

  reset() {
    this.fieldObj = Object.assign({}, this._fieldObj);
  }

  addField() {
    this.modalSrv.create({
      nzTitle: '新增数据源字段',
      nzContent: this.fieldTpl,
      nzOnCancel: e => {
        this.reset();
      },
      nzOnOk: e => {
        this.srv.addField(this.fieldObj);
        this.reset();
      },
    });
  }
}
