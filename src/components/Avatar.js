export default class Avatar {
  constructor(avaSelector) {
    this.avaElement = document.querySelector(avaSelector)
  }

  setUserAvatar(avatar) {
    this.avaElement.querySelector('.profile__avatar').src = avatar
  }
}