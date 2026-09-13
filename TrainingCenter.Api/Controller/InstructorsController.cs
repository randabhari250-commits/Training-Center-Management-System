using Microsoft.AspNetCore.Mvc;
using TRAININGCENTER.API.Data;
using TRAININGCENTER.API.Model;
using TRAININGCENTER.API.DTOs.Instructors;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace TRAININGCENTER.API.Controller;

[ApiController]
[Route("api/[Controller]")]

public class InstructorsController: ControllerBase
{
    public readonly TrainingCenterDbContext _Context;
    public InstructorsController(TrainingCenterDbContext Context)
    {
        _Context = Context;
    }




[HttpGet]
        public async Task<ActionResult<List<InstructorResponseDto>>> GetInstructor(){
            List<InstructorResponseDto> Instructor = await _Context.Instructors.Select(IN => new InstructorResponseDto{
                id =IN.id,
                Name = IN.Name,
                Email = IN.Email,
                Specialization = IN.Specialization
            }).ToListAsync();
            return Ok(Instructor);
} 

[HttpGet("{id:int}")]
public async Task<ActionResult<InstructorResponseDto>> GetInstructor(int id)
    {
        InstructorResponseDto? instructor = await _Context.Instructors.Where(IN => IN.id ==id).Select(I => new InstructorResponseDto
        {
            id =I.id,
            Name = I.Name,
            Email =I.Email,
            Specialization = I.Specialization
        } ).FirstOrDefaultAsync();
        
        if (instructor is null)
        {
            return NotFound();
        }

        return Ok(instructor);

    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<InstructorResponseDto>> CreateInstructor([FromBody] CreateInstuctorDto instuctorDto)
    {
        Instructor Instructor = new()
        {
            Name = instuctorDto.Name,
            Email = instuctorDto.Email,
            Specialization = instuctorDto.Specialization
        };

        _Context.Instructors.Add(Instructor);
        await _Context.SaveChangesAsync();

        InstructorResponseDto dto = new()
        {
            id =Instructor.id,
            Name = Instructor.Name,
            Email =Instructor.Email,
            Specialization = Instructor.Specialization 
        };

        return CreatedAtAction(nameof(GetInstructor), new{id= dto.id}, dto );


    }

[Authorize]
[HttpPut("{id:int}")]

public async Task<IActionResult> UpdateInstructor([FromBody] UpdateInstructorDto updateIN, int id)
    {
        Instructor? instructors = await _Context.Instructors.FindAsync(id);

        if(instructors is null)
        {
            return NotFound();
        }

        instructors.Name = updateIN.Name;
        instructors.Email = updateIN.Email;
        instructors.Specialization = updateIN.Specialization;

        await _Context.SaveChangesAsync();
        return NoContent();


    }

[Authorize]
[HttpDelete("{id:int}")]
public async Task<IActionResult> DeleteInstructor(int id)
{
    Instructor? instructorDelete = await _Context.Instructors.FindAsync(id);

    if (instructorDelete is null)
    {
        return NotFound();
    }

    bool hasCourses = await _Context.Courses
        .AnyAsync(c => c.InstructorId == id);

    if (hasCourses)
    {
        return Conflict("This instructor cannot be deleted because they are assigned to courses.");
    }

    _Context.Instructors.Remove(instructorDelete);
    await _Context.SaveChangesAsync();

    return NoContent();
}
}