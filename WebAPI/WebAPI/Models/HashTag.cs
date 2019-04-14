using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class HashTag
    {
        public int Id { get; set; }
        [ForeignKey("Memes")]
        public int MemesId { get; set; }
        public string Name { get; set; }
        public virtual Memes Memes { get; set; }
}
}