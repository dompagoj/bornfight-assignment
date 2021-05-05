import { strict as ASSERT } from 'assert'

export function getRandom(max: number, min = 0) {
  return Math.random() * (max - min) + min
}

export function assert(assertion: boolean, msg?: string) {
  ASSERT.deepEqual(assertion, true, msg)
}
