using System.ComponentModel.DataAnnotations;
namespace TRAININGCENTER.API.DTOs.Auth;

public class RegisterDto
{  
   
    [Required]
    [EmailAddress]
    public string Email {get;set;} = string.Empty;
    [Required]
    [MinLength (6)]
    public string password {get;set;} = string.Empty;
}