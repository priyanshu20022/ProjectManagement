using Backend.Context;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Account.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly AppDbContext _projectContext;

        public ProjectController(AppDbContext projectContext)
        {
            _projectContext = projectContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var projects = await _projectContext.Projects.ToListAsync();
            return Ok(projects);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddProject([FromBody] Project projectObj)
        {
            if (projectObj == null)
                return BadRequest();

            await _projectContext.Projects.AddAsync(projectObj);
            await _projectContext.SaveChangesAsync();

            return Ok(new { Message = "Project added successfully!" });

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var deletePro = await _projectContext.Projects.FindAsync(id);
            if (deletePro == null)
                return StatusCode(500, new { Message = "Failed to delete project!" });

            _projectContext.Projects.Remove(deletePro);
            await _projectContext.SaveChangesAsync();
            return Ok(new { Message = "Project deleted successfully!" });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct([FromBody] Project projectObj)
        {
            if (projectObj == null)
                return BadRequest();
            var existingProject = await _projectContext.Projects.FindAsync(projectObj.Id);
            if (existingProject == null)
                return StatusCode(500, new { Message = "Failed to update Project!" });

            _projectContext.Entry(existingProject).CurrentValues.SetValues(projectObj);
            await _projectContext.SaveChangesAsync();
            return Ok(new { Message = "Project updated successfully!" });
        }
    }
}
