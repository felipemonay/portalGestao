import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespFinComponent } from './resp-fin.component';

describe('RespFinComponent', () => {
  let component: RespFinComponent;
  let fixture: ComponentFixture<RespFinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespFinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespFinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
