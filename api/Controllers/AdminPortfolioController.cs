using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models;
using api.Dtos.Stock;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Dtos.Comment;
using api.DTos.Portfolio;

namespace api.Controllers
{
    [Route("api/admin/portfolio")]
    [ApiController]
    [Authorize]
    public class AdminPortfolioController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IPortfolioRepository _portfolioRepo;
        private readonly IStockRepository _stockRepo;

        public AdminPortfolioController(
            UserManager<AppUser> userManager,
            IPortfolioRepository portfolioRepo,
            IStockRepository stockRepo)
        {
            _userManager = userManager;
            _portfolioRepo = portfolioRepo;
            _stockRepo = stockRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsersWithPortfolios()
        {
            var users = await _userManager.Users.ToListAsync();
            var userPortfolios = new List<UserPortfolioDto>();

            foreach (var user in users)
            {
                var portfolio = await _portfolioRepo.GetUserPortfolio(user);
                var userPortfolioDto = new UserPortfolioDto
                {
                    Username = user.UserName,
                    Portfolio = portfolio.Select(stock => new StockDto
                    {
                        Id = stock.Id,
                        Symbol = stock.Symbol,
                        CompanyName = stock.CompanyName
                    }).ToList()
                };

                userPortfolios.Add(userPortfolioDto);
            }

            return Ok(userPortfolios);
        }

        [HttpGet("most-used-stocks")]
        public async Task<IActionResult> GetMostUsedStocks()
        {
            var users = await _userManager.Users.ToListAsync();
            var stockUsageCount = new Dictionary<int, int>();

            foreach (var user in users)
            {
                var portfolio = await _portfolioRepo.GetUserPortfolio(user);

                foreach (var stock in portfolio)
                {
                    if (stockUsageCount.ContainsKey(stock.Id))
                    {
                        stockUsageCount[stock.Id]++;
                    }
                    else
                    {
                        stockUsageCount[stock.Id] = 1;
                    }
                }
            }

            var mostUsedStockIds = stockUsageCount
                .OrderByDescending(kv => kv.Value)
                .Take(5)
                .Select(kv => kv.Key)
                .ToList();

            var mostUsedStocks = new List<StockDto>();
            foreach (var stockId in mostUsedStockIds)
            {
                var stock = await _stockRepo.GetByIdAsync(stockId);
                if (stock != null)
                {
                    mostUsedStocks.Add(new StockDto
                    {
                        Id = stock.Id,
                        Symbol = stock.Symbol,
                        CompanyName = stock.CompanyName
                    });
                }
            }

            return Ok(mostUsedStocks);
        }

        [HttpGet("users-with-most-stocks")]
        public async Task<IActionResult> GetUsersWithMostStocks()
        {
            var users = await _userManager.Users.ToListAsync();
            var userPortfolios = new List<UserPortfolioDto>();

            foreach (var user in users)
            {
                var portfolio = await _portfolioRepo.GetUserPortfolio(user);
                var userPortfolioDto = new UserPortfolioDto
                {
                    Username = user.UserName,
                    Portfolio = portfolio.Select(stock => new StockDto
                    {
                        Id = stock.Id,
                        Symbol = stock.Symbol,
                        CompanyName = stock.CompanyName
                    }).ToList()
                };

                userPortfolios.Add(userPortfolioDto);
            }

            var sortedUserPortfolios = userPortfolios
                .OrderByDescending(up => up.Portfolio.Count)
                .Take(5)
                .ToList();

            return Ok(sortedUserPortfolios);
        }

    }
}
