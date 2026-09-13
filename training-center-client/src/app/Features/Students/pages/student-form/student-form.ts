import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../../../Service/StudentService';
import { ActivatedRoute } from '@angular/router';


@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-student-form',
  styleUrls: ['./student-form.css'],
  templateUrl: './student-form.html',
})
export class StudentForm implements OnInit {
  private fb = inject(FormBuilder);
  private StudentService = inject(StudentService);
  private rout = inject(ActivatedRoute);
  studentId: number | null = null;
  SuccessMessage = signal('');
  errorMessage = signal('');

  studentForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    age: ['', [Validators.required, Validators.min(16), Validators.max(100)]],
    major: ['', Validators.required],
    phone: ['', Validators.required],
  });

  ngOnInit(): void {
    const id = this.rout.snapshot.paramMap.get('id');
    if (id) {
      this.studentId = Number(id);
      this.StudentService.getStudentById(this.studentId).subscribe({
        next: (student) => {
          this.studentForm.patchValue({
            name: student.Name,
            email: student.Email,
            age: student.Age,
            major: student.Major,
            phone: student.Phone,
          });
        },
        error: (error) => {
          console.error('Error loading student', error);
        },
      });
    }
  }

  submitForm(): void {
  if (this.studentForm.invalid) {
    this.studentForm.markAllAsTouched();
    return;
  }


  if (this.studentId == null) {
    this.StudentService.createStudent(this.studentForm.value).subscribe({
      next: () => {
        this.SuccessMessage.set('Student created successfully.');
        this.studentForm.reset();
      },
      error: (error) => {
        console.error('Error creating student', error);
        this.errorMessage.set('Error creating student. Please try again.');
      },
    });
  } else {
    this.StudentService.updateStudent(this.studentId, this.studentForm.value).subscribe({
      next: () => {
        this.SuccessMessage.set('Student updated successfully.');
      },
      error: (error) => {
        console.error('Error updating student', error);
        this.errorMessage .set('Error updating student. Please try again.');
      },
    });
  }
}
}
