import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsetSidebarComponent } from './tabset-sidebar.component';

describe('TabsetSidebarComponent', () => {
  let component: TabsetSidebarComponent;
  let fixture: ComponentFixture<TabsetSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsetSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsetSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
