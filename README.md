# domodel-resizable

Resizable system for [domodel](https://github.com/thoughtsunificator/domodel).

## Getting started

### Installing

- ``npm install @domodel/resizable``

### Usage

``src/model/image.js``
````javascript
export default {
	tagName: "div",
	style: "position: relative; display: inline-block",
	children: [
		{
			tagName: "img",
			style: "width: 100%; height: 100%",
			src: "yourimageurl"
		}
	]
}
````

``src/binding/image.js``
````javascript
import { Core, Observable, Binding } from "domodel"
import { Resizable, ResizableModel, ResizableBinding } from "@domodel/resizable"

export default class extends Binding {

	onCreated() {

		const resizable = new Resizable()

		this.listen(resizable, "size set", data => {
			this.root.style.width = data.width + "px"
			this.root.style.height = data.height + "px"
		})

		Core.run(ResizableModel, { binding: new ResizableBinding({ resizable, preview: true, directions: ["horizontal", "vertical", "diagonal"] }) })

	}

}
````
