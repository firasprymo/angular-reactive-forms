import {Component} from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';


@Component({
  selector: "create-course",
  styleUrls: ["create-course.component.scss"],
  templateUrl: "create-course.component.html",
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    multi: true,
    useExisting: CreateCourseComponent
  }]
})
export class CreateCourseComponent {

}
