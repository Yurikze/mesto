import Popup from "./Popup"

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._btn = this._popup.querySelector('.popup__submit')
  }

  setSubmitAction(action) {
    this._action = action
  }

  setEventListeners() {
    super.setEventListeners()
    this._btn.addEventListener('click', this._action)
  }
}