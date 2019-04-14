using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class AccountController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();
        [Route("api/User/Register")]
        [HttpPost]
        [AllowAnonymous]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public IdentityResult Register([FromBody] AccountModel model)
        {
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var manager = new UserManager<ApplicationUser>(userStore);
            var user = new ApplicationUser() { UserName = model.UserName, Email = model.Email };
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Address = " ";
            user.Telephone = " ";
            user.Image = " ";
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 3
            };
            IdentityResult result = manager.Create(user, model.Password);
            manager.AddToRoles(user.Id, "user");
            return result;
        }

        [HttpPost]
        [Route("api/ChangeProfile")]
        public async Task<IHttpActionResult> ChangeProfile([FromBody]AccountModel model)
        {
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var manager = new UserManager<ApplicationUser>(userStore);
            var user = await manager.FindByNameAsync(model.UserName);
            if (user != null)
            {
                user.FirstName = model.FirstName;
                user.LastName = model.LastName;
                user.Email = model.Email;
                user.Telephone = model.Telephone;
                user.Address = model.Address;
                IdentityResult result = await manager.UpdateAsync(user);
                return Ok(model);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpPost]
        [Route("api/ChangeImage")]
        public async Task<IHttpActionResult> ChangeImage([FromBody]AccountModel model)
        {
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var manager = new UserManager<ApplicationUser>(userStore);
            var user = await manager.FindByNameAsync(model.UserName);
            if (user != null)
            {
                if (model.Image != null)
                {
                    user.Image = model.Image;
                }
                IdentityResult result = await manager.UpdateAsync(user);
                return Ok(model);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet]
        [Route("api/GetUserProfile")]
        public IHttpActionResult GetUserProfile()
        {
            var name = (ClaimsIdentity)User.Identity;
            var data = name.Claims.First().Value;
            if (data != null)
            {
                var model = db.Users.FirstOrDefault(x => x.UserName == data);
                AccountModel profile = new AccountModel()
                {
                    UserName = model.UserName,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Email = model.Email,
                    Telephone = model.Telephone,
                    Address = model.Address,
                    Image = model.Image
                };
                return Ok(profile);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
