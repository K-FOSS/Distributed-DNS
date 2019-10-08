declare function importScripts(url: string): void;
/* eslint-env serviceworker */
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js',
);

declare const workbox: typeof import('workbox-sw');

workbox.routing.registerRoute(
  new RegExp('.*.js'),
  new workbox.strategies.NetworkFirst(),
);
