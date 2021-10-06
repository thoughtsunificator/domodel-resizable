import assert from "assert"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import ResizablePreviewBinding from "../src/model/resizable-preview.binding.js"

const virtualDOM = new JSDOM(``)
const window = virtualDOM.window
const { document } = window

const RootModel = { tagName: "div" }
let rootBinding

describe("resizable-preview.binding", () => {

	beforeEach(() => {
		rootBinding = new Binding()
		Core.run(RootModel, { parentNode: document.body, binding: rootBinding })
	})

	afterEach(() => {
		rootBinding.remove()
	})

	it("instance", () => {
		assert.ok(ResizablePreviewBinding.prototype instanceof Binding)
	})

})

