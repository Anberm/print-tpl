import { Component, OnInit } from '@angular/core';
import { TplEditService } from '../tpl-edit.service';

@Component({
  selector: 'lm-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.less'],
})
export class ToolBarComponent {
  constructor(public srv: TplEditService) {}
}
