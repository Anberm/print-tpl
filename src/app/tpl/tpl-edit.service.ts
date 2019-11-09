import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mmToPx } from './dpi.util';
import { Subject } from 'rxjs';
import { TplElement, TplData } from './interface';

@Injectable({
  providedIn: 'root',
})
export class TplEditService {
  private tplDataSource$ = new Subject();
  public get tplData() {
    return this.tplDataSource$.asObservable();
  }

  // 打印对象
  printObjs = [
    {
      name: '销售订单',
      value: 1,
    },
    {
      name: '发货单',
      value: 2,
    },
  ];
  markLeft = -40;
  printObj = this.printObjs[0];
  // 模板名称
  printName = '';
  // 纸张类型
  papers = [
    {
      name: 'A4(210x297)mm',
      value: {
        width: 210,
        height: 297,
      },
    },
    {
      name: '一等分(241x280)mm',
      value: {
        width: 241,
        height: 280,
      },
    },
    {
      name: '二等分(241x140)mm',
      value: {
        width: 241,
        height: 140,
      },
    },
    {
      name: '三等分(241x93)mm',
      value: {
        width: 241,
        height: 93,
      },
    },
    {
      name: '自定义纸张大小',
      value: undefined,
    },
  ];
  paper = this.papers[0];
  // 纸张宽度
  paperWidthPx = mmToPx(210);
  _paperWidth = 210;
  get paperWidth() {
    return this._paperWidth;
  }
  set paperWidth(v) {
    this._paperWidth = v;
    this.paperWidthPx = mmToPx(this._paperWidth);
  }
  // 纸张高度
  paperHeightPx = mmToPx(297);
  _paperHeight = 297;
  get paperHeight() {
    return this._paperHeight;
  }
  set paperHeight(v) {
    this._paperHeight = v;
    this.paperHeightPx = mmToPx(this._paperHeight);
  }

  // 内边距
  _padding = 15;
  set padding(v) {
    this._padding = v;
    this.markLeft = -25 - this._padding;
  }
  get padding() {
    return this._padding;
  }

  // 表头高度
  headerHeight = 100;
  // 表尾高度
  footerHeight = 80;
  // 页眉
  paperHeaders = [
    {
      name: '无',
      value: undefined,
    },
    {
      name: '公司名称',
      value: 'companyName',
    },
  ];
  paperHeader = this.paperHeaders[0];
  // 页脚
  paperFooters = [
    {
      name: '无',
      value: undefined,
    },
    {
      name: '第1页',
      value: 'One',
    },
    {
      name: '第1页,共n页',
      value: 'OneN',
    },
  ];
  paperFooter = this.paperFooters[0];

  // 是否连续打印
  isContinuousPrinting = false;
  // 每页打印表头
  paginalHeader = false;
  // 每页打印表尾
  paginalFooter = false;
  // 尾部锁定底部
  fixedFooter = false;

  // 表头字段
  formHeaders = [];
  selectedFormHeaders = [];
  // 表体字段
  formBodys = [];
  selectedFormBodys = [];
  // 数据合计
  formCounts = [];
  selectedFormCounts = [];
  // 表尾字段
  formFooters = [];
  selectedFormFooters = [];
  // 打印图片
  formPic = [];

  currentActiveEl;
  fontSize = 13;
  fontWeight: 'normal' | 'bold' = 'normal';
  fontStyle: 'normal' | 'italic' = 'normal';
  textDecoration: 'underline' | 'none' = 'none';

  constructor(private http: HttpClient) {
    this.http.get('./assets/data.json').subscribe((x: any) => {
      this.formHeaders = x.formHeaders || [];
      this.formBodys = x.formBodys || [];
      this.formCounts = x.formCounts || [];
      this.formFooters = x.formFooters || [];
      this.formPic = x.formPic || [];
      this.initSelected();
    });
  }

  initSelected() {
    this.formHeaderChange();
    this.formBodyChange();
    this.formFooterChange();
  }

  activeEl(el) {
    el.isActive = true;
    this.currentActiveEl = el;
    this.fontSize = el.fontSize;
    this.fontStyle = el.fontStyle;
    this.textDecoration = el.textDecoration;
    this.selectedFormHeaders.filter(e => e !== el).forEach(e => (e.isActive = false));
    this.selectedFormFooters.filter(e => e !== el).forEach(e => (e.isActive = false));
  }

  removeEl(el) {
    el.selected = false;
    this.selectedFormHeaders = this.selectedFormHeaders.filter(e => e !== el);
    this.selectedFormFooters = this.selectedFormFooters.filter(e => e !== el);
    this.formPic = this.formPic.filter(e => e !== el);
  }

