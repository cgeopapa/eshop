import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GridViewItemComponent} from './grid-view-item.component';

describe('GridViewItemComponent', () => {
  let component: GridViewItemComponent;
  let fixture: ComponentFixture<GridViewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridViewItemComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridViewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
