export default class UserInfo {
  constructor({ id, userName, userInfo }) {
    this._userId = id
    this._name = document.querySelector(userName);
    this._info = document.querySelector(userInfo);
  }

  getUserInfo() {
    return {
      userId: this._userId,
      name: this._name.textContent,
      userInfo: this._info.textContent,
    };
  }

  setUserInfo({ userName, userInfo }) {
    this._name.textContent = userName;
    this._info.textContent = userInfo;
  }
  
  setUserId(id) {
    this._userId = id
  }
}
