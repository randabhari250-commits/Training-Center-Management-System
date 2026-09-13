using System.ComponentModel.DataAnnotations;
namespace TRAININGCENTER.API.DTOs.Auth;

public class LoginDto
{   [Required]
    [EmailAddress]
    public string Email {get;set;} =string.Empty;
    [Required]
    public string password {get;set;} =string.Empty;
}