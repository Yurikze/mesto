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
    this._openPopupHandler(popupImg);
    popupImgSrc.src = this._link;
    popupImgSrc.alt = this._cardTitle;
    popupImgText.textContent = this._cardTitle;
  }

  _addEvtListenersToCard(card) {
    card
      .querySelector('.places__like-btn')
      .addEventListener('click', this._toggleLikeHandler);
    card
      .querySelector('.places__delete-icon')
      .addEventListener('click', this._removeCardHandler);
    card
      .querySelector('.places__img')
      .addEventListener('click', (e) => this._showBigImageHandler(e));
  }

  generateCard() {
    this._element = this._getTemplate();
    const placeImg = this._element.querySelector('.places__img');
    placeImg.src = this._link;
    placeImg.alt = this._cardTitle;
    this._element.querySelector('.places__title').textContent = this._cardTitle;
    this._addEvtListenersToCard(this._element);

    return this._element;
  }
}
