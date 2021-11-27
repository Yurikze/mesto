export default class UserInfo {
  constructor({ userName, userInfo }) {
    this._name = document.querySelector(userName);
    this._info = document.querySelector(userInfo);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      userInfo: this._info.textContent,
    };
  }

  setUserInfo({ userName, userInfo }) {
    this._name.textContent = userName;
    this._info.textContent = userInfo;
  }
}
