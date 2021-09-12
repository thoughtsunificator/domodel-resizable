import { Core, Binding } from "domodel"

import ResizableIndicatorModel from "./resizable-indicator.js"
import ResizablePreviewModel from "./resizable-preview.js"

import ResizableIndicatorBinding from "./resizable-indicator.binding.js"
import ResizablePreviewBinding from "./resizable-preview.binding.js"

export default class extends Binding {

	onCreated() {

		const { resizable } = this.properties

		this.listen(resizable, "resize disable", () => {
			resizable.enabled = false
			resizable.resizing = false
		})

		this.listen(resizable, "resize enable", () => {
			resizable.enabled = true
		})

		this.listen(resizable, "resize end", data => {
			resizable.resizing = false
			resizable.x = data.x
			resizable.y = data.y
			resizable.emit("size set", resizable.size)
			this.root.parentNode.style.userSelect = ""
		})

		this.listen(resizable, "resize start", data => {
			resizable.resizing = true
			resizable.x = data.x
			resizable.y = data.y
			resizable.direction = data.direction
			this.root.parentNode.style.userSelect = "none"
		})

		this.root.ownerDocument.addEventListener("mouseup", (event) => {
			if(resizable.resizing === true) {
				resizable.emit("resize end", { x: event.clientX, y: event.clientY })
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
				resizable.emit("resize update", { width, height })
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
