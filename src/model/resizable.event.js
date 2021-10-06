import { EventListener } from "domodel"

/**
 * @global
 */
class ResizableEventListener extends EventListener {

	/**
	 * @event ResizableEventListener#sizeSet
	 * @property {object} size
	 * @property {number} size.width
	 * @property {number} size.height
	 */

	/**
	 * @event ResizableEventListener#resizeUpdate
	 * @property {object} size
	 * @property {number} size.width
	 * @property {number} size.height
	 */

	/**
	 * @event ResizableEventListener#resizeEnable
	 */
	resizeEnable() {
		const { resizable } = this.properties
		resizable.enabled = true
	}

	/**
	 * @event ResizableEventListener#resizableDisable
	 */
	resizeDisable() {
		const { resizable } = this.properties
		resizable.enabled = false
		resizable.resizing = false
	}

	/**
	 * @event ResizableEventListener#resizeStartdata
	 * @property {object} data
	 * @property {number} data.x
	 * @property {number} data.y
	 * @property {string} data.direction
	 */
	resizeStart(data) {
		const { resizable } = this.properties
		resizable.resizing = true
		resizable.x = data.x
		resizable.y = data.y
		resizable.direction = data.direction
		this.root.parentNode.style.userSelect = "none"
	}

	/**
	 * @event ResizableEventListener#resizeEnddata
	 * @property {object} data
	 * @property {number} data.x
	 * @property {number} data.y
	 */
	resizeEnd(data) {
		const { resizable } = this.properties
		resizable.resizing = false
		resizable.x = data.x
		resizable.y = data.y
		resizable.emit("sizeSet", resizable.size)
		this.root.parentNode.style.userSelect = ""
	}

}

export default ResizableEventListener
