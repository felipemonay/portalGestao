import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NceComponent } from './nce.component';

describe('NceComponent', () => {
  let component: NceComponent;
  let fixture: ComponentFixture<NceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
