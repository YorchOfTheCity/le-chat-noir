import { TestBed, inject, getTestBed, fakeAsync, tick } from '@angular/core/testing';

import { BackendService, User } from './backend.service';
import { CommonTestModule } from '../testing/common.test.module';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Injector, ReflectiveInjector } from '@angular/core';
import { XHRBackend, ResponseOptions, Response, ConnectionBackend, BaseRequestOptions, RequestOptions, Http } from '@angular/http';
import { BACKEND_URL } from '../tokens';

const TOKEN_YORCH = {
  // tslint:disable-next-line:max-line-length
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVzIjoxNTA3MzI4MDQ1MzM3LCJ1c2VyIjp7Im5hbWUiOiJ5b3JjaCIsImVtYWlsIjoieW9yY2hAdGVrbWV4aWNvLmNvbSIsInB3ZEhhc2giOm51bGx9fQ.ixJmifCXt4SfgHoiQaaqi7PHbRnvPUEtO6tyUQoo5OI',
  expires: 1507328045337,
  user: {
    name: 'yorch',
    email: 'yorch@tekmexico.com',
    pwdHash: null
  }
};


describe('BackendService', () => {

  let bservice: BackendService;

  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      { provide: BACKEND_URL, useValue: 'http://localhost:3000' },
      Http,
      BackendService,
    ]);

    bservice = this.injector.get(BackendService);
    this.backendService = bservice;
    // this.backendService = this.injector.get(BackendService) as BackendService;
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });


  it('getLoginToken() should query /login url', () => {
    bservice.getLoginToken('yorch', 'asdasdasd');
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/login/, 'url invalid');
  });


  it('getLoginToken() should return a valid token', fakeAsync(() => {
    let result: any;

    bservice.getLoginToken('yorch', 'asdasdasd').subscribe( (res) => {
      console.dir(res);
      result = res;
      expect(res.json()).toBeTruthy();
      // TODO: Check body for match
    });


    // this.heroService.getHeroes().then((heroes: String[]) => result = heroes);

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify( TOKEN_YORCH ),
    })));

    tick();

    // expect(result[0]).toEqual(HERO_ONE, ' HERO_ONE should be the first hero');
    // expect(result[1]).toEqual(HERO_TWO, ' HERO_TWO should be the second hero');
  }));
});
