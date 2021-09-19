import assert from "assert"
import { Observable } from "domodel"

import { Resizable } from "../index.js"

describe("resizable", () => {

	it("instance", () => {
		assert.ok(new Resizable() instanceof Observable)
	})

})
