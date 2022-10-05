export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = nameSelector;
    this._job = jobSelector;
  }

  getUserInfo() {
    return {
      'name' : this._name.value,
      'job' : this._job.value,
    }
  }

  /*
  data is object:
  {
      'name' : this._name.value,
      'job' : this._job.value,
    }
  */
  setUserInfo(data) {
    this._name.value='123';
    this._job.value = '';
  }
}
