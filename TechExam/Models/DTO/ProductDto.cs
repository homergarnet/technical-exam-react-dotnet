using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TechExam.Models.DTO
{
    public class ProductDto
    {
        public double ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal Cost { get; set; }
        public int Quantity { get; set; }

    }
}