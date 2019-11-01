import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DndElementComponent } from './dnd-element/dnd-element.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { EditorComponent } from './editor/editor.component';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DndElementComponent, ToolBarComponent, EditorComponent],
  exports: [DndElementComponent, ToolBarComponent, EditorComponent],
  imports: [FormsModule, NgZorroAntdModule, NzResizableModule, DragDropModule, CommonModule],
})
export class TplModule {}
