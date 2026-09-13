import { Enrollment } from "./Enrollment";


export interface Student {

  id: number;
  name : string;
  Email : string;
  age : number;
  major : string;
  phone : string;
  enrollment : Enrollment[];

}

export interface CreateStudent {


  name : string;
  Email : string;
  age : number;
  phone : string;
  major : string;
}

export interface UpdateStudent {


  name : string;
  Email : string;
  age : number;
  phone : string;
  major : string;
}

export interface StudentResponse{

  Id: number;
  Name : string;
  Email : string;
  Age : number;
  Phone : string;
  Major : string;

}


