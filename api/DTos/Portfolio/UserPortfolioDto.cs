using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Stock;

namespace api.DTos.Portfolio
{
    public class UserPortfolioDto
    {
        public string Username { get; set; }
        public List<StockDto> Portfolio { get; set; }
    }
}