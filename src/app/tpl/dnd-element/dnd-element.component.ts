import { Component, OnInit, Input } from '@angular/core';
import { NzResizeEvent } from 'ng-zorro-antd/resizable/ng-zorro-antd-resizable';
import { TplEditService } from '../tpl-edit.service';

@Component({
  selector: 'lm-dnd-element',
  templateUrl: './dnd-element.component.html',
  styleUrls: ['./dnd-element.component.less'],
})
export class DndElementComponent {
  @Input()
  boundary = '.header';

  @Input()
  maxWidth: number;

  @Input()
  maxHeight: number;

  @Input()
  minWidth: number = 40;

  @Input()
  minHeight = 40;

  private _width = 200;
  private _height = 80;
  private id = -1;
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  constructor(private srv: TplEditService) {}

  onResize({ width, height }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this._width = width!;
      this._height = height!;
    });
  }
}
