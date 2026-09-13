using TRAININGCENTER.API.Model;
namespace TRAININGCENTER.API.DTOs.Enrollments;



public class StudentCourseDto
{
    public int StudentId {get; set;} 

    public string name {get; set;} = string.Empty;

    public List<string> courses {get;set;} = new();
}