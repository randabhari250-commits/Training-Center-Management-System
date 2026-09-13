using Microsoft.EntityFrameworkCore;
using TRAININGCENTER.API.Model;
using TRAININGCENTER.API.DTOs;
namespace TRAININGCENTER.API.Data;

public class TrainingCenterDbContext: DbContext
{
    public TrainingCenterDbContext(DbContextOptions<TrainingCenterDbContext> options) : base(options)
        {
        }


        public DbSet<Student> Students => Set<Student>();
        public DbSet<Course> Courses => Set<Course>();
        public DbSet<Instructor> Instructors => Set<Instructor>();
        public DbSet<Enrollment> Enrollment => Set<Enrollment>();
        public DbSet<User> User =>Set<User>();



protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);


        modelBuilder.Entity<Course>().HasOne(c => c.instructor).WithMany(i => i.courses)
        .HasForeignKey(C => C.InstructorId).OnDelete(DeleteBehavior.Restrict);
        
        modelBuilder.Entity<Enrollment>().HasOne(s => s.Student).WithMany(s=> s.enrollment)
        .HasForeignKey(e => e.StudentId).OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Enrollment>().HasOne(c => c.Course).WithMany(c => c.enrollmentCourse)
        .HasForeignKey( c => c.CourseId).OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Enrollment>().HasIndex(e => new
        {
        e.StudentId,
        e.CourseId
        }).IsUnique();
    }

}