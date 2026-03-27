import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecmmentComponent } from './createcmment.component';

describe('CreatecmmentComponent', () => {
  let component: CreatecmmentComponent;
  let fixture: ComponentFixture<CreatecmmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatecmmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatecmmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
