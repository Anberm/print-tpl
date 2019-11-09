import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { TplEditService } from '../tpl-edit.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'lm-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
})
export class EditorComponent implements OnInit {
  @Input() uploadUrl: string = 'https://jsonplaceholder.typicode.com/posts/';
  @Input() customBaseTpl: TemplateRef<any>;
  @Input() customDataTpl: TemplateRef<any>;

  constructor(public srv: TplEditService) {}

  ngOnInit() {}
  drop(event: CdkDragDrop<string[]>) {
    const pOrder = this.srv.selectedFormBodys[event.previousIndex].order;
    this.srv.selectedFormBodys[event.previousIndex].order = this.srv.selectedFormBodys[event.currentIndex].order;
    this.srv.selectedFormBodys[event.currentIndex].order = pOrder;
    moveItemInArray(this.srv.selectedFormBodys, event.previousIndex, event.currentIndex);
    this.srv.formBodySort();
  }
}
