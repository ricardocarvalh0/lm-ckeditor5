import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { Collection } from '@ckeditor/ckeditor5-utils';
import {
  addListToDropdown,
  createDropdown,
  Model,
  ContextualBalloon,
} from '@ckeditor/ckeditor5-ui';
import EmailView from './email_view';

export default class LMAssist extends Plugin {
  static get requires() {
    return [ContextualBalloon];
  }

  init() {
    const editor = this.editor;
    this.config = editor.config.get('lm_assist');

    this._balloon = this.editor.plugins.get(ContextualBalloon);

    editor.ui.componentFactory.add('lm_assist', () => {
      const items = new Collection();

      items.add({
        type: 'button',
        model: new Model({
          id: 'new-email',
          withText: true,
          label: 'Draft New Email',
        }),
      });

      this.dropdown = createDropdown(editor.locale);

      addListToDropdown(this.dropdown, items);

      this.dropdown.on('execute', (event) => {
        this._showForm(event.source.id);
      });

      this.dropdown.set({
        id: 'lm_assist',
      });

      this.dropdown.buttonView.set({
        label: 'AI',
        withText: true,
        tooltip: 'LMAssist',
        labelStyle: 'width:auto;padding-right:8px',
      });

      return this.dropdown;
    });
  }

  _createEmailView() {
    const editor = this.editor;
    const emailView = new EmailView(editor.locale, this._hideForm, this.config.newEmailCallback);

    return emailView;
  }

  _getBalloonPositionData() {
    const view = this.editor.editing.view;
    const viewDocument = view.document;
    let target = null;

    // Set a target position by converting view selection range to DOM.
    target = () =>
      view.domConverter.viewRangeToDom(viewDocument.selection.getFirstRange());

    return {
      target,
    };
  }

  _showForm(formId) {
    switch (formId) {
      case 'new-email':
      default:
        this.form = this._createEmailView();
        break;
    }

    if (!this.form) return;

    this.form.on('cancel', () => {
      this._hideForm();
    });

    this._balloon.add({
      view: this.form,
      position: this._getBalloonPositionData(),
    });

    this.form.focus();
  }

  _hideForm = () => {
    this._balloon.remove(this.form);
    this.form = null;
    this.editor.editing.view.focus();
  };
}
