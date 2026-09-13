import { Student } from "./Student";
import { Course } from "./Course";
import { EnrollmentStatus } from "./EnrollmentStatus";


export interface Enrollment {
    Id : number;
    StudentId : number;
    Student : Student;
    CourseId : number;
    Course : Course;
    EnrollmentDate : Date;
    Status : EnrollmentStatus;

}


export interface CreateEnrollment {
  StudentId : number;
  CourseId : number;
}

export interface CourseStudent {
    CourseId : number;
    Title: string;
    students : string[];
}

export interface EnrollmentResponse {
  Id : number;
  StudentId : number;
  StudentName : string;
  CourseId : number;
  CourseTitle : string;
  EnrollmentDate : Date;
  Status : EnrollmentStatus;
}


export interface  StudentCourse {
  StudentId : number;
  Name : string;
  courses : string[];

}
