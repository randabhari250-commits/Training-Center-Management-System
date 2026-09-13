import { Component, signal } from '@angular/core';
import {StudentService} from '../../../../Service/StudentService';
import {inject} from '@angular/core';
import {OnInit} from '@angular/core';
import { StudentResponse } from '../../../../Model/Student';
import { StudentCard } from '../../components/student-card/student-card';
import { AuthService } from '../../../../Service/AuthService';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  imports: [StudentCard, FormsModule],
  selector: 'app-student-list',
  styleUrl: './student-list.css',
  templateUrl: './student-list.html',
})
export class StudentList implements OnInit {
    private StudentService = inject(StudentService);
    private AuthService = inject(AuthService);
    private route = inject(Router);
    Students = signal<StudentResponse[]>([]);
    searchName ='';
    selectedMajor ='';
    errorMessage = signal('');


    ngOnInit() : void{
      this.loadStudents();
    }

    addStudent(): void{
      this.route.navigate(['/students/new']);
    }
  loadStudents(): void {
    this.StudentService.getStudents(this.searchName, this.selectedMajor).subscribe({
      next : (Data) => {console.log('Student received', Data); this.Students.set(Data)}, error : (error) => {console.error('Error loading students', error)}
    });
  }

deleteStudent(id: number): void{
  if(!this.AuthService.isLoggedIn()){
    this.route.navigate(['/login']);
    return;
  }

  this.StudentService.deleteStudent(id).subscribe({
    next: () => {
      this.Students.update(list =>
        list.filter(student => student.Id !== id)
      );
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
  viewStudent(id : number): void {
    this.route.navigate(['/students', id]);
  }
  editStudent(id: number): void{
    this.route.navigate(['/students', id, 'edit']);
  }
}
