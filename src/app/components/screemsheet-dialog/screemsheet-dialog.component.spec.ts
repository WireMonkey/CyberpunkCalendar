import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreemsheetDialogComponent } from './screemsheet-dialog.component';

describe('ScreemsheetDialogComponent', () => {
  let component: ScreemsheetDialogComponent;
  let fixture: ComponentFixture<ScreemsheetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreemsheetDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreemsheetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
