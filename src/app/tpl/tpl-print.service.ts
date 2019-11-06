import { Injectable } from '@angular/core';
import { mmToPx } from './dpi.util';
export interface TplElement {
  title: string;
  value?: any;
  style: string;
}
@Injectable({
  providedIn: 'root',
})
export class TplPrintService {
  paperHeaderText = '';
  paperFooterText = '';
  paperWidth = mmToPx(241);
  paperHeight = mmToPx(93);
  padding = 15;
  // 表头高度
  headerHeight = 100;
  // 表尾高度
  footerHeight = 80;
  // 尾部锁定底部
  fixedFooter = false;

  formPics: TplElement[] = [];
  formHeaders: TplElement[] = [];
  formBodys: TplElement[] = [];
  formFooters: TplElement[] = [];

  constructor() {
    this.mockData();
  }

  mockData() {
    this.paperHeaderText = '汇智浩达科技有限公司';
    this.paperFooterText = '第1页，共2页';
    this.formPics = [
      {
        title: '',
        value: 'http://sta.dingshang123.com/static/other/18/1/1/21390769176_25831.jpg?width=500&height=500',
        style:
          'height: 48px; width: 48px; transform: translate3d(361px, 25px, 0px); font-size: 13px; font-weight: normal; font-style: normal; text-decoration: none; position: relative;',
      },
      {
        title: '',
        value: 'http://sta.dingshang123.com/static/other/18/1/1/21390769176_25831.jpg?width=500&height=500',
        style:
          'height: 48px; width: 48px; transform: translate3d(755px, 211px, 0px); font-size: 13px; font-weight: normal; font-style: normal; text-decoration: none; position: relative;',
      },
    ];
    this.formHeaders = [
      {
        title: '汇智浩达订货单',
        style:
          'height: 56px; width: 162.825px; transform: translate3d(367px, -27px, 0px); font-size: 20px; font-weight: bold; font-style: normal; text-decoration: none; position: relative;',
      },
      {
        title: '地区',
        value: '123区',
        style:
          'height: 30px; width: 100px; transform: translate3d(169px, 17px, 0px); font-size: 13px; font-weight: bold; font-style: normal; position: relative; text-decoration: underline;',
      },
      {
        title: '客户名称',
        value: '客户01',
        style:
          'height: 24px; width: 100px; transform: translate3d(147px, -32px, 0px); font-size: 13px; font-weight: bold; font-style: normal; text-decoration: none; position: relative;',
      },
      {
        title: '公司名称',
        value: '汇智浩达科技有限公司',
        style:
          'height: 30px; width: 100px; transform: translate3d(169px, 17px, 0px); font-size: 13px; font-weight: bold; font-style: normal; position: relative; text-decoration: underline;',
      },
      {
        title: '下单时间',
        value: '2019-01-25',
        style:
          'height: 30px; width: 100px; transform: translate3d(289px, -16px, 0px); font-size: 13px; font-weight: normal; font-style: normal; text-decoration: none; position: relative;',
      },
      {
        title: '联系电话',
        value: '13568521452',
        style:
          'height: 30px; width: 100px; transform: translate3d(408px, 22px, 0px); font-size: 13px; font-weight: normal; font-style: normal; text-decoration: none; position: relative;',
      },
      {
        title: '地区',
        value: '1234区',
        style:
          'height: 30px; width: 100px; transform: translate3d(562px, -20px, 0px); font-size: 13px; font-weight: normal; font-style: normal; text-decoration: none; position: relative;',
      },
      {
        title: '地区',
        value: '12345区',
        style:
          'height: 30px; width: 100px; transform: translate3d(712px, -4px, 0px); font-size: 13px; font-weight: normal; font-style: normal; text-decoration: none; position: relative;',
      },
    ];
    this.formBodys = [
      { title: '商品名称', style: 'width: 54.825px;' },
      { title: '单价', style: 'width: 117px; position: relative;' },
      { title: '单位', style: 'width: 138px; position: relative;' },
      { title: '数量', style: 'width: 134px; position: relative;' },
      { title: '已发货数量', style: 'width: 137px; position: relative;' },
      { title: '仓库名', style: 'width: 132px; position: relative;' },
      { title: '小计', style: 'width: 133px; position: relative;' },
      { title: '商品分类', style: 'width: 131px; position: relative;' },
    ];

    this.formFooters = [
      {
        title: '备注',
        value: '备注1',
        style:
          'height: 30px; width: 100px; transform: translate3d(12px, 0px, 0px); font-size: 13px; font-weight: normal; font-style: normal; text-decoration: none; position: relative;',
      },
      {
        title: '优惠金额',
        value: '10',
        style:
          'height: 33px; width: 100px; transform: translate3d(57px, 29px, 0px) translate3d(5px, 5px, 0px); font-size: 13px; font-weight: normal; font-style: normal; text-decoration: none; position: relative;',
      },
      {
        title: '配送方式',
        value: '顺丰快递',
        style:
          'height: 30px; width: 100px; transform: translate3d(206px, 29px, 0px) translate3d(5px, 5px, 0px); font-size: 13px; font-weight: normal; font-style: normal; text-decoration: none; position: relative;',
      },
      {
        title: '操作时间',
        value: '2018-10-25',
        style:
          'height: 30px; width: 100px; transform: translate3d(240px, -6px, 0px) translate3d(5px, 5px, 0px); font-size: 13px; font-weight: normal; font-style: normal; text-decoration: none; position: relative;',
      },
      {
        title: '特批价',
        value: '62',
        style:
          'height: 30px; width: 100px; transform: translate3d(240px, -6px, 0px) translate3d(5px, 5px, 0px); font-size: 13px; font-weight: normal; font-style: normal; text-decoration: none; position: relative;',
      },
      {
        title: '交货时间',
        value: '2019-20.55',
        style:
          'height: 30px; width: 100px; transform: translate3d(400px, 4px, 0px) translate3d(5px, 5px, 0px); font-size: 13px; font-weight: normal; font-style: normal; text-decoration: none; position: relative;',
      },
      {
        title: '',
        value: '自定义字段32323',
        style:
          'height: 30px; width: 91px; transform: translate3d(496px, 10px, 0px) translate3d(5px, 5px, 0px); font-size: 13px; font-weight: normal; font-style: normal; text-decoration: none; position: relative;',
      },
      {
        title: '操作员',
        value: '刘亚飞',
        style:
          'height: 30px; width: 100px; transform: translate3d(587px, 44px, 0px) translate3d(5px, 5px, 0px); font-size: 13px; font-weight: normal; font-style: normal; text-decoration: none; position: relative;',
      },
    ];
  }
}
