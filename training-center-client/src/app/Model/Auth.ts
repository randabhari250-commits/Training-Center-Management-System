export interface User{
  Id : number;
  Email : string;
  PasswordHash : string;

}



export interface AuthResponse{
  token : string;
  expiration : string;
  email : string;
}



export interface  Login{
  Email : string;
  password : string;
}


export interface  Register{
  Email : string;
  password : string;
}

export interface RegisterResponse{
  Message : string;
}
