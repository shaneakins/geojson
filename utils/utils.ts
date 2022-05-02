import { VALID_RANGE } from './constants'

export const isLatValid = (lat: number) =>
  lat >= VALID_RANGE.MIN_LAT && lat <= VALID_RANGE.MAX_LAT
export const isLongValid = (long: number) =>
  long >= VALID_RANGE.MIN_LNG && long <= VALID_RANGE.MAX_LNG
export const randomId = Math.random().toString(36).slice(2)
