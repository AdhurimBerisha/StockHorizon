using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTos.Account
{
    public class NewUserDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }
}