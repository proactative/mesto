export default class UserInfo {
  constructor({ name, job, avatar }) {
    this._name = name;
    this._job = job;
    this._avatar = avatar;
    this._avatarButton = document.querySelector('.profile__avatar-edit-button');
  }

  getId() {
    return this._id;
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }

  getUserInfo() {
    return {
      'name': this._name.textContent,
      'job': this._job.textContent,
    }
  }

  setUserInfo({ name, job, id }) {
    this._name.textContent = name;
    this._job.textContent = job;
    this._id = id;
  }

  // setEventListener(callback) {
  //   this._avatarButton.addEventListener("click", callback);
  // }
}
