import { expect, it } from 'vitest'
import { withHash } from '../src/modules/withHash.js'

describe('withHash adds a hash tag in front of hex code if there is not already one', function () {
    it('adds a # when the hex code does not already have one', function () {
        const hex = 'AABBCC'
        expect(withHash(hex)).toMatch(/^#[0-9A-F]{6}$/i)
    })
    it('does not add a second # when one is already present', function () {
        const hex = '#AABBCC'
        expect(withHash(hex)).toMatch('#AABBCC')
    })
    it('throws when given a non-string input', function () {
        expect(() => withHash(123)).toThrow()
    })
})