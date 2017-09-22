import { InjectionToken, OpaqueToken } from '@angular/core';

export const BACKEND_URL = new InjectionToken<string>('backend_url');
export const BACKEND_URL_SOCKETS = new InjectionToken<string>('backend_url_sockets');
