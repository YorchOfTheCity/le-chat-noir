import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsetChatComponent } from './tabset-chat.component';

describe('TabsetChatComponent', () => {
  let component: TabsetChatComponent;
  let fixture: ComponentFixture<TabsetChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsetChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsetChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
