import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstructorService } from '../../../../Service/InstructorService';
import { InstructorResponse } from '../../../../Model/instructor';

@Component({
  selector: 'app-instructor-details',
  imports: [],
  templateUrl: './instructor-details.html',
  styleUrl: './instructor-details.css'
})
export class InstructorDetails implements OnInit {

  private route = inject(ActivatedRoute);
  private InstructorService = inject(InstructorService);

  instructor = signal<InstructorResponse | null>(null);

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!id) {
      return;
    }

    this.InstructorService.getInstructorsById(id).subscribe({

      next: (data) => {
        this.instructor.set(data);
      },

      error: (error) => {
        console.error(
          'Error loading Instructor',
          error
        );
      }

    });
  }
}
