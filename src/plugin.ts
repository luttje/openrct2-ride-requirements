/// <reference path='../lib/openrct2.d.ts' />

import { startup } from './startup';

registerPlugin({
  name: 'Ride Requirements Viewer',
  version: '0.1',
  authors: ['luttje'],
  type: 'remote',
  licence: 'MIT',
  targetApiVersion: 104,
  main: startup,
});