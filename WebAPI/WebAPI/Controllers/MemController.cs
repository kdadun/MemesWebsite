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
    public class MemController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();
        [HttpPost]
        [Route("api/Memes/AddMemes")]
        public IHttpActionResult CreateMemes([FromBody] MemHashTagsViewModel createMem)
        {
            if (createMem != null)
            {
                Memes mem = new Memes()
                {
                    MemName = createMem.MemName,
                    Image = createMem.Image,
                    UserId = createMem.UserId
                };
                db.Memes.Add(mem);
                db.SaveChanges();
                foreach (var item in createMem.HashTags)
                {
                    var hashTag = new HashTag()
                    {
                        Name = item,
                        MemesId = mem.Id   
                    };
                    db.HashTags.Add(hashTag);
                    db.SaveChanges();
                }
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
        [Route("api/Memes/allMemes")]
        public IEnumerable<Memes> GetMemes()
        {
            return db.Memes.ToList();
        }

        [Route("api/Memes/GetMemById/{id}")]
        [ResponseType(typeof(Memes))]
        public IHttpActionResult GetProduct(int id)
        {
            Memes mem = db.Memes.Find(id);
            if (mem == null)
            {
                return NotFound();
            }
            return Ok(mem);
        }
    }
}
