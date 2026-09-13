using System.ComponentModel.DataAnnotations;
using TRAININGCENTER.API.Model;
namespace TRAININGCENTER.API.DTOs.Courses;

public class UpdateCourseDto
{
    [Required]
    public string Title {get; set;} = string.Empty;
    [Required]
    public string Description {get;set;} = string.Empty;

    public int? InstructorId { get; set; } 
    [Range(1,45)]
    public int Capacity {get;set;}
    [Required]

    public DateTime StartDate {get;set;}
    [Required]
    public DateTime EndDate {get;set;}
}