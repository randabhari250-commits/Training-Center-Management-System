using Microsoft.AspNetCore.Mvc;
using TRAININGCENTER.API.Data;
using TRAININGCENTER.API.Model;
using TRAININGCENTER.API.DTOs.Enrollments;
using TRAININGCENTER.API.Service;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace TRAININGCENTER.API.Controller;

[ApiController]
[Route("api/[Controller]")]

public class EnrollmentsController : ControllerBase
{
    public readonly TrainingCenterDbContext _context;
    public readonly EnrollmentService enrollmentService;

    public EnrollmentsController(TrainingCenterDbContext context, EnrollmentService EnrollmentService)
    {
            _context=context;
            enrollmentService = EnrollmentService;
    }

[HttpGet]
public async Task<ActionResult<List<EnrollmentResponseDto>>> GetEnrollment()
    {
        List<EnrollmentResponseDto> enrollment =  await _context.Enrollment.
        Include(e => e.Student)
        .Include(e =>e.Course).
        Select(e => new EnrollmentResponseDto
        {
            Id = e.Id,
            StudentId = e.StudentId,
            StudentName = e.Student.name,
            CourseId = e.CourseId,
            CourseTitle = e.Course.Title,
            EnrollmentDate = e.EnrollmentDate,
            Status = e.Status
        }).ToListAsync();
        return Ok(enrollment);
    }

[HttpGet("{id:int}/Student")]
public async Task<ActionResult<StudentCourseDto>> StudentEnrollment(int id)
{
    var courseStudent = await _context.Enrollment.Where(s => s.StudentId == id && s.Status ==EnrollmentStatus.Active ).Select(e => e.Course.Title).ToListAsync();
    StudentCourseDto? EnrollmentStudent = await _context.Students.Where(e => e.id == id).Select(s => new StudentCourseDto
    {
        StudentId = s.id,
        name = s.name,
        courses = courseStudent
    }).FirstOrDefaultAsync();
    if(EnrollmentStudent is null)
        {
            return NotFound();
        }
        return Ok(EnrollmentStudent);
}

[HttpGet("{id:int}/Course")]
public async Task<ActionResult<CourseStudentDto>> CourseEnrollment(int id)
    {
        var Students = await _context.Enrollment.Where(c => c.CourseId == id && c.Status ==EnrollmentStatus.Active).Select(s => s.Student.name).ToListAsync();
        CourseStudentDto? EnrollmentCourse = await _context.Courses.Where(d => d.id == id).Select(SS => new CourseStudentDto
        {
            CourseId = SS.id,
            Title = SS.Title,
            students = Students
        }).FirstOrDefaultAsync();
        if(EnrollmentCourse is null)
        {
            return NotFound();
        }
        return Ok(EnrollmentCourse);
    }


[Authorize]
[HttpPost]

public async Task<IResult> CreateEnrollment([FromBody] CreateEnrollmentDto enrollmentDto)
    {
        return  await enrollmentService.CreateEnrollment(enrollmentDto.StudentId, enrollmentDto.CourseId);
    }



[Authorize]
[HttpPut("{id:int}")]
public async Task<IResult> CancelEnrollment(int id)
    {
        return await enrollmentService.CancelEnrollment(id);
    }




}