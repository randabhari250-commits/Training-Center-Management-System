using Microsoft.EntityFrameworkCore;
using TRAININGCENTER.API.Model;
using TRAININGCENTER.API.DTOs;
using TRAININGCENTER.API.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Mono.TextTemplating;
using TRAININGCENTER.API.DTOs.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace TrainingCenter.Api.Service;

public class AuthService
{
    public readonly TrainingCenterDbContext _context;
    public readonly IPasswordHasher<User> _passwordHasher;
    public readonly IConfiguration _configuration;
    public AuthService(TrainingCenterDbContext context, IPasswordHasher<User> passwordHasher, IConfiguration configuration)
    {
        _context = context;
        _passwordHasher =  passwordHasher;
        _configuration = configuration;
    }

    public async Task<IResult> RegisterUser(RegisterDto registerDto)
    {
        string email = registerDto.Email.Trim().ToLower();
        bool userExists = await _context.User.AnyAsync(e => e.Email == email);
        if (userExists)
        {
            return TypedResults.BadRequest("This Email is already Exists");
        }

    User user = new()
    {
        Email = email
    };

    user.PasswordHash = _passwordHasher.HashPassword(user, registerDto.password);
    _context.User.Add(user);
    await _context.SaveChangesAsync();
    return TypedResults.Created($"/users/{user.Id}", new { Message = "User Registered Successfully" });

    }


public async Task<IResult> LoginUser(LoginDto login)
    {
        string email = login.Email.Trim().ToLower();
         User? user =await  _context.User.FirstOrDefaultAsync(e => e.Email == email);
        if(user== null)
        {
            return Results.Unauthorized();
        }


       
        PasswordVerificationResult password = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, login.password);
        if(password == PasswordVerificationResult.Failed)
        {
            return TypedResults.Unauthorized();
        }

        int expirationMinutes = _configuration.GetValue<int>("Jwt:ExpirationInMinutes");
        DateTime expiration = DateTime.UtcNow.AddMinutes(expirationMinutes);
        string token = CreateToken(user, expiration);


       AuthResponseDto responseDto = new()
       {
           Token = token,
           Expiration = expiration,
            Email = email,
       };

       return TypedResults.Ok(responseDto);
    }


private string CreateToken(User user,DateTime Expiration)
    {
        string Key =_configuration["Jwt:Key"]!;
        string Issuer = _configuration["Jwt:Issuer"]!;
        string Audience = _configuration["Jwt:Audience"]!;

        List<Claim> claims = new()
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email)
        };
        SymmetricSecurityKey securityKey = new ( Encoding.UTF8.GetBytes(Key));
        SigningCredentials signing = new(securityKey, SecurityAlgorithms.HmacSha256);

        JwtSecurityToken token = new(
            issuer : Issuer,
            audience : Audience,
            claims : claims,
            expires : Expiration,
            signingCredentials : signing
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}