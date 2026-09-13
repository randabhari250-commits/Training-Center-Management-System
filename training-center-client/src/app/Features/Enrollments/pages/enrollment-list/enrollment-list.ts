import { Component, inject , signal} from '@angular/core';
import {  OnInit } from '@angular/core';
import { EnrollmentService } from '../../../../Service/EnrollmentService';
import { EnrollmentResponse } from '../../../../Model/Enrollment';
import { EnrollmentStatus } from '../../../../Model/EnrollmentStatus';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-enrollment-list',
  styleUrl: './enrollment-list.css',
  templateUrl: './enrollment-list.html',
})
export class EnrollmentList  implements OnInit{
  private EnrollmentService = inject(EnrollmentService);
  private router = inject(Router);

  enrollList = signal<EnrollmentResponse[]>([]);

  ngOnInit(): void {
    this.loadingEnroll();
  }

  loadingEnroll() : void{
    this.EnrollmentService.getAllEnrollments().subscribe({
      next:(data) => {this.enrollList.set(data);},
      error:(error) => {console.error('Error loading Enrollments', error);}
    });
  }

  addEnroll() : void {
    this.router.navigate(['/enrollments/new']);
  }

  cancelEnroll(id:number): void{
    this.EnrollmentService.CancelEnrollment(id).subscribe({
      next : () => {this.enrollList.update(list => list.map(enroll => enroll.Id === id ?
      {...enroll, Status: EnrollmentStatus.Cancelled} : enroll));
      },
      error:(error) => {console.error('Error Cancelling Enrollment', error);}

    });
  }
}
