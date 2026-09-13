using System.ComponentModel.DataAnnotations;
 namespace TrainingCenter.Api.DTOs.Students;
 
 public class CreateStudentDto
{     [Required]
    public string name {get;set;} =  string.Empty;
     [Required]
     [EmailAddress]
    public string Email {get;set;} = string.Empty;
    [Range(16,100)]
    public int age {get;set;}
     [Required]
    public string phone {get;set;} = string.Empty;
     [Required]
    public string major {get;set;} = string.Empty;

}