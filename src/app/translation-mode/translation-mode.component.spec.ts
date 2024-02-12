import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationModeComponent } from './translation-mode.component';

describe('TranslationModeComponent', () => {
  let component: TranslationModeComponent;
  let fixture: ComponentFixture<TranslationModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslationModeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranslationModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
