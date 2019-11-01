import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TplEditComponent } from './tpl-edit.component';

describe('TplEditComponent', () => {
  let component: TplEditComponent;
  let fixture: ComponentFixture<TplEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TplEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TplEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
