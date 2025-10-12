import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPhone } from './header-phone';

describe('HeaderPhone', () => {
  let component: HeaderPhone;
  let fixture: ComponentFixture<HeaderPhone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderPhone]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderPhone);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
