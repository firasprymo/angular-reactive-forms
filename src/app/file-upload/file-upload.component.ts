import {Component, Input} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {catchError, finalize} from 'rxjs/operators';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {of} from 'rxjs';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FileUploadComponent
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor, Validator {
  @Input() requiredFileType: string;
  fileName = '';
  fileUploadError = false;
  FileUploadSuccess = false;
  uploadProgress: number;
  disabled: boolean = false;
  onChange = (fileName: string) => {
  }
  onTouched = () => {
  }
  onValidatorChange = () => {
  }

  constructor(private http: HttpClient) {
  }

  onClick(fileUpload: HTMLInputElement) {
    this.onTouched();
    fileUpload.click();
  }

  writeValue(value: any) {
    this.fileName = value;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState?(disabled: boolean) {
    this.disabled = disabled
  }

  registerOnValidatorChange(onValidatorChange: () => void) {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.FileUploadSuccess) {
      return;
    }
    let errors: any = {
      requiredFileType: this.requiredFileType
    }
    if (this.fileUploadError) {
      errors.uploadFailed = true;
    }

    return errors;
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('thumbnail', file);
      this.fileUploadError = false;
      this.http.post("/api/thumbnail-upload", formData, {
        reportProgress: true,
        observe: 'events'
      })
        .pipe(catchError(error => {
            this.fileUploadError = true;
            return of(error)
          }),
          finalize(() => {
            this.uploadProgress = null;
          }))
        .subscribe(event => {
          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total))
          } else if (event.type == HttpEventType.Response) {
            this.FileUploadSuccess = true;
            this.onValidatorChange();
            this.onChange(this.fileName)
          }
        });
    }
  }
}
