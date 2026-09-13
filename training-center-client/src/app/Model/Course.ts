import {instructor, InstructorResponse} from "./instructor";
import { Enrollment } from "./Enrollment";

export interface Course {
      Title: string;

      Description : string;

      instructorId? : number;

      instructor? : instructor;

      capacity : number;

      startDate : Date;

      endDate : Date;

      enrollmentCourse : Enrollment[];


}


export interface AssignInstructor
{
      InstructorId : number;
}

export interface CreateCourse {
      Title: string;

      Description : string;

      instructorId? : number;

      Capacity : number;

      StartDate : Date;

      EndDate : Date;
}

export interface UpdateCourse {
      Title: string;

      Description : string;

      InstructorId? : number;

      Capacity : number;

      StartDate : Date;

      EndDate : Date;

}
export interface CourseDetails{
        Id : number;

      Title: string;

      Description : string;

      Capacity : number;

      RegisteredStudentCount : number;

      StartDate : Date;

      EndDate : Date;
      Instructor? : InstructorResponse;
}


export interface CourseResponse{
      id : number;

      Title: string;

      Description : string;

      InstructorId? : number;

      Capacity : number;

      StartDate : Date;

      EndDate : Date;
}


