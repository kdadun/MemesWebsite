using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Memes
    {
        public int Id { get; set; }
        public string MemName { get; set; }
        public string UserId { get; set; }
        public string Image { get; set; }
        public virtual ICollection<HashTag> HashTags { get; set; }
        public virtual ICollection<Rating> Ratings { get; set; }

    }
}