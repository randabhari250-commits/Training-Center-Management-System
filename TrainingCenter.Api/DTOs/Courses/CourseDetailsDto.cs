using System.ComponentModel.DataAnnotations;
using TRAININGCENTER.API.DTOs.Instructors;
using TRAININGCENTER.API.Model;
namespace TRAININGCENTER.API.DTOs.Courses;

public class CourseDetailsDto
{
    public int Id {get; set;}
    
    public string Title {get; set;} = string.Empty;

    public string Description {get;set;} = string.Empty;
    public int Capacity {get; set;}
    public int RegisteredStudentCount {get; set;}
    public DateTime StartDate {get;set;}

    public DateTime EndDate {get;set;}

    public InstructorResponseDto? Instructor {get;set;}
}