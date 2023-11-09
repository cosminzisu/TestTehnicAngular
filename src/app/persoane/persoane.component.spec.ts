import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoaneComponent } from './persoane.component';

describe('PersoaneComponent', () => {
  let component: PersoaneComponent;
  let fixture: ComponentFixture<PersoaneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersoaneComponent]
    });
    fixture = TestBed.createComponent(PersoaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
