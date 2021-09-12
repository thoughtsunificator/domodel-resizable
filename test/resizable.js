import { Observable } from "domodel"

import { Resizable } from "../index.js"

export function instance(test) {
	test.expect(1)
	const resizable = new Resizable()
	test.ok(resizable instanceof Observable)
	test.done()
}
