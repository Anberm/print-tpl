import { Component, OnInit } from '@angular/core';
import { TplEditService } from '../tpl-edit.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'lm-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
})
export class EditorComponent implements OnInit {
  constructor(public srv: TplEditService) {}

  ngOnInit() {}
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.srv.selectedFormBodys, event.previousIndex, event.currentIndex);
  }
}
