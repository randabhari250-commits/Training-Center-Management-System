import { Injectable } from "@angular/core";
import  { inject } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { InstructorResponse } from "../Model/instructor";
import { CreateInstructor } from "../Model/instructor";
import { UpdateInstructor } from "../Model/instructor";

@Injectable({
  providedIn : 'root'
})

export class InstructorService{
    private http = inject(HttpClient);

    getAllInstructors() : Observable<InstructorResponse[]>{
      return  this.http.get<InstructorResponse[]>('http://localhost:5023/api/Instructors');
    }


    getInstructorsById( id: number) : Observable<InstructorResponse>{
      return this.http.get<InstructorResponse>(`http://localhost:5023/api/Instructors/${id}`);
    }

    CreateInstructor( instructor : CreateInstructor) : Observable<InstructorResponse>{
      return this.http.post<InstructorResponse>('http://localhost:5023/api/Instructors', instructor);
    }

    updateInstructor( id: number, updateInstructor : UpdateInstructor) : Observable<void>{
      return this.http.put<void>(`http://localhost:5023/api/Instructors/${id}`, updateInstructor);
    }

    deleteInstructor(id:number) : Observable<void>{
      return this.http.delete<void>('http://localhost:5023/api/Instructors/' +id);

    }
}
