import './client.d'

export const SERVER_HOST =
  typeof window === 'undefined'
    ? __INTERNAL_SERVER_URL__
    : __EXTERNAL_SERVER_URL__

export const YANDEX_API_URL = 'https://ya-praktikum.tech/api/v2'
