import { Binding } from "domodel"

/**
 * @global
 */
class ResizableIndicatorBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Resizable} properties.resizable
	 * @param {string}    properties.direction
	 */
	constructor(properties) {
		super(properties)
	}

	onCreated() {

		const { resizable, direction } = this.properties

		if(!resizable.enabled) {
			this.root.style.display = "none"
		}

		this.listen(resizable, "resizeDisable", () => {
			this.root.style.display = "none"
		})

		this.listen(resizable, "resizeEnable", () => {
			this.root.style.display = ""
		})

		this.root.classList.remove("horizontal")
		this.root.classList.remove("vertical")
		this.root.classList.remove("diagonal")

		if(direction === "horizontal") {
			this.root.classList.add("horizontal")
		} else if(direction === "vertical") {
			this.root.classList.add("vertical")
		} else if(direction === "diagonal") {
			this.root.classList.add("diagonal")
		}

		this.root.addEventListener("mousedown", (event) => {
			if(resizable.enabled) {
				resizable.emit("resizeStart", { direction, x: event.clientX, y: event.clientY})
			}
		})

	}
}

export default ResizableIndicatorBinding
