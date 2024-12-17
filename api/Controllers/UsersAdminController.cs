using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;

        public AdminController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();

            var userDtos = new List<UserDto>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                var userDto = new UserDto
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    Role = roles.FirstOrDefault() ?? "User"
                };

                userDtos.Add(userDto);
            }

            return Ok(userDtos);
        }

        [HttpGet("users/{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound("User not found!");
            }

            var roles = await _userManager.GetRolesAsync(user);

            var userDto = new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Role = roles.FirstOrDefault() ?? "User"
            };

            return Ok(userDto);
        }

        [HttpDelete("users/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return NotFound("User not found!");

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded) return BadRequest(result.Errors);

            return NoContent();
        }

        [HttpPut("users/{id}")]
        public async Task<IActionResult> EditUser(string id, [FromBody] EditUserDto editUserDto)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return NotFound("User not found!");

            user.UserName = editUserDto.UserName ?? user.UserName;
            user.Email = editUserDto.Email ?? user.Email;

            if (!string.IsNullOrEmpty(editUserDto.Role))
            {
                var currentRoles = await _userManager.GetRolesAsync(user);

                await _userManager.RemoveFromRolesAsync(user, currentRoles);

                var result = await _userManager.AddToRoleAsync(user, editUserDto.Role);
                if (!result.Succeeded)
                {
                    return BadRequest($"Error adding role: {editUserDto.Role}");
                }
            }

            var resultUpdate = await _userManager.UpdateAsync(user);
            if (!resultUpdate.Succeeded) return BadRequest(resultUpdate.Errors);

            return Ok(new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Role = editUserDto.Role ?? "User"
            });
        }
    }
}
