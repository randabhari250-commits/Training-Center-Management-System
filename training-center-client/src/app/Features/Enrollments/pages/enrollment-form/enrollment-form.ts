import { Component, inject, OnInit} from '@angular/core';
import { FormBuilder,FormGroup ,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EnrollmentService } from '../../../../Service/EnrollmentService';
import { CourseService } from '../../../../Service/CourseService';
import { StudentService } from '../../../../Service/StudentService';
import { EnrollmentResponse } from '../../../../Model/Enrollment';
import { StudentResponse } from '../../../../Model/Student';
import { CourseResponse } from '../../../../Model/Course';


@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-enrollment-form',
  styleUrl: './enrollment-form.css',
  templateUrl: './enrollment-form.html',
})
export class EnrollmentForm implements OnInit{
  private StudentService = inject(StudentService);
  private CourseService = inject(CourseService);
  private EnrollmentService = inject(EnrollmentService);
  private FormBuilder = inject(FormBuilder);

  studentList : StudentResponse[] = [];
  courseList : CourseResponse[] = [];
  errorMessage = '';

  enrollmentForm : FormGroup = this.FormBuilder.group({
    StudentId :[null, Validators.required], CourseId: [null, Validators.required]
  });

  ngOnInit(): void {
    this.LoadingStudents();
    this.LoadingCourse();
  }

  LoadingStudents() : void {
    this.StudentService.getStudents().subscribe({
      next : (data) => {this.studentList = data ;},
      error: (error) => {console.error('Error loading Students', error);}
    });
  }

  LoadingCourse(): void{
    this.CourseService.getAllCourses().subscribe({
      next : (data) => {this.courseList = data;},
      error : (error) => {console.error('Error loading Courses', error)}
    })
  }

  submitEnroll(): void{
    if(this.enrollmentForm.invalid){
      return;
    }

    this.EnrollmentService.CreateEnrollment(this.enrollmentForm.value).subscribe({
      next: (data) => {console.log('Enrollment created seccessfully', data); this.errorMessage ='' ;
        this.enrollmentForm.reset();},
    error: (error) => {
      if (error.error === 'The student already enrolled in this Course') {
          this.errorMessage = 'duplicate';
        }

      if (error.error === 'This Course is Full') {
        this.errorMessage = 'full';
        }
      }
    });
  }
}
