import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNfoundComponent } from './page-nfound.component';

describe('PageNfoundComponent', () => {
  let component: PageNfoundComponent;
  let fixture: ComponentFixture<PageNfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNfoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
