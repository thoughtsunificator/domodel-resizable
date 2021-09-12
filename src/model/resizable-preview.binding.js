import { Binding } from "domodel"

export default class extends Binding {

	onCreated() {

		const { resizable } = this.properties

		if(!resizable.enabled) {
			this.root.style.display = "none"
		}

		this.listen(resizable, "resize disable", () => {
			this.root.style.display = "none"
		})

		this.listen(resizable, "resize enable", () => {
			this.root.style.display = ""
		})

		this.listen(resizable, "resize end", () => {
			this.root.style.display = "none"
		})

		this.listen(resizable, "resize update", data => {
			this.root.style.display = ""
			this.root.style.display = "block"
			this.root.style.width = data.width + "px"
			this.root.style.height = data.height + "px"
		})

		this.root.ownerDocument.addEventListener("mouseup", (event) => {
			if(resizable.resizing === true) {
				resizable.emit("resize end", { x: event.clientX, y: event.clientY })
			}
		})

	}

}
