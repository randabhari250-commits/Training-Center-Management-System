using System.ComponentModel.DataAnnotations;
using TRAININGCENTER.API.Model;
namespace TRAININGCENTER.API.DTOs.Courses;

public class CourseResponseDto
{
    public int id {get; set;}
    
    public string Title {get; set;} = string.Empty;

    public string Description {get;set;} = string.Empty;

    public int? InstructorId { get; set; } 
        
    public int Capacity {get;set;}

    public DateTime StartDate {get;set;}

    public DateTime EndDate {get;set;}

}