import { Component, OnInit } from "@angular/core";
import { NzResizeEvent } from 'ng-zorro-antd/resizable/ng-zorro-antd-resizable';

@Component({
  selector: "app-tpl-edit",
  templateUrl: "./tpl-edit.component.html",
  styleUrls: ["./tpl-edit.component.less"]
})
export class TplEditComponent implements OnInit {
  fontSize = 13;
  width = 400;
  height = 200;
  id = -1;
  constructor() {}

  ngOnInit() {}
  onResize({ width, height }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.width = width!;
      this.height = height!;
    });
  }
}
