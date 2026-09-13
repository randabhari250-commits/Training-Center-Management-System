using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Antiforgery;
namespace TRAININGCENTER.API.Model;

public class Student
{
  
    public int id {get; set;}
     
    public string name  {get; set;}=string.Empty;
     
     public string Email {get; set;} =string.Empty;

    
    public int age{get; set;} 
   
   public string major {get; set;}= string.Empty;
   
    public string phone {get;  set;} = string.Empty;

    public List<Enrollment> enrollment {get;set;} = new();


}