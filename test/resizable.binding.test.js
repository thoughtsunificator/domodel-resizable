import assert from "assert"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import { ResizableBinding } from "../index.js"

const virtualDOM = new JSDOM(``)
const window = virtualDOM.window
const { document } = window

const RootModel = { tagName: "div" }
let rootBinding

describe("resizable.binding", () => {

	beforeEach(() => {
		rootBinding = new Binding()
		Core.run(RootModel, { parentNode: document.body, binding: rootBinding })
	})

	afterEach(() => {
		rootBinding.remove()
	})

	it("instance", () => {
		assert.ok(ResizableBinding.prototype instanceof Binding)
	})

})
