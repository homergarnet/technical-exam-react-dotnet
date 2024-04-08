using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TechExam.Models.Response
{
    public class OrderResponse
    {
        public double OrderId { get; set; }
        public double ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal Cost { get; set; }
        public int Quantity { get; set; }
        public bool IsPaid { get; set; }

    }
}