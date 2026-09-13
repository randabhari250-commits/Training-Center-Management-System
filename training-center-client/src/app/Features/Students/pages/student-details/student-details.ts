import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../../Service/StudentService';
import { EnrollmentService } from '../../../../Service/EnrollmentService';
import { StudentResponse } from '../../../../Model/Student';

@Component({
  imports: [],
  selector: 'app-student-details',
  styleUrl: './student-details.css',
  templateUrl: './student-details.html',
})
export class StudentDetails implements OnInit{
  private  route = inject(ActivatedRoute);
  private StudentsService = inject(StudentService);
  private EnrollmentService = inject(EnrollmentService);
  student = signal<StudentResponse| null>(null);
  courses = signal<string[]>([]);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(!id){
      return;
    }
    this.StudentsService.getStudentById(id).subscribe({next : (data) => {this.student.set(data)},
  error : (error) => {console.error('Error loading student', error)}});

  this.EnrollmentService.getEnrollmentStudent(id).subscribe({next : (data) => {this.courses.set(data.courses)}, error : (error) =>
  {console.error('Error loading Student courses', error)}});

  }


}
