import { Binding } from "domodel"

export default class extends Binding {

	onCreated() {

		const { resizable, direction } = this.properties

		if(!resizable.enabled) {
			this.root.style.display = "none"
		}

		this.listen(resizable, "resize disable", () => {
			this.root.style.display = "none"
		})

		this.listen(resizable, "resize enable", () => {
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
				resizable.emit("resize start", { direction, x: event.clientX, y: event.clientY})
			}
		})

	}
}
