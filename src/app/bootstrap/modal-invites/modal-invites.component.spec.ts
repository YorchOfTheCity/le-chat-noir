import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContactsComponent } from './modal-contacts.component';

describe('ModalContactsComponent', () => {
  let component: ModalContactsComponent;
  let fixture: ComponentFixture<ModalContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
