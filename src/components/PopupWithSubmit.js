import Popup from "./Popup"

export default class PopupWithSubmit extends Popup {
  constructor({popupSelector, handleSubmit}) {
    super(popupSelector)
    this._handleSubmit = handleSubmit
    this._btn = this._popup.querySelector('.popup__submit')
  }

  open = (card) => {
    this.card = card
    super.open()
  }

  setEventListeners() {
    super.setEventListeners()
    this._btn.addEventListener('click', () => this._handleSubmit(this.card))
  }
}