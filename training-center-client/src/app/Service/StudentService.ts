import { Injectable } from "@angular/core";
import { inject } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { StudentResponse } from "../Model/Student";
import { CreateStudent} from "../Model/Student";
import { UpdateStudent } from "../Model/Student";


@Injectable({
  providedIn : 'root'
})

export class StudentService{
    private http = inject(HttpClient);


    getStudents(name? : string , major? : string) : Observable<StudentResponse[]>{
       let url = 'http://localhost:5023/api/Students';
      const params : string[] =[];
      if(name){
        params.push(`name=${encodeURIComponent(name)}`);
      }
      if(major){
        params.push(`major=${encodeURIComponent(major)}`);
      }
      if(params.length > 0){
        url += '?'+ params.join('&');
      }
      return this.http.get<StudentResponse[]>(url);
    }

    getStudentById(id: number) : Observable<StudentResponse>{
      return this.http.get<StudentResponse>('http://localhost:5023/api/Students/' + id);
    }

    createStudent(createStudent : CreateStudent) : Observable<StudentResponse>{
      return this.http.post<StudentResponse>('http://localhost:5023/api/Students', createStudent);
    }
    updateStudent( id : number, updateStudent : UpdateStudent) : Observable<void>{
      return this.http.put<void>('http://localhost:5023/api/Students/' + id, updateStudent);
    }

    deleteStudent(id: number) : Observable<void>{
      return this.http.delete<void>('http://localhost:5023/api/Students/' + id);
    }
}
