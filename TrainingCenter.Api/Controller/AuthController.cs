using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TRAININGCENTER.API.Data;
using TRAININGCENTER.API.Model;
using TRAININGCENTER.API.DTOs.Auth;
using  Microsoft.EntityFrameworkCore;
using TrainingCenter.Api.Service;
using Microsoft.AspNetCore.Authorization;


namespace TRAININGCENTER.API.Controller;

[ApiController]
[Route("api/[Controller]")]

public class AuthController : ControllerBase
{
        public readonly TrainingCenterDbContext _context;
        public readonly AuthService _authService;

        public AuthController(TrainingCenterDbContext context, AuthService authService)
    {
        _context = context;
        _authService = authService;
    }
[HttpPost("register")]

public async Task<IResult> Register([FromBody] RegisterDto register)
    {
        
        return await _authService.RegisterUser(register);
    }

[HttpPost("login")]
public async Task<IResult> LoginUser([FromBody] LoginDto loginDto)
    {
        return await _authService.LoginUser(loginDto);
    }

}