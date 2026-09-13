using System.ComponentModel.DataAnnotations;
namespace TRAININGCENTER.API.Model;
public class Course
{
    
    public int id {get; set;}
    
    
     public string Title {get; set;} = string.Empty;

      public string Description {get;set;} = string.Empty;

      public int? InstructorId { get; set; } 
        
      public Instructor? instructor {get; set;}
      public int capacity {get;set;}

      public DateTime startDate {get;set;}

       public DateTime endDate {get;set;}

       public List<Enrollment> enrollmentCourse {get;set;} = new();


}