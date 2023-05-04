import {
  View,
  LabeledFieldView,
  createLabeledInputText,
  ButtonView,
  submitHandler,
  clickOutsideHandler,
} from '@ckeditor/ckeditor5-ui';
import './email_view_styles.css';

import { icons } from '@ckeditor/ckeditor5-core';

export default class EmailView extends View {
  constructor(locale, onHide = () => {}, callback = Promise.resolve, balloon) {
    super(locale);
    this.callback = callback;
    this.onHide = onHide;

    this.targetInput = this._createInput('Who is this email for?');
    this.topicInput = this._createInput(
      'What would you like this email to cover?'
    );

    this.buttonContainerView = this._createButtonContainer(locale);

    this.childViews = this.createCollection([
      this.targetInput,
      this.topicInput,
      this.buttonContainerView,
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
      this._handleSubmit();
    });

    this.on('textChange', () => {
      const isSubmitEnabled =
        this.targetInput.fieldView.element.value &&
        this.topicInput.fieldView.element.value;

      this.generateButton.set({
        isEnabled: isSubmitEnabled,
      });
    });

    clickOutsideHandler({
      emitter: this,
      activator: () => balloon.visibleView === this,
      contextElements: [balloon.view.element],
      callback: () => {
        if (
          !this.targetInput.fieldView.element.value &&
          !this.topicInput.fieldView.element.value
        ) {
          onHide();
        }
      },
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

  _createInput = (label) => {
    const labeledInput = new LabeledFieldView(
      this.locale,
      createLabeledInputText
    );

    labeledInput.label = label;
    labeledInput.set({
      class: 'ck-email-assist-input',
    });

    labeledInput.on('change:isEmpty', () => {
      this.fire('textChange');
    });

    return labeledInput;
  };

  _createButton(label, icon, className, isEnabled = true) {
    const button = new ButtonView();

    button.set({
      label,
      icon,
      tooltip: true,
      class: className,
      isEnabled,
    });

    return button;
  }

  _createButtonContainer(locale) {
    this.generateButton = this._createButton(
      'Generate',
      icons.check,
      'ck-button-save',
      false
    );
    this.generateButton.type = 'submit';

    this.cancelButton = this._createButton(
      'Cancel',
      icons.cancel,
      'ck-button-cancel'
    );
    this.cancelButton.delegate('execute').to(this, 'cancel');

    const view = new View(locale);

    const buttonCollection = view.createCollection([
      this.cancelButton,
      this.generateButton,
    ]);

    view.setTemplate({
      tag: 'div',
      attributes: {
        class: 'ck-email-assist-button-container',
      },
      children: buttonCollection,
    });

    return view;
  }

  _handleSubmit() {
    this.generateButton.set({
      isEnabled: false,
    });

    this.callback(
      this.targetInput.fieldView.element.value,
      this.topicInput.fieldView.element.value
    ).then(() => {
      this.onHide();
    }).finally(() => {
      this.generateButton.set({
        isEnabled: true,
      });
    });
  }
}
