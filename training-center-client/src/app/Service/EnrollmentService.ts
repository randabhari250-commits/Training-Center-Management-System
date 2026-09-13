import { Injectable } from "@angular/core";
import  { inject } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { EnrollmentResponse } from "../Model/Enrollment";
import { CreateEnrollment } from "../Model/Enrollment";
import { StudentCourse } from "../Model/Enrollment";
import { CourseStudent } from "../Model/Enrollment";




@Injectable({
  providedIn : 'root'
})

export class EnrollmentService{
    private http = inject(HttpClient);


    getAllEnrollments() : Observable<EnrollmentResponse[]>{
      return  this.http.get<EnrollmentResponse[]>('http://localhost:5023/api/Enrollments');
    }

    getEnrollmentStudent(id: number) : Observable<StudentCourse>{
      return this.http.get<StudentCourse>('http://localhost:5023/api/Enrollments/' + id + '/Student');}

    getEnrollmentCourse(id: number) : Observable<CourseStudent>{
      return this.http.get<CourseStudent>('http://localhost:5023/api/Enrollments/' + id + '/Course');}

    CreateEnrollment(enrollment : CreateEnrollment) : Observable<string>{
      return this.http.post<string>('http://localhost:5023/api/Enrollments', enrollment);
    }

    CancelEnrollment(id: number) : Observable<void>{
      return this.http.put<void>('http://localhost:5023/api/Enrollments/' + id, null);
    }

  }











