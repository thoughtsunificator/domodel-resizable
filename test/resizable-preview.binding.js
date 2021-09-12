import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import ResizablePreviewBinding from "../src/model/resizable-preview.binding.js"

const virtualDOM = new JSDOM(``)
const window = virtualDOM.window
const { document } = window

const RootModel = { tagName: "div" }
let rootBinding

export function setUp(callback) {
	rootBinding = new Binding()
	Core.run(RootModel, { parentNode: document.body, binding: rootBinding })
	callback()
}

export function tearDown(callback) {
	rootBinding.remove()
	callback()
}

export function instance(test) {
	test.expect(1)
	test.ok(new ResizablePreviewBinding() instanceof Binding)
	test.done()
}
