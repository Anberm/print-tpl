import { Component, OnInit } from '@angular/core';
import { TplEditService } from '../tpl-edit.service';

@Component({
  selector: 'lm-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
})
export class EditorComponent implements OnInit {
  constructor(public srv: TplEditService) {}

  ngOnInit() {}
}
