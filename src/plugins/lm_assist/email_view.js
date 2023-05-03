import {
  View,
  LabeledFieldView,
  createLabeledInputText,
  ButtonView,
  submitHandler,
} from '@ckeditor/ckeditor5-ui';
import './email_view_styles.css';

import { icons } from '@ckeditor/ckeditor5-core';

export default class EmailView extends View {
  constructor(locale, onHide = () => {}, callback = Promise.resolve) {
    super(locale);

    this.targetInput = this._createInput('Who is this email for?');
    this.topicInput = this._createInput(
      'What would you like this email to cover?'
    );

    this.generateButton = this._createButton(
      'Generate',
      icons.check,
      'ck-button-save'
    );
    this.generateButton.type = 'submit';

    this.cancelButton = this._createButton(
      'Cancel',
      icons.cancel,
      'ck-button-cancel'
    );
    this.cancelButton.delegate('execute').to(this, 'cancel');

    this.childViews = this.createCollection([
      this.targetInput,
      this.topicInput,
      this.cancelButton,
      this.generateButton,
    ]);

    this.setTemplate({
      tag: 'form',
      attributes: {
        class: ['ck', 'ck-email-assist-form'],
        tabindex: '-1',
      },
      children: this.childViews,
    });

    this.on('submit', () => {
      callback(
        this.targetInput.fieldView.element.value,
        this.topicInput.fieldView.element.value
      ).then(() => {
        onHide();
      });
    });
  }

  render() {
    super.render();

    submitHandler({
      view: this,
    });
  }

  focus() {
    this.childViews.first.focus();
  }

  _createInput(label) {
    const labeledInput = new LabeledFieldView(
      this.locale,
      createLabeledInputText
    );

    labeledInput.label = label;

    return labeledInput;
  }

  _createButton(label, icon, className) {
    const button = new ButtonView();

    button.set({
      label,
      icon,
      tooltip: true,
      class: className,
    });

    return button;
  }
}
