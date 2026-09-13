import { Component, input } from '@angular/core';
import { StudentResponse } from '../../../../Model/Student';


@Component({
  imports: [],
  selector: 'app-student-card',
  styleUrl: './student-card.css',
  templateUrl: './student-card.html',
})
export class StudentCard {
  student = input.required<StudentResponse>();
}
