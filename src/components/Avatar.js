export default class Avatar {
  constructor({avaSelector, clickHandler}) {
    this._avatar = document.querySelector(avaSelector)
    this._clickHandler = clickHandler
  }

  setUserAvatar(avatar) {
    this._avatar.querySelector('.profile__avatar').src = avatar
  }

  setEventListeners() {
    this._avatar.addEventListener('click', this._clickHandler)
  }
}