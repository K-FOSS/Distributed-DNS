import Cookies from 'universal-cookie'

declare module 'koa' {
  interface BaseRequest {
    universalCookies: Cookies;
  }
}