  bold() {
    if (!this.currentActiveEl) {
      return;
    }
    if (this.currentActiveEl.fontWeight === 'normal') {
      this.currentActiveEl.fontWeight = 'bold';
    } else {
      this.currentActiveEl.fontWeight = 'normal';
    }
    this.refreshStyle();
  }

  italic() {
    if (!this.currentActiveEl) {
      return;
    }
    if (this.currentActiveEl.fontStyle === 'normal') {
      this.currentActiveEl.fontStyle = 'italic';
    } else {
      this.currentActiveEl.fontStyle = 'normal';
    }
    this.refreshStyle();
  }

  underline() {
    if (!this.currentActiveEl) {
      return;
    }
    if (this.currentActiveEl.textDecoration === 'none') {
      this.currentActiveEl.textDecoration = 'underline';
    } else {
      this.currentActiveEl.textDecoration = 'none';
    }
    this.refreshStyle();
  }
  refreshStyle() {
    if (this.currentActiveEl) {
      setTimeout(() => {
        this.currentActiveEl.style = this.currentActiveEl.el.attributes.style.value;
      }, 20);
    }
  }

  get isBold() {
    return this.currentActiveEl && this.currentActiveEl.fontWeight === 'bold';
  }
  get isItalic() {
    return this.currentActiveEl && this.currentActiveEl.fontStyle === 'italic';
  }
  get isUnderline() {
    return this.currentActiveEl && this.currentActiveEl.textDecoration === 'underline';
  }

  changeFontSize(e) {
    if (this.currentActiveEl) {
      this.currentActiveEl.fontSize = this.fontSize;
      this.refreshStyle();
    }
  }

  formHeaderChange() {
    this.selectedFormHeaders = this.formHeaders.filter(h => h.selected);
  }

  formBodySort() {
    this.formBodys.sort((x, y) => x.order - y.order);
  }
  formBodyChange() {
    this.selectedFormBodys = this.formBodys.filter(h => h.selected);
  }
  formCountChange() {
    this.selectedFormCounts = this.formCounts.filter(h => h.selected);
  }
  formFooterChange() {
    this.selectedFormFooters = this.formFooters.filter(h => h.selected);
  }

  paperChange($event) {
    if (this.paper.value) {
      this.paperHeight = this.paper.value.height;
      this.paperWidth = this.paper.value.width;
    }
  }

  upload($event) {
    console.log($event);
  }

  reset() {}

  convertPreviewPrint() {
    const pObj: any = {
      paperHeaderText: this.paperHeader.value ? this.paperHeader.name : '',
      paperFooterText: this.paperFooter.value ? this.paperFooter.name : '',
      paperWidth: this.paperWidthPx,
      paperHeight: this.paperHeightPx,
      padding: this.padding,
      headerHeight: this.headerHeight,
      footerHeight: this.footerHeight,
      fixedFooter: this.fixedFooter,
      formPics: this.formPic.map(x => {
        return {
          title: '',
          value: x.thumbUrl,
          style: x.style,
        } as TplElement;
      }),
      formHeaders: this.selectedFormHeaders.map(x => {
        return {
          title: x.type === 'input' ? '' : x.title,
          value: x.value,
          style: x.style,
        } as TplElement;
      }),
      formBodys: this.selectedFormBodys.map(x => {
        return {
          title: x.title,
          value: x.value,
          style: x.style,
        } as TplElement;
      }),
      formFooters: this.selectedFormFooters.map(x => {
        return {
          title: x.type === 'input' ? '' : x.title,
          value: x.value,
          style: x.style,
        } as TplElement;
      }),
    };
    return pObj;
  }

  private getTplData() {
    const tplData: TplData = {
      printObj: this.printObj,
      tplName: this.printName,
      paperType: this.paper,
      paperWidth: this.paperWidthPx,
      paperHeight: this.paperHeightPx,
      padding: this.padding,
      headerHeight: this.headerHeight,
      footerHeight: this.footerHeight,
      paperHeaderText: this.paperHeader.value ? this.paperHeader.name : '',
      paperFooterText: this.paperFooter.value ? this.paperFooter.name : '',
      isContinuousPrinting: this.isContinuousPrinting,
      paginalHeader: this.paginalHeader,
      paginalFooter: this.paginalFooter,
      fixedFooter: this.fixedFooter,
      data: {
        formHeaders: this.formHeaders,
        selectedFormHeaders: this.selectedFormHeaders,
        formBodys: this.formBodys,
        selectedFormBodys: this.selectedFormBodys,
        formCounts: this.formCounts,
        selectedFormCounts: this.selectedFormCounts,
        formFooters: this.formFooters,
        selectedFormFooters: this.selectedFormFooters,
        formPic: this.formPic,
      },
    };
  }

  save() {
    this.tplDataSource$.next(this.getTplData());
  }
}
