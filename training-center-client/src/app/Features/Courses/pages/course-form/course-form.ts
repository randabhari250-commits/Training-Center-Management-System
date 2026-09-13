import { Component, inject, signal } from '@angular/core';
import { OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseService } from '../../../../Service/CourseService';
import { InstructorService } from '../../../../Service/InstructorService';
import { InstructorResponse } from '../../../../Model/instructor';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-course-form',
  styleUrl: './course-form.css',
  templateUrl: './course-form.html',
})
export class CourseForm implements OnInit{
  private  activatedRoute = inject(ActivatedRoute);
  private  CourseService = inject(CourseService);
  private  FormBuilder  = inject(FormBuilder);
  private  InstructorService =inject(InstructorService);
  private Router = inject(Router);

  courseId : number | null = null;
  Instructor : InstructorResponse[] = [];
  SuccessMessage = signal('');
  errorMessage = signal('');

  courseForm : FormGroup = this.FormBuilder.group({
    Title : ['', Validators.required], Description : ['', Validators.required],
    Capacity : ['', [Validators.required, Validators.min(1), Validators.max(45)]],
    StartDate: ['',Validators.required ], EndDate: ['',Validators.required], InstructorId: [null]

  });

  ngOnInit(): void {
    this.loadInstructor();
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id){
      this.courseId = Number(id);
      this.CourseService.getCourseById(this.courseId).subscribe({
        next : (course) => {this.courseForm.patchValue({
          Title : course.Title,
          Description : course.Description,
          Capacity : course.Capacity,
          StartDate : course.StartDate,
          EndDate : course.EndDate,
          InstructorId : course.Instructor?.id?? null
        });},
        error : (error) => {console.error('Error loading Course', error);}
      });
    }
  }


  loadInstructor(): void{
    this.InstructorService.getAllInstructors().subscribe({
      next :(data) => {this.Instructor = data;}, error: (error) => {console.error('Error loading Instructor', error);}
    });
  }

  submitCourse(): void {

  if (this.courseForm.invalid) {
    this.courseForm.markAllAsTouched();
    return;
  }

  this.SuccessMessage.set('');
  this.errorMessage.set('');

  const startDate = new Date(this.courseForm.value.StartDate);
  const endDate = new Date(this.courseForm.value.EndDate);

  if (endDate <= startDate) {
    this.errorMessage.set('End date must be after start date.');
    return;
  }

  if (this.courseId === null) {

    this.CourseService.createCourse(this.courseForm.value).subscribe({
      next: () => {this.SuccessMessage.set('Course created successfully.'); setTimeout(() => {
          this.Router.navigate(['/courses']);}, 1000);
      },
      error: (error) => {
        console.error('Error creating Course', error);
        this.errorMessage.set('Error creating Course. Please try again.');
      }
    });

  }
  else {

    this.CourseService.updateCourse(this.courseId,this.courseForm.value).subscribe({
      next: () => {
        this.SuccessMessage.set('Course updated successfully.'); setTimeout(() => {
          this.Router.navigate(['/courses']);}, 1000);
      },
      error: (error) => {
        console.error('Error updating Course', error);
        this.errorMessage.set('Error updating Course. Please try again.');
      }
    });

  }
}
}
