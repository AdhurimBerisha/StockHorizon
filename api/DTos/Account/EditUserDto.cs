using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Account
{
    public class EditUserDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}
