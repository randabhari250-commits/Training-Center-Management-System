using System.ComponentModel.DataAnnotations;
namespace TRAININGCENTER.API.Model;
public class Instructor
{
    
    public int id {get; set;}

    public string Name {get;set;} = string.Empty;

    public string Email {get;set;} = string.Empty;

    public string Specialization {get; set;} = string.Empty;

    public List<Course> courses {get;set;}  = new();

}