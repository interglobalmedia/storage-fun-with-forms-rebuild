import { localStorageSupport } from "../src/modules/localStorageSupport.js";

describe("localStorageSupport", () => {
    it("returns true when Storage is available", () => {
        expect(localStorageSupport()).toBe(true);
    });
});
