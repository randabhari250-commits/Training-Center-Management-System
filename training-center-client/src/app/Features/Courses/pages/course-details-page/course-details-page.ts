import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../../Service/CourseService';
import { EnrollmentService } from '../../../../Service/EnrollmentService';
import { CourseDetails } from '../../../../Model/Course';

@Component({
  imports: [],
  selector: 'app-course-details-page',
  styleUrl: './course-details-page.css',
  templateUrl: './course-details-page.html',
})
export class CourseDetailsPage implements OnInit{
  private Route =inject(ActivatedRoute);
  private CourseService = inject(CourseService);
  private EnrollmentService = inject(EnrollmentService);

  course = signal<CourseDetails| null> (null);
  registeredStudents = signal<string[]>([]);

  ngOnInit(): void {
    const id = Number (this.Route.snapshot.paramMap.get('id'));

    if(!id){
      return;
    }

    this.CourseService.getCourseById(id).subscribe({
      next: (data) => {this.course.set(data);}, error: (error) => {console.error('Error loading Course', error);}
    });

    this.EnrollmentService.getEnrollmentCourse(id).subscribe({

      next: (data) => {this.registeredStudents.set(data.students);},
      error: (error) => {console.error('Error loading registered students', error);}
    });
  }
}
