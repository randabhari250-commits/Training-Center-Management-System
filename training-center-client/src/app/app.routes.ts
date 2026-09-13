import { Routes } from '@angular/router';
import { authGuard } from './Core/Guards/auth.guard';

import { StudentList } from './Features/Students/pages/student-list/student-list';
import { StudentForm } from './Features/Students/pages/student-form/student-form';
import { StudentDetails } from './Features/Students/pages/student-details/student-details';
import { InstructorList } from './Features/Instructors/pages/instructor-list/instructor-list';
import { InstructorForm } from './Features/Instructors/pages/instructor-form/instructor-form';
import { InstructorDetails } from './Features/Instructors/pages/instructor-details/instructor-details';
import { CourseList } from './Features/Courses/pages/course-list/course-list';
import { CourseForm } from './Features/Courses/pages/course-form/course-form';
import { CourseDetailsPage } from './Features/Courses/pages/course-details-page/course-details-page';
import { EnrollmentList } from './Features/Enrollments/pages/enrollment-list/enrollment-list';
import { EnrollmentForm } from './Features/Enrollments/pages/enrollment-form/enrollment-form';
import { Login } from './Features/Auth/pages/login/login';
import { Register } from './Features/Auth/pages/register/register';
import { NotFound } from './Shared/pages/not-found/not-found';


export const routes: Routes = [

  {
    path: 'students',
    component: StudentList
  },

  {
    path: 'students/new',
    component: StudentForm,
    canActivate: [authGuard]
  },

  {
    path: 'students/:id/edit',
    component: StudentForm,
    canActivate: [authGuard]
  },

  {
    path: 'students/:id',
    component: StudentDetails
  },
  {
    path: 'instructors',
    component: InstructorList
  },
  {
    path: 'instructors/new' ,
    component: InstructorForm,
    canActivate: [authGuard]
  },
  {
    path: 'instructors/:id/edit' ,
    component: InstructorForm,
    canActivate: [authGuard]
  },
  {
    path: 'instructors/:id',
    component: InstructorDetails
  },
   {
    path: 'courses',
    component: CourseList
  },
  {
    path: 'courses/new',
    component: CourseForm,
    canActivate: [authGuard]
  },
  {
    path: 'courses/:id/edit',
    component: CourseForm,
    canActivate: [authGuard]
  },
  {
    path: 'courses/:id',
    component: CourseDetailsPage
  },
   {
    path: 'enrollments',
    component: EnrollmentList
  },
   {
    path: 'enrollments/new',
    component: EnrollmentForm,
    canActivate: [authGuard]
  },
  {
    path: 'register',
    component: Register
  },
   {
    path: 'login',
    component: Login
  },
  {
    path: '',
    redirectTo: 'students',
    pathMatch: 'full'
  },
  {
    path:'not-found',
    component:NotFound
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
]
