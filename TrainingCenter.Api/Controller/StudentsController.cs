using Microsoft.AspNetCore.Mvc;
using TRAININGCENTER.API.Data;
using TRAININGCENTER.API.Model;
using Microsoft.EntityFrameworkCore;
using TRAININGCENTER.API.DTOs.Students;
using TrainingCenter.Api.DTOs.Students;
using Microsoft.AspNetCore.Authorization;
namespace TRAININGCENTER.API.Controller;






[ApiController]
[Route("api/[Controller]")]

public class StudentsController : ControllerBase
{
    private readonly TrainingCenterDbContext _context;

    public StudentsController (TrainingCenterDbContext context)
    {
        _context = context;
    }

[HttpGet]
    public async Task<ActionResult<List<StudentResponseDto>>> GetStudents([FromQuery] string? name, [FromQuery] string? major){
        IQueryable<Student> studentsQuery = _context.Students;
        if (!string.IsNullOrWhiteSpace(name))
        {
            string  searchName = name.Trim().ToLower();
            studentsQuery = studentsQuery.Where(s => s.name.ToLower().Contains(searchName));
        }
        if (!string.IsNullOrWhiteSpace(major))
        {
            string searchMajor = major.Trim().ToLower();
            studentsQuery = studentsQuery.Where(m => m.major.ToLower().Contains(searchMajor));

        }
        
        List<StudentResponseDto> student = await studentsQuery.OrderBy(s => s.name).Select(s => new StudentResponseDto
        {
            Id = s.id,
            Name = s.name,
            Email = s.Email,
            Age = s.age,
            Phone = s.phone,
            Major = s.major
        }).ToListAsync();
       return Ok(student);
    }

[HttpGet("{id:int}")]

public async Task<ActionResult<StudentResponseDto>> GetStudent(int id)
{
    StudentResponseDto? student = await _context.Students.Where(s => s.id == id).Select(S => new StudentResponseDto
        {
            Id = S.id,
            Name = S.name,
            Email = S.Email,
            Age = S.age,
            Phone = S.phone,
            Major = S.major
        }).FirstOrDefaultAsync();

        if(student is null)
        {
            return NotFound();

        }
        return Ok(student);


    }
    
[Authorize]
[HttpPost]
public async Task<ActionResult<StudentResponseDto>> CreateStudent ([FromBody] CreateStudentDto student)
    {
        Student students = new()
        {
            name = student.name,
            Email = student.Email,
            age = student.age,
            phone = student.phone,
            major = student.major
        };
        _context.Students.Add(students);
        await _context.SaveChangesAsync();

        StudentResponseDto studentDto = new()
        {
            Id = students.id,
            Name = students.name,
            Email = students.Email,
            Age = students.age,
            Phone = students.phone,
            Major = students.major
        };

        return CreatedAtAction(nameof(GetStudent), new{id = studentDto.Id}, studentDto );
    }

[Authorize]
[HttpPut("{id:int}")]

public async Task<IActionResult> updateStudent([FromBody] UpdateStudentDto update, int id)
    {
        Student? students = await _context.Students.FindAsync(id);

        if (students is null)
        {
            return NotFound();
        }

        students.name = update.name;
        students.Email = update.Email;
        students.age = update.age;
        students.phone = update.phone;
        students.major = update.major;

        await _context.SaveChangesAsync();

        return NoContent();
    }


[Authorize]
[HttpDelete("{id:int}")]
public async Task<IActionResult> DeleteStudent(int id)
{
    Student? studentsDelet = await _context.Students.FindAsync(id);

    if (studentsDelet is null)
    {
        return NotFound();
    }

    bool hasEnrollments = await _context.Enrollment
        .AnyAsync(e => e.StudentId == id);

    if (hasEnrollments)
    {
        return Conflict("This student cannot be deleted because they have enrollments.");
    }

    _context.Students.Remove(studentsDelet);
    await _context.SaveChangesAsync();

    return NoContent();
}
}