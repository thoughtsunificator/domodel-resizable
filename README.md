# domodel-resizable

Resizable system for [domodel](https://github.com/thoughtsunificator/domodel).

## Getting started

### Prerequisites

- [domodel](https://github.com/thoughtsunificator/domodel)

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

	async onCreated() {

		const resizable = new Resizable()

		resizable.listen("size set", data => {
			this.root.style.width = data.width + "px"
			this.root.style.height = data.height + "px"
		})

		Core.run(ResizableModel, { binding: new ResizableBinding({ resizable, preview: true, directions: ["horizontal", "vertical", "diagonal"] }) })

	}

}
````

Note that you might have to use appropriate styling depending on the element you wish to be resizable.

### Events

| Name      | Target | Description      
| ---------- |-------------|---------
| resize start | Resizable | Resizing started.
| resize end   | Resizable   | Resizing ended.
| resize update  | Resizable  | Size of the area changed.   
| size set  | Resizable | Resizing ended. New size is given.  
| resizable enable  | Resizable | Enable resizing.
| resizable disable  | Resizable | Disable resizing.

### Demo

See [https://github.com/thoughtsunificator/domodel-resizable-demo](https://github.com/thoughtsunificator/domodel-resizable-demo).
