import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstructorService } from '../../../../Service/InstructorService';
import { ActivatedRoute } from '@angular/router';


@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-instructor-form',
  styleUrl: './instructor-form.css',
  templateUrl: './instructor-form.html',
})
export class InstructorForm implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private InstructorService = inject(InstructorService);
  private FormBuilder = inject(FormBuilder);
  InstructorId : number | null = null;
  SuccessMessage = signal('');
  errorMessage = signal('');

  InstructorForm : FormGroup = this.FormBuilder.group({
    Name : ['', Validators.required],
    Email : ['', [Validators.required, Validators.email]],
    Specialization :['', Validators.required]
  });


   ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.InstructorId = Number(id);
      this.InstructorService.getInstructorsById(this.InstructorId).subscribe({
        next: (instructor) => {
          this.InstructorForm.patchValue({
            Name: instructor.Name,
            Email: instructor.Email,
            Specialization: instructor.Specialization

          });
        },
        error: (error) => {
          console.error('Error loading Instructor', error);
        },
      });
    }
  }


    submitInstructor(): void {
  if (this.InstructorForm.invalid) {
    this.InstructorForm.markAllAsTouched();
    return;
  }

  this.SuccessMessage.set('');
  this.errorMessage.set('');

  if (this.InstructorId === null) {
    this.InstructorService.CreateInstructor(this.InstructorForm.value).subscribe({
      next: () => {
        this.SuccessMessage.set('Instructor created successfully.');
        this.InstructorForm.reset();
      },
      error: (error) => {
        console.error('Error creating Instructor', error);
        this.errorMessage.set('Error creating Instructor. Please try again.');
      }
    });
  }
  else {
    this.InstructorService.updateInstructor(
      this.InstructorId,
      this.InstructorForm.value
    ).subscribe({
      next: () => {
        this.SuccessMessage.set('Instructor updated successfully.');
      },
      error: (error) => {
        console.error('Error updating Instructor', error);
        this.errorMessage.set('Error updating Instructor. Please try again.');
      }
    });
  }
}



}
