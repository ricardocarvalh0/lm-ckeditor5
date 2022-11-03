/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageLink from '@ckeditor/ckeditor5-link/src/linkimage';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';
import HtmlEmbed from '@ckeditor/ckeditor5-html-embed/src/htmlembed';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';


import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

class ClassicEditor extends ClassicEditorBase {}
class DocumentEditor extends DecoupledEditor {}

class EmTagItalicPlugin extends Plugin {
  init() {
    this.editor.conversion.for('downcast').attributeToElement({
      model: 'italic',
      view: 'em',
      converterPriority: 'high',
    });
    this.editor.conversion.for('editingDowncast').attributeToElement({
      model: 'italic',
      view: 'em',
      converterPriority: 'high',
      upcastAlso: ['i', { styles: { 'font-style': 'italic' } }],
    });
  }
}

// Plugins to include in the build.
const commonPlugins = [
  Essentials,
  UploadAdapter,
  Alignment,
  Autoformat,
  Bold,
  Italic,
  BlockQuote,
  CKFinder,
  CloudServices,
  EasyImage,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalLine,
  Image,
  ImageLink,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Link,
  List,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  Subscript,
  Superscript,
  Strikethrough,
  Table,
  TableToolbar,
  Underline,
  HtmlEmbed,
  MediaEmbed,

  EmTagItalicPlugin,
  TextTransformation
];

// Editor configuration.
const defaultConfig = {
  allowedContent: true,
  roundedCorners: true,
  toolbar: {
    shouldNotGroupWhenFull: true,
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'alignment',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'indent',
      'outdent',
      '|',
      'highlight',
      'fontBackgroundColor',
      'fontColor',
      'fontSize',
      'fontFamily',
      '|',
      'link',
      'uploadImage',
      'blockQuote',
      'insertTable',
      'htmlEmbed',
      '|',
      'undo',
      'redo',
      'removeFormat'
    ]
  },
  alignment: {
    options: ['left', 'right', 'center', 'justify']
  },
  image: {
    toolbar: [
      // A dropdown containing `alignLeft` and `alignRight` options.
      'imageStyle:alignLeft',
      // A dropdown containing `alignBlockLeft`, `block` (default) and  `alignBlockRight` options.
      'imageStyle:breakText',
      'imageStyle:alignRight',
      'linkImage',
    ]
  },
  htmlEmbed: {
    showPreviews: true,
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells'
    ]
  },
  // This value must be kept in sync with the language defined in webpack.config.js.
  language: 'en'
};

ClassicEditor.builtinPlugins = commonPlugins;
ClassicEditor.defaultConfig = defaultConfig;

DocumentEditor.builtinPlugins = commonPlugins;
DocumentEditor.defaultConfig = defaultConfig;

export default {
	ClassicEditor,
	DocumentEditor,
}
