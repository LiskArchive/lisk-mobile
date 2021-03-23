import { Keyboard } from 'react-native';

export default class ModalHolder {
  static modal;

  static initialize(modal, update) {
    this.modal = modal;
    this.update = update;
  }

  static open(config) {
    Keyboard.dismiss();
    this.update(config);
    this.modal.open();
  }

  static close() {
    this.modal.close();
  }
}
