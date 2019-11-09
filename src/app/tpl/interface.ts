export interface TplData {
  printObj: any;
  tplName: string;
  paperType: any;
  // 纸张宽度 px
  paperWidth: number;
  // 纸张高度 px
  paperHeight: number;
  padding: number;
  headerHeight: number;
  footerHeight: number;
  // 页眉
  paperHeaderText: string;
  // 页脚
  paperFooterText: string;
  // 是否连续打印
  isContinuousPrinting: boolean;
  // 每页打印表头
  paginalHeader: boolean;
  // 每页打印表尾
  paginalFooter: boolean;
  // 尾部锁定底部
  fixedFooter: boolean;

  data: TplDataSource;
}
export interface TplDataSource {
  formHeaders: TplElement[];
  selectedFormHeaders: TplElement[];
  formBodys: TplElement[];
  selectedFormBodys: TplElement[];
  formCounts: TplElement[];
  selectedFormCounts: TplElement[];
  formFooters: TplElement[];
  selectedFormFooters: TplElement[];
  formPic: TplElement[];
}
export interface TplElement {
  title: string;
  value?: any;
  style: string;
  selected?: boolean;
  type?: 'input' | 'label';
  order?: number;
  field?: string;
  area?: 'header' | 'body' | 'count' | 'footer';
}
