export default class DropDownHolder {
  static dropDown

  static initialize(dropDown) {
    this.dropDown = dropDown
  }

  static alert(type, title, message) {
    this.dropDown.alertWithType(type, title, message)
  }

  static closeAlert() {
    this.dropDown.close()
  }

  static error(title, message) {
    this.dropDown.alertWithType('error', title, message)
  }
}
