import { Course } from "./Course";


export interface instructor {

    id : number;
    Name : string;
    Email : string
    Specialization : string;
    courses : Course[];
}


export interface CreateInstructor {
    Name : string;
    Email : string;
    Specialization : string;

}

export interface UpdateInstructor {
    Name : string;
    Email : string;
    Specialization : string;
}



export interface InstructorResponse{
    id : number;
    Name : string;
    Email : string
    Specialization : string;
}








