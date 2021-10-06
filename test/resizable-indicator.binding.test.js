import assert from "assert"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import ResizableIndicatorBinding from "../src/model/resizable-indicator.binding.js"

const virtualDOM = new JSDOM(``)
const window = virtualDOM.window
const { document } = window

const RootModel = { tagName: "div" }
let rootBinding

describe("resizable-indicator.binding", () => {

	beforeEach(() => {
		rootBinding = new Binding()
		Core.run(RootModel, { parentNode: document.body, binding: rootBinding })
	})

	afterEach(() => {
		rootBinding.remove()
	})

	it("instance", () => {
		assert.ok(ResizableIndicatorBinding.prototype instanceof Binding)
	})

})
