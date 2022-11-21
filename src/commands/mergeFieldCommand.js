import Command from "@ckeditor/ckeditor5-core/src/command";

export default class MergeFieldCommand extends Command {
	execute( { value } ) {
		const editor = this.editor;
		const selection = editor.model.document.selection;

		editor.model.change( writer => {
			const mergeField = writer.createElement( 'mergeField', {
				...Object.fromEntries(selection.getAttributes()),
				name: value
			} );
			editor.model.insertContent( mergeField );
			writer.setSelection( mergeField, 'on' );
		} );
	}

	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;

		const isAllowed = model.schema.checkChild( selection.focus.parent, 'mergeField' );

		this.isEnabled = isAllowed;
	}
}
