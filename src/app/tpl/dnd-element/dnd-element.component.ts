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
import { toNumber } from 'ng-zorro-antd';

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

  getTransform(str: string = '') {
    // translate3d\([\-|0-9][0-9]*px, [\-|0-9][0-9]*px, [\-|0-9][0-9]*px\)
    const tArray = str.match(/translate3d\([\-|0-9][0-9]*px, [\-|0-9][0-9]*px, [\-|0-9][0-9]*px\)/g);
    if (tArray.length <= 1) {
      return tArray.length === 1 ? tArray[0] : '';
    }
    const ts = tArray
      .map(x => x.match(/[\-|0-9][0-9]*px/g))
      .reduce((x, y): any[] => {
        return [
          toNumber(x[0].replace('px', '')) + toNumber(y[0].replace('px', '')),
          toNumber(x[1].replace('px', '')) + toNumber(y[1].replace('px', '')),
          toNumber(x[2].replace('px', '')) + toNumber(y[2].replace('px', '')),
        ];
      });
    return `translate3d(${ts[0]}px, ${ts[1]}px, ${ts[2]}px)`;
    // [[1, 2, 3], [4, 5, 6]].reduce((x, y) => {console.log(x+'---'+y);return [x[0]+y[0],x[1]+y[1],x[2]+y[2]]});
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
        styleObj.transform = this.getTransform(h);
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
