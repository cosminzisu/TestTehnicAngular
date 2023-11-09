import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasiniComponent } from './masini.component';

describe('MasiniComponent', () => {
  let component: MasiniComponent;
  let fixture: ComponentFixture<MasiniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasiniComponent]
    });
    fixture = TestBed.createComponent(MasiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
