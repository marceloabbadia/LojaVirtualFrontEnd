import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Highlight } from './highlight';

describe('Highlight', () => {
  let component: Highlight;
  let fixture: ComponentFixture<Highlight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Highlight]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Highlight);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
