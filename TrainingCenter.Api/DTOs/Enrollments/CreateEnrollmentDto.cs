using TRAININGCENTER.API.Model;
namespace TRAININGCENTER.API.DTOs.Enrollments;



public class CreateEnrollmentDto
{
     public int CourseId {get;set;} 
     public int StudentId {get; set;}
}