import { Core, Binding } from "domodel"

import ResizableIndicatorModel from "./resizable-indicator.js"
import ResizablePreviewModel from "./resizable-preview.js"

import ResizableIndicatorBinding from "./resizable-indicator.binding.js"
import ResizablePreviewBinding from "./resizable-preview.binding.js"

/**
 * @global
 */
class ResizableBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Resizable} properties.resizable
	 */
	constructor(properties) {
		super(properties, new ResizableEventListener(properties.resizable))
	}

	onCreated() {

		const { resizable } = this.properties

		this.root.ownerDocument.addEventListener("mouseup", (event) => {
			if(resizable.resizing === true) {
				resizable.emit("resizeEnd", { x: event.clientX, y: event.clientY })
			}
		})

		this.root.ownerDocument.addEventListener("mousemove", (event) => {
			if(resizable.resizing === true) {
				const rect = this.root.getBoundingClientRect()
				const diffX = event.clientX - resizable.x
				const diffY = event.clientY - resizable.y
				let width = rect.width
				let height = rect.height
				if(resizable.direction === "vertical") {
					height = rect.height + diffY
				} else if(resizable.direction === "horizontal") {
					width = rect.width + diffX
				} else if(resizable.direction === "diagonal") {
					width = rect.width + diffX
					height = rect.height + diffY
				}
				resizable.size = { width, height }
				resizable.emit("resizeUpdate", { width, height })
			}
		})
	}

	async onCompleted() {

		const { resizable, directions, preview = true } = this.properties

		if(preview === true) {
			this.run(ResizablePreviewModel, { parentNode: this.root.parentNode, binding: new ResizablePreviewBinding({ resizable })})
		}

		for(const direction of directions) {
			this.run(ResizableIndicatorModel, { parentNode: this.root.parentNode, binding: new ResizableIndicatorBinding({ resizable, direction })})
		}

	}

}

export default ResizableBinding
