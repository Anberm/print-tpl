import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TplEditService {
  dndEl = [];

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
  paperWidth = 241;
  // 纸张高度
  paperHeight = 93;

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
  paperHeader = [
    {
      name: '无',
      value: undefined,
    },
    {
      name: '公司名称',
      value: 'company name',
    },
  ];
  paperHeaderText = '公司名称';
  // 页脚
  paperFooter = [
    {
      name: '无',
      value: undefined,
    },
    {
      name: '第1页',
      value: 'one',
    },
    ,
    {
      name: '第1页,共n页',
      value: 'one and count',
    },
  ];

  paperFooterText = '第1页,共2页';

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
  // 表体字段
  formBodys = [];
  // 数据合计
  formCount = [];
  // 表尾字段
  formFooter = [];
  // 打印图片
  formPic = [];

  constructor() {}
  activeEl(el) {
    el.isActive = true;
    this.dndEl.filter(e => e !== el).forEach(e => (e.isActive = false));
  }

  reset() {}
}
