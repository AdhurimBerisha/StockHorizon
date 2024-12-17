using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comment;
using api.Models;
using api.Interfaces;
using api.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using api.Helpers;
using api.Mappers;

namespace api.Controllers
{
    [Route("api/admin/comments")]
    [ApiController]
    public class CommentAdminController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;
        private readonly IStockRepository _stockRepo;
        private readonly UserManager<AppUser> _userManager;
        private readonly IFMPService _fmpService;

        public CommentAdminController(ICommentRepository commentRepo,
                                      IStockRepository stockRepo,
                                      UserManager<AppUser> userManager,
                                      IFMPService fmpService)
        {
            _commentRepo = commentRepo;
            _stockRepo = stockRepo;
            _userManager = userManager;
            _fmpService = fmpService;
        }

        // Get all comments
        [HttpGet]
        public async Task<IActionResult> GetComments([FromQuery] CommentQueryObject queryObject)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var comments = await _commentRepo.GetAllAsync(queryObject);

            var commentDto = comments.Select(s => s.ToCommentDto());

            return Ok(commentDto);
        }

        // Get comment by ID
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetCommentById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var comment = await _commentRepo.GetByIdAsync(id);

            if (comment == null)
            {
                return NotFound("Comment not found!");
            }

            return Ok(comment.ToCommentDto());
        }

        // Create comment for a stock symbol
        [HttpPost]
        [Route("{symbol:alpha}")]
        public async Task<IActionResult> Create([FromRoute] string symbol, [FromBody] CreateCommentDto commentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Find stock by symbol
            var stock = await _stockRepo.GetBySymbolAsync(symbol);
            if (stock == null)
            {
                stock = await _fmpService.FindStockBySymbolAsync(symbol);
                if (stock == null)
                {
                    return BadRequest("Stock does not exist");
                }
                else
                {
                    await _stockRepo.CreateAsync(stock);
                }
            }

            // Get the current user using the same logic as in CommentController
            var username = User.GetUsername(); // Use the same extension method as in CommentController
            if (username == null)
            {
                return Unauthorized("User is not authenticated.");
            }

            var appUser = await _userManager.FindByNameAsync(username);

            // Create the comment
            var commentModel = new Comment
            {
                Title = commentDto.Title,
                Content = commentDto.Content,
                StockId = stock.Id,
                AppUserId = appUser.Id
            };

            // Add the comment to the database
            await _commentRepo.CreateAsync(commentModel);

            // Return the created comment
            return CreatedAtAction(nameof(GetCommentById), new { id = commentModel.Id }, commentModel.ToCommentDto());
        }

        // Update comment by ID
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateComment([FromRoute] int id, [FromBody] UpdateCommentRequestDto updateCommentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Fetch the existing comment
            var comment = await _commentRepo.GetByIdAsync(id);

            if (comment == null)
            {
                return NotFound("Comment not found!");
            }

            // Update the comment properties
            comment.Title = updateCommentDto.Title;
            comment.Content = updateCommentDto.Content;

            // Save the updated comment to the database
            var updatedComment = await _commentRepo.UpdateAsync(id, comment);

            if (updatedComment == null)
            {
                return NotFound("Failed to update comment.");
            }

            return Ok(updatedComment.ToCommentDto());
        }

        // Delete comment by ID
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteComment([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var commentModel = await _commentRepo.DeleteAsync(id);

            if (commentModel == null)
            {
                return NotFound("Comment does not exist");
            }

            return NoContent();
        }
    }
}
