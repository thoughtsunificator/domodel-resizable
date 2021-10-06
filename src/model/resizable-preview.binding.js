import { Binding } from "domodel"

/**
 * @global
 */
class ResizablePreviewBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Resizable} properties.resizable
	 */
	constructor(properties) {
		super(properties)
	}

	onCreated() {

		const { resizable } = this.properties

		if(!resizable.enabled) {
			this.root.style.display = "none"
		}

		this.listen(resizable, "resizeDisable", () => {
			this.root.style.display = "none"
		})

		this.listen(resizable, "resizeEnable", () => {
			this.root.style.display = ""
		})

		this.listen(resizable, "resizeEnd", () => {
			this.root.style.display = "none"
		})

		this.listen(resizable, "resizeUpdate", data => {
			this.root.style.display = ""
			this.root.style.display = "block"
			this.root.style.width = data.width + "px"
			this.root.style.height = data.height + "px"
		})

		this.root.ownerDocument.addEventListener("mouseup", (event) => {
			if(resizable.resizing === true) {
				resizable.emit("resizeEnd", { x: event.clientX, y: event.clientY })
			}
		})

	}

}

export default ResizablePreviewBinding
