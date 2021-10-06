import { Observable } from "domodel"

/**
 * @global
 */
class Resizable extends Observable {

	/**
	 * @param {boolean} [enabled=true]
	 */
	constructor(enabled = true) {
		super()
		this._enabled = enabled
		this._resizing = false
		this._direction = null
		this._x = null
		this._y = null
		this._size = null
	}

	/**
	 * @type {boolean}
	 */
	get enabled() {
		return this._enabled
	}

	set enabled(enabled) {
		this._enabled = enabled
	}

	/**
	 * @type {boolean}
	 */
	get resizing() {
		return this._resizing
	}

	set resizing(resizing) {
		this._resizing = resizing
	}

	/**
	 * @type {string}
	 */
	get direction() {
		return this._direction
	}

	set direction(direction) {
		this._direction = direction
	}

	/**
	 * @type {number}
	 */
	get x() {
		return this._x
	}

	set x(x) {
		this._x = x
	}

	/**
	 * @type {number}
	 */
	get y() {
		return this._y
	}

	set y(y) {
		this._y = y
	}

	/**
	 * @type {object}
	 */
	get size() {
		return this._size
	}

	set size(size) {
		this._size = size
	}

}

export default Resizable
