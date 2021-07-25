import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsShowcaseComponent } from './testimonials-showcase.component';

describe('TestimonialsShowcaseComponent', () => {
  let component: TestimonialsShowcaseComponent;
  let fixture: ComponentFixture<TestimonialsShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestimonialsShowcaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialsShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
