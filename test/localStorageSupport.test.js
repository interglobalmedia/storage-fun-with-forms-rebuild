import { localStorageSupport } from '../src/modules/localStorageSupport.js'
import { describe, it, expect } from 'vitest'

describe('localStorageSupport', () => {
	it('returns true when Storage is available', () => {
		expect(localStorageSupport()).toBe(true)
	})
})
