import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesParamsDialogComponent } from './games-params-dialog.component';

describe('GamesParamsDialogComponent', () => {
  let component: GamesParamsDialogComponent;
  let fixture: ComponentFixture<GamesParamsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesParamsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesParamsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
