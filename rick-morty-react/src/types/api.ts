import type { Character } from "./character"

export type Info = {
  count: number
  pages: number
  next: string | null
  prev: string | null
}
export type Results = Character[]

export type ApiResponse<T> = {
  info: Info
  results: T

}