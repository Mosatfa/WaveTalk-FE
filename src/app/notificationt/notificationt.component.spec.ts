import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationtComponent } from './notificationt.component';

describe('NotificationtComponent', () => {
  let component: NotificationtComponent;
  let fixture: ComponentFixture<NotificationtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
