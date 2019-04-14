using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class MemHashTagsViewModel
    {
        public int MemId { get; set; }
        public string MemName { get; set; }
        public string UserId { get; set; }
        public string Image { get; set; }
        public string[] HashTags { get; set; }
    }
}