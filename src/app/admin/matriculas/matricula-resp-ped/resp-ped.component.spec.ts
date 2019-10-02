import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespPedComponent } from './resp-ped.component';

describe('RespPedComponent', () => {
  let component: RespPedComponent;
  let fixture: ComponentFixture<RespPedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespPedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespPedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
