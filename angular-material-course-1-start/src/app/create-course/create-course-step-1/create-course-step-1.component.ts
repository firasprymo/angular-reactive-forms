import {Component} from '@angular/core';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';

const SAMPLE_TEXT="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam cupiditate dicta doloremque ea earum illum incidunt itaque maxime porro veritatis. Beatae facere ipsa itaque maxime necessitatibus, quis similique sit voluptas?\n" +
  "A ad distinctio dolorem ducimus eligendi inventore itaque laborum minima molestias quam reprehenderit, sapiente sint voluptas. A accusantium beatae doloremque in iure molestiae provident tempora vero. Enim officiis quis sequi.\n" +
  "A aliquam culpa cumque deleniti dolorem doloribus exercitationem harum libero maxime molestiae, quia saepe suscipit voluptate! Atque commodi dignissimos dolor doloremque error facere itaque, laudantium placeat quae quaerat quibusdam, saepe."
@Component({
  selector: "create-course-step-1",
  templateUrl: "create-course-step-1.component.html",
  styleUrls: ["create-course-step-1.component.scss"],

})
export class CreateCourseStep1Component {

  form = this.fb.group({
    title: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(60)
    ]],
    releasedAt: [new Date(1990, 1, 1), Validators.required],
    category: ['BEGINNER', Validators.required],
    courseType: ['premium', Validators.required],
    downloadsAllowed: [false, Validators.requiredTrue],
    longDescription: [SAMPLE_TEXT, [Validators.required, Validators.minLength(3)]]
  });
  dateClass: MatCalendarCellClassFunction<Date> =
    (cellDate, view) => {
      const date = cellDate.getDate();
      if (view == 'month') {
        return (date == 1) ? 'highlight-date' : ""
      }
      return "";
    }

  constructor(private fb: UntypedFormBuilder) {

  }

  get courseTitle() {
    return this.form.controls['title'];
  }

}
