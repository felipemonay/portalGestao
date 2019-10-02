import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliacaoComponent } from './filiacao.component';

describe('FiliacaoComponent', () => {
  let component: FiliacaoComponent;
  let fixture: ComponentFixture<FiliacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiliacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
