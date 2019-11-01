import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { TplEditComponent } from './tpl-edit/tpl-edit.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TplModule } from './tpl/tpl.module';
registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent, TplEditComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    NzResizableModule,
    FormsModule,
    TplModule,
    DragDropModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent],
})
export class AppModule {}
