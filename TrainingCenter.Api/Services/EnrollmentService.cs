using Microsoft.EntityFrameworkCore;
using TRAININGCENTER.API.Model;
using TRAININGCENTER.API.DTOs;
using TRAININGCENTER.API.DTOs.Enrollments;
using TRAININGCENTER.API.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using TRAININGCENTER.API.Controller;
using Mono.TextTemplating;

namespace TRAININGCENTER.API.Service;

public class EnrollmentService
{
    public readonly TrainingCenterDbContext _context;
    public EnrollmentService(TrainingCenterDbContext context)
    {
        _context = context;
    }
     

    
    public async Task<IResult> CreateEnrollment(int StudentId, int CourseId)
    {
        bool studentExists = await _context.Students.AnyAsync(i => i.id == StudentId);

        if (!studentExists)
        {
            return TypedResults.NotFound();
        }

        var courseExists = await _context.Courses.SingleOrDefaultAsync(cId => cId.id == CourseId);
        if (courseExists is null)
        {
            return TypedResults.NotFound();
        }

        bool enrollmentExists = await _context.Enrollment.AnyAsync(e => e.CourseId == CourseId && e.StudentId == StudentId && e.Status == EnrollmentStatus.Active);

        if(enrollmentExists == true)
        {
            return TypedResults.Conflict("The student already enrolled in this Course");
        }

        int regristeredCount = await _context.Enrollment.CountAsync(rc => rc.CourseId == CourseId && rc.Status == EnrollmentStatus.Active);

        if (regristeredCount >= courseExists.capacity)
        {
            return TypedResults.Conflict("This Course is Full");
        }

        Enrollment newEnrollment = new()
        {
            StudentId = StudentId,
            CourseId = CourseId,
            EnrollmentDate = DateTime.UtcNow,
            Status = EnrollmentStatus.Active
        };
        _context.Enrollment.Add(newEnrollment);

        await _context.SaveChangesAsync();

        return TypedResults.Ok("Create Enrollment is Done");
        
    }

    public async Task<IResult> CancelEnrollment(int EnrollmentId)
    {
        var enrollment = await _context.Enrollment.SingleOrDefaultAsync(cancel => cancel.Id == EnrollmentId );
        
        if(enrollment is null)
        {
            return TypedResults.NotFound();
        }

        if(enrollment.Status == EnrollmentStatus.Cancelled)
        {
            return TypedResults.Conflict("This Enrollment is already Cancelled");
        }
        enrollment.Status = EnrollmentStatus.Cancelled;
        await _context.SaveChangesAsync();

        return TypedResults.Ok();
    }

}