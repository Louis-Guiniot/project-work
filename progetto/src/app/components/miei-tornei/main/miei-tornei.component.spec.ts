import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MieiTorneiComponent } from './miei-tornei.component';

describe('MieiTorneiComponent', () => {
  let component: MieiTorneiComponent;
  let fixture: ComponentFixture<MieiTorneiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MieiTorneiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MieiTorneiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
