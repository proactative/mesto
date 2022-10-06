export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
  }

  getUserInfo() {
    return {
      'name' : this._nameSelector.textContent,
      'job' : this._jobSelector.textContent,
    }
  }

  setUserInfo({name, job}) {
    this._nameSelector.textContent = name;
    this._jobSelector.textContent = job;
  }
}
