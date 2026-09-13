import { Component, signal } from '@angular/core';
import { inject } from '@angular/core';
import {OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { InstructorService } from '../../../../Service/InstructorService';
import { InstructorResponse } from '../../../../Model/instructor';
import { AuthService } from '../../../../Service/AuthService';


@Component({
  imports: [],
  selector: 'app-instructor-list',
  styleUrl: './instructor-list.css',
  templateUrl: './instructor-list.html',
})
export class InstructorList  implements OnInit{

private InstructorService = inject(InstructorService);
private Router = inject(Router);
private AuthService = inject(AuthService);
Instructor = signal<InstructorResponse[]>([]);
errorMessage = signal('');

    ngOnInit() : void{
      this.loadInstructor();
    }

loadInstructor(): void {
  this.InstructorService.getAllInstructors().subscribe({
    next: (Data) => {
      console.log('Instructors received:', Data);
      this.Instructor.set(Data);
    },
    error: (error) => {
      console.error('Error loading Instructors', error);
    }
  });
}
  addInstructor(): void{
    this.Router.navigate(['/instructors/new']);
  }

  viewInstructor(id : number): void {
    this.Router.navigate(['/instructors', id]);
  }
  editInstructor(id: number): void{
    this.Router.navigate(['/instructors', id, 'edit']);
  }

  deleteInstructor(id: number): void{
     if(!this.AuthService.isLoggedIn()){
      this.Router.navigate(['/login']);
      return;
    }
    this.InstructorService.deleteInstructor(id).subscribe({
      next: () => { this.Instructor.update(list => list.filter(Instructor => Instructor.id !== id ));
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

