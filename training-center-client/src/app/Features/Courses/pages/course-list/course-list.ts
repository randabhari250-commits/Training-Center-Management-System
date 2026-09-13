import { Component, inject } from '@angular/core';
import { signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../../../Service/CourseService';
import { CourseResponse } from '../../../../Model/Course';
import { AuthService } from '../../../../Service/AuthService';

@Component({
  imports: [],
  selector: 'app-course-list',
  styleUrl: './course-list.css',
  templateUrl: './course-list.html',
})
export class CourseList implements OnInit{
  private courseService = inject(CourseService);
  private Router = inject(Router);
  private AuthService = inject(AuthService);

  Course = signal<CourseResponse[]>([]);
  errorMessage = signal('');

  ngOnInit(): void {
    this.LoadCourse();
  }

  LoadCourse() : void{
      this.courseService.getAllCourses().subscribe({
        next : (data) => {this.Course.set(data);}, error : (error) => {console.error('Error Loading Courses', error);}
      });
  }

  addCorse() : void{
    this.Router.navigate(['/courses/new']);
  }

  viewCourse(id: number) : void{
    this.Router.navigate(['/courses',id]);

  }
  editCourse(id:number): void{
      this.Router.navigate(['/courses',id,'edit'])
  }
  deleteCourse(id:number): void{
     if(!this.AuthService.isLoggedIn()){
      this.Router.navigate(['/login']);
      return;
    }
    this.courseService.deleteCourse(id).subscribe({
      next: () => {this.Course.update(list => list.filter(course => course.id !== id));
        this.errorMessage.set('');
      },
       error: (error) => {
      if (error.status === 409) {
        this.errorMessage.set(error.error);
        setTimeout(() => { this.errorMessage.set('');}, 5000);
      }
    }
    });

  }
}
