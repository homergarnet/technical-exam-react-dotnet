using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TechExam.Models.DTO
{
    public class OrderDto
    {
        public double ProductId { get; set; }
        public int Quantity { get; set; }
        public long OrderId { get; set; }
    }
}