import { Injectable } from "@angular/core";
import  { inject } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { CourseResponse } from "../Model/Course";
import { CreateCourse } from "../Model/Course";
import { UpdateCourse } from "../Model/Course";
import { CourseDetails } from "../Model/Course";
import { AssignInstructor } from "../Model/Course";


@Injectable({
  providedIn : 'root'
})

export class CourseService{
    private http = inject(HttpClient);




  getAllCourses() : Observable<CourseResponse[]>{
    return this.http.get<CourseResponse[]>('http://localhost:5023/api/Courses');
  }

  getCourseById(id: number) : Observable<CourseDetails>{
    return this.http.get<CourseDetails>('http://localhost:5023/api/Courses/' + id);
  }

  createCourse(course : CreateCourse): Observable<CourseResponse>{
    return this.http.post<CourseResponse>('http://localhost:5023/api/Courses', course);
  }

  updateCourse(id: number, updateCourse: UpdateCourse) : Observable<void>{
        return this.http.put<void>('http://localhost:5023/api/Courses/' + id, updateCourse);
  }

  UpdateInstructorCourse(id: number, assignInstructor : AssignInstructor) : Observable<void>{
    return this.http.put<void>('http://localhost:5023/api/Courses/' + id + '/instructor', assignInstructor);
      }

  deleteCourse(id: number) : Observable<void>{
    return this.http.delete<void>('http://localhost:5023/api/Courses/' +id);
  }

  }
