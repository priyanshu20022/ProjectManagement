using AutoMapper;
using Backend.Context;
using Backend.Migrations;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AppDbContext _authContext;
        public AccountController(AppDbContext authContext)
        {
            _authContext = authContext;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] AccountEntity userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }
            var user = await _authContext.Users
                .FirstOrDefaultAsync(x => x.Email == userObj.Email && x.Password == userObj.Password);
            if (user != null)
            {
                user.Token = CreateJwt(user);
            }
            if (user == null)
                return NotFound(new { Message = "User not found!" });
            return Ok(new
            {
                Token = user.Token,
                Message = "Login Success"
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> AddUser([FromBody] AccountEntity userObj)
        {
            if (userObj == null)
                return BadRequest();

            //check email
            var result = await _authContext.Users.AnyAsync(x => x.Email == userObj.Email);
            if (result)
            {
                return BadRequest(new { Message = "Email Already Exist!" });
            }

            // Call the business layer to add the user
            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
           
            return Ok(new { Message = "User added successfully!" });
        }

        private string CreateJwt(AccountEntity user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysceret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name,$"{user.Name}"),
                new Claim("UserId", user.Id.ToString())
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            //Console.log
            return jwtTokenHandler.WriteToken(token);
        }

    }
}
