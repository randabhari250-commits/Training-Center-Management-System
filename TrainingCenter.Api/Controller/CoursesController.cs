using Microsoft.AspNetCore.Mvc;
using TRAININGCENTER.API.Data;
using TRAININGCENTER.API.Model;
using TRAININGCENTER.API.DTOs.Courses;
using TRAININGCENTER.API.DTOs.Instructors;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using TrainingCenter.Api.Migrations;
using Microsoft.AspNetCore.Authorization;

namespace TRAININGCENTER.API.Controller;

[ApiController]
[Route("api/[Controller]")]

public class CoursesController : ControllerBase
{
        public readonly TrainingCenterDbContext _context;

        public CoursesController(TrainingCenterDbContext context)
    {
        _context = context;
    }

[HttpGet]

public async Task<ActionResult<List<CourseResponseDto>>> GetCourse()
    {
    List<CourseResponseDto> course = await _context.Courses.Select(c => new CourseResponseDto
        {
            id = c.id,
            Title = c.Title,
            Description = c.Description,
            InstructorId = c.InstructorId,
            Capacity = c.capacity,
            StartDate = c.startDate,
            EndDate = c.endDate
        }).ToListAsync();
        return Ok(course);
    }

[HttpGet("{id:int}")]
public async Task<ActionResult<CourseDetailsDto>> GetCourseDetail(int id)
    {

        CourseDetailsDto? detailsDto = await _context.Courses.Where(i => i.id == id).Select(D => new CourseDetailsDto
        {
            Id = D.id,
            Title = D.Title,
            Description = D.Description,
            Instructor = D.instructor != null? new InstructorResponseDto{id = D.instructor.id, Name = D.instructor.Name, Email = D.instructor.Email, Specialization =D.instructor.Specialization}:null,
            Capacity = D.capacity,
            RegisteredStudentCount = D.enrollmentCourse.Count(e => e.Status == EnrollmentStatus.Active),
            StartDate = D.startDate,
            EndDate = D.endDate

        }).FirstOrDefaultAsync();

        if(detailsDto is null)
        {
            return NotFound();
        }
        return Ok(detailsDto);
    }

[Authorize]
[HttpPost]
public async Task<ActionResult<CourseResponseDto>> CreateCourse([FromBody] CreateCourseDto courseDto)
    {
        if(courseDto.InstructorId is not null){
        bool instructorFind = await _context.Instructors.AnyAsync(i => i.id == courseDto.InstructorId);
        if (!instructorFind)
        {
            return NotFound();
        }
        }
        if(courseDto.Capacity <= 0 || courseDto.Capacity > 45)
        {
            return BadRequest();
        }
        if(courseDto.EndDate <= courseDto.StartDate )
        {
            return BadRequest("");
        }
        Course course = new()
        {
            Title = courseDto.Title,
            Description = courseDto.Description,
            capacity = courseDto.Capacity,
            startDate = DateTime.SpecifyKind(courseDto.StartDate, DateTimeKind.Utc),
            endDate = DateTime.SpecifyKind(courseDto.EndDate, DateTimeKind.Utc),
            InstructorId = courseDto.InstructorId
        };
    

        _context.Courses.Add(course);
        await _context.SaveChangesAsync();

        CourseResponseDto responseDto = new()
        {
            id = course.id,
            Title = course.Title,
            Description = course.Description,
            Capacity = course.capacity,
            StartDate = course.startDate,
            EndDate = course.endDate,
            InstructorId = course.InstructorId
        };

        return CreatedAtAction(nameof(GetCourseDetail), new{id =responseDto.id}, responseDto);
    }

[Authorize]
[HttpPut("{id:int}")]

public async Task<IActionResult> UpdateCourse([FromBody] UpdateCourseDto update, int id)
    {
        if(update.InstructorId is not null){
        bool instructorFind = await _context.Instructors.AnyAsync(i => i.id == update.InstructorId);
        if (!instructorFind)
        {
            return NotFound();
        }
        }
    Course?  course = await _context.Courses.FindAsync(id);

    if(course is null)
        {
            return NotFound();
        }

        course.Title = update.Title;
        course.Description = update. Description;
        course.InstructorId = update.InstructorId;
        course.capacity = update.Capacity;
        course.startDate = DateTime.SpecifyKind(update.StartDate, DateTimeKind.Utc);
        course.endDate = DateTime.SpecifyKind(update.EndDate, DateTimeKind.Utc);

        await _context.SaveChangesAsync();
        return NoContent();

    }

[Authorize]
[HttpPut("{id:int}/instructor")]

public async Task<IActionResult> UpdateInstructorCourse([FromBody] AssignInstructorDto updateIn, int id)
    {
        
        bool instructorFind = await _context.Instructors.AnyAsync(i => i.id == updateIn.InstructorId);
        if (!instructorFind)
        {
            return NotFound();
        }
        Course? instructorCourse = await _context.Courses.FindAsync(id);

        if(instructorCourse is null)
        {
            return NotFound();
        }

        instructorCourse.InstructorId = updateIn.InstructorId;

        await _context.SaveChangesAsync();
        return NoContent();
    }


[Authorize]
[HttpDelete("{id:int}")]
public async Task<IActionResult> DeleteCourse(int id)
{
    Course? courseDelete = await _context.Courses.FindAsync(id);

    if (courseDelete is null)
    {
        return NotFound();
    }
    bool hasActiveEnrollments = await _context.Enrollment
    .AnyAsync(e => e.CourseId == id && e.Status == EnrollmentStatus.Active);

if (hasActiveEnrollments)
{
    return Conflict("This course cannot be deleted because it has active enrollments.");
}

var enrollments = await _context.Enrollment
    .Where(e => e.CourseId == id)
    .ToListAsync();

_context.Enrollment.RemoveRange(enrollments);
    _context.Courses.Remove(courseDelete);
    await _context.SaveChangesAsync();

    return NoContent();
}
    

}


