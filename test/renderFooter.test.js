import { expect, it, beforeEach } from 'vitest'
import { renderFooter } from "../src/modules/renderFooter.js"

describe("It renders two sword symbols, a copyright symbol, the dynamic year, and the name Maria D. Campbell", () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="site-footer"></div>'
    })
    it("Displays two sword symbols, a copyright symbol, a dynamic year, and the name Maria D. Campbell when the footer is present", function () {
        const year = new Date().getFullYear()
        expect(renderFooter()).toMatchSnapshot(`&#10013; &copy; ${year} Maria D. Campbell &#10013;`)
    })
})