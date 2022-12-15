import {Component, OnInit} from '@angular/core';
import {FormBuilder, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {createPromoRangeValidator} from '../../shared/validators/date-range.validator';
import {FileUploadComponent} from '../../file-upload/file-upload.component';


@Component({
  selector: 'create-course-step-2',
  templateUrl: 'create-course-step-2.component.html',
  styleUrls: ['create-course-step-2.component.scss'],

})
export class CreateCourseStep2Component implements OnInit {
  form = this.fb.group({
      courseType: ['premium', Validators.required],
      price: [null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(9999),
          Validators.pattern('[0-9]+')
        ]
      ],
      thumbnail: [null],
      promoStartAt: [null],
      promoEndAt: [null],
    },
    {
      validators: [
        createPromoRangeValidator()
      ],
    }
  );

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form.valueChanges
      .subscribe(val => {
        const princeControl = this.form.controls["price"];
        if (val.courseType == 'free' && princeControl.enabled) {
          princeControl.disable({emitEvent: false});
        } else if (val.courseType == 'premium' && princeControl.disabled) {
          princeControl.enable({emitEvent: false});
        }
      })
  }

}
