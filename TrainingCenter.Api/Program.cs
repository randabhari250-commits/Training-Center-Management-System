using Microsoft.EntityFrameworkCore;
using TRAININGCENTER.API.Data;
using System.Text.Json.Serialization;
using TRAININGCENTER.API.Service;
using Microsoft.AspNetCore.Identity;
using TrainingCenter.Api.Service;
using TRAININGCENTER.API.Model;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(Options =>
{ Options.AddPolicy("AngularPolicy", policy =>
{policy.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod();});
});

string connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
    throw new InvalidOperationException("Connection string is not found");

builder.Services.AddDbContext<TrainingCenterDbContext>(options => 
    options.UseNpgsql(connectionString));

builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<EnrollmentService>();
builder.Services.AddControllers().AddJsonOptions(option =>{option.JsonSerializerOptions.PropertyNamingPolicy = null;
option.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());});

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    builder.Configuration["Jwt:Key"]!)
            )
        };
    });


builder.Services.AddAuthorization();


var app = builder.Build();
app.UseCors("AngularPolicy");

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();