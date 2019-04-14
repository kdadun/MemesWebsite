using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class AccountModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [StringLength(int.MaxValue)]
        public string Image { get; set; }
        public string Telephone { get; set; }
        public string Address { get; set; }
        public string LoggedOn { get; set; }
        public string Roles { get; set; }
    }
}