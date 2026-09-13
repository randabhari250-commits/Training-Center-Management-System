using TRAININGCENTER.API.Model;
namespace TRAININGCENTER.API.DTOs.Enrollments;


public class CourseStudentDto
{
    public int CourseId {get; set;}

    public string Title {get;set;} = string.Empty;

    public List<string> students {get;set;} = new();
}