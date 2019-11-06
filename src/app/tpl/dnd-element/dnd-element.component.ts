import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  HostListener,
  HostBinding,
  ViewChild,
  Renderer2,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { NzResizeEvent } from 'ng-zorro-antd/resizable/ng-zorro-antd-resizable';
import { TplEditService } from '../tpl-edit.service';

@Component({
  selector: 'lm-dnd-element',
  templateUrl: './dnd-element.component.html',
  styleUrls: ['./dnd-element.component.less'],
})
export class DndElementComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('dndEl', { static: false }) dndEl: ElementRef;
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

  @Input()
  type: 'input' | 'image' = 'input';

  _data;
  @Input()
  set data(v) {
    this.analyzeStyle(v);
    this._data = v;
    console.log(this._data);
  }
  get data() {
    return this._data;
  }

  private id = -1;
  // isActive = false;
  // fontSize = 13;
  // fontWeight: 'normal' | 'bold' = 'normal';
  // fontStyle: 'normal' | 'italic' = 'normal';
  // textDecoration: 'underline' | 'none' = 'none';

  elStyle = '';

  onResize({ width, height }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.data.width = width!;
      this.data.height = height!;
      this.data.style = this.dndEl.nativeElement.attributes.style.value;
    });
  }

  @HostListener('click', ['$event.target'])
  onClick(el: any) {
    this.srv.activeEl(this.data);
  }

  del() {
    this.srv.removeEl(this.data);
  }

  dragEnded($event) {
    this.data.style = this.dndEl.nativeElement.attributes.style.value;
  }

  analyzeStyle(v: any = {}) {
    const styleObj: any = {};
    if (!v.style) {
      v.style = '';
    }
    const styleArray = v.style.split(';');
    styleArray.forEach(sy => {
      if (sy.includes('height')) {
        const h = sy.split(':')[1];
        styleObj.height = h.replace('px', '');
      }
      if (sy.includes('width')) {
        const h = sy.split(':')[1];
        styleObj.width = h.replace('px', '');
      }
      if (sy.includes('position')) {
        const h = sy.split(':')[1];
        styleObj.position = h;
      }
      if (sy.includes('transform')) {
        const h = sy.split(':')[1];
        const lIndex = h.lastIndexOf('translate3d');
        if (lIndex > 0) {
          styleObj.transform = h.substring(0, lIndex);
        } else {
          styleObj.transform = h;
        }
      }
      if (sy.includes('font-size')) {
        const h = sy.split(':')[1];
        styleObj.fontSize = h.replace('px', '');
      }
      if (sy.includes('font-weight')) {
        const h = sy.split(':')[1];
        styleObj.fontWeight = h;
      }
      if (sy.includes('font-style')) {
        const h = sy.split(':')[1];
        styleObj.fontStyle = h;
      }
      if (sy.includes('text-decoration')) {
        const h = sy.split(':')[1];
        styleObj.textDecoration = h;
      }
    });
    Object.assign(v, styleObj);
    if (v.height === undefined) {
      v.height = this.type === 'input' ? 30 : 48;
    }
    if (v.width === undefined) {
      v.width = this.type === 'input' ? 100 : 48;
    }
    if (v.transform === undefined) {
      v.transform = 'translate3d(5px, 5px, 0px)';
    }
    if (v.fontSize === undefined) {
      v.fontSize = 13;
    }
    if (v.fontWeight === undefined) {
      v.fontWeight = 'normal';
    }
    if (v.fontStyle === undefined) {
      v.fontStyle = 'normal';
    }
    if (v.textDecoration === undefined) {
      v.textDecoration = 'none';
    }
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}
  ngAfterViewInit(): void {
    this.data.style = this.dndEl.nativeElement.attributes.style.value;
    this.data.el = this.dndEl.nativeElement;
  }
}
