import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Editor, EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { BlobService } from '../../core/services/blob.service';

@Component({
  selector: 'app-custom-editor',
  standalone: true,
  imports: [CommonModule, EditorModule, FormsModule, DialogModule],
  templateUrl: './custom-editor.component.html',
  styleUrl: './custom-editor.component.scss',
})
export class CustomEditorComponent {
  private blob: BlobService = inject(BlobService);
  @Input() invalid = false;
  @Input() value: string;
  @Output() changedValue: any = new EventEmitter();

  @Input() index: number = 0;

  @ViewChild('editor') editor: Editor;

  fakeFile: any;
  @ViewChildren('editor') editors: QueryList<Editor>;
  onFileSelect($event: any) {
    const file = $event.target.files && $event.target.files[0];
    if (file) {
      this.uploadFile($event);
    }
  }
  uploadFile(e: any) {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append('file', files[i]);
      this.blob.UploadFile(fd).subscribe((resp: any) => {
        this.insertImageAtCursor(resp.data.fileUrl);
      });
    }
  }

  private insertImageAtCursor(url: string) {
    this.editor.quill.focus();
    const selection = this.editor.quill.getSelection();
    const range = this.editor.quill.getSelection(true);

    // Insert the image at the cursor position
    this.editor.quill.clipboard.dangerouslyPasteHTML(
      range.index,
      `<img src="${url}" alt="Uploaded Image">`,
    );
    this.fakeFile = null;
    this.editor.quill.setSelection(selection.index + 1, 0);
    const editorValue = this.editor.quill.root.innerHTML;
    this.value = editorValue;
    this.changedValue.emit(this.value.toString());
  }
}
