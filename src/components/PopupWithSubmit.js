import Popup from "./Popup"

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__form')
  }

  setSubmitAction(action) {
    this._action = action
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', this._action)
  }
}