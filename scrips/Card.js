import { popupImg, popupImgSrc, popupImgText } from './utils.js';

export class Card {
  constructor(data, tmpSelector) {
    this._openPopupHandler = data.openPopupHandler;

    this._cardTitle = data.name;
    this._link = data.link;
    this._tmpSelector = tmpSelector;
  }

  _getTemplate() {
    const cardEl = document
      .querySelector(this._tmpSelector)
      .content.querySelector('.places__li')
      .cloneNode(true);

    return cardEl;
  }

  _toggleLikeHandler(e) {
    e.target.classList.toggle('places__like-btn_active');
  }

  _removeCardHandler(e) {
    this.closest('.places__li').remove();
  }

  _showBigImageHandler(e) {
    if (e.currentTarget === e.target) {
      this._openPopupHandler(popupImg);
      popupImgSrc.src = this._link;
      popupImgSrc.alt = this._cardTitle;
      popupImgText.textContent = this._cardTitle;
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.places__img').src = this._link;
    this._element.querySelector('.places__title').textContent = this._cardTitle;
    this._element
      .querySelector('.places__like-btn')
      .addEventListener('click', this._toggleLikeHandler);
    this._element
      .querySelector('.places__delete-icon')
      .addEventListener('click', this._removeCardHandler);
    this._element
      .querySelector('.places__img')
      .addEventListener('click', (e) => this._showBigImageHandler(e));

    return this._element;
  }
}
