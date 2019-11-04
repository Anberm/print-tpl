import { Component, OnInit, Input, OnDestroy, HostListener, HostBinding, ViewChild, Renderer2 } from '@angular/core';
import { NzResizeEvent } from 'ng-zorro-antd/resizable/ng-zorro-antd-resizable';
import { TplEditService } from '../tpl-edit.service';

@Component({
  selector: 'lm-dnd-element',
  templateUrl: './dnd-element.component.html',
  styleUrls: ['./dnd-element.component.less'],
})
export class DndElementComponent implements OnInit, OnDestroy {
  @ViewChild('dndEl', { static: false }) dndEl;
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  constructor(private srv: TplEditService, private renderer: Renderer2) {}
  @Input()
  boundary = '.header';

  @Input()
  maxWidth: number;

  @Input()
  maxHeight: number;

  @Input()
  minWidth: number = 64;

  @Input()
  minHeight = 20;

  private _width = 100;
  private _height = 30;
  private id = -1;
  isActive = false;

  onResize({ width, height }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this._width = width!;
      this._height = height!;
    });
  }

  @HostListener('click', ['$event.target'])
  onClick(el: any) {
    this.srv.activeEl(this);
  }

  del() {}

  ngOnInit(): void {
    this.srv.dndEl.push(this);
    console.log(this.srv.dndEl.length);
  }
  ngOnDestroy(): void {
    this.srv.dndEl = this.srv.dndEl.filter(e => e !== this);
    console.log(this.srv.dndEl.length);
  }
}
