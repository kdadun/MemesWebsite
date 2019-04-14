using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class RatingController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();

        [HttpPost]
        [Route("api/Memes/AddComment")]
        public IHttpActionResult rateProduct(Rating rating)
        {
            if (rating != null)
            {
                Rating rate = new Rating()
                {
                    MemId = rating.MemId,
                    Rate = rating.Rate,
                    UserId = rating.UserId,
                    Username = rating.Username,
                    Comment = rating.Comment,
                    DateCreated = Convert.ToDateTime(DateTime.Now.ToShortDateString())
                };
                db.Ratings.Add(rate);
                db.SaveChanges();
                return Ok();
            }
            else
            {
                return NotFound();
            }

        }
        [HttpGet]
        [Route("api/Memes/GetComments")]
        public IEnumerable<Rating> getComments()
        {
            return db.Ratings.ToList();
        }
    }
}
