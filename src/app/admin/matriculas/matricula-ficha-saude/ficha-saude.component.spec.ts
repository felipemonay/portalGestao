import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaSaudeComponent } from './ficha-saude.component';

describe('FichaSaudeComponent', () => {
  let component: FichaSaudeComponent;
  let fixture: ComponentFixture<FichaSaudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaSaudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaSaudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
