import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaSaidaComponent } from './ficha-saida.component';

describe('FichaSaidaComponent', () => {
  let component: FichaSaidaComponent;
  let fixture: ComponentFixture<FichaSaidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaSaidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaSaidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
