using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using TechExam.Models;
using TechExam.Models.DTO;
using TechExam.Models.Response;
using TechnicalExam.App_Utility.Data;

namespace TechExam.App_Utility.Data
{
    public class OrderUtils : DBInterface
    {

        private ErrorLogs _logger = new ErrorLogs();

        public void create(OrderDto dto, string identifier)
        {

            SqlParameterCollection _params = new SqlCommand().Parameters;
            _params.AddWithValue("@identifier", identifier);
            _params.AddWithValue("@ProductId", dto.ProductId);
            _params.AddWithValue("@Quantity", dto.Quantity);

            this.ExecuteRead("dbo.sp_orders", _params);
            if (!string.IsNullOrWhiteSpace(ErrorMessage))
            {
                _logger.createLogs($"ProductUtils | create | {JsonConvert.SerializeObject(dto) + " " + ErrorMessage}");
            }

        }

        internal List<OrderResponse> getAll(string identifier)
        {
            List<OrderResponse> result = new List<OrderResponse>();
            SqlParameterCollection _params = new SqlCommand().Parameters;
            _params.AddWithValue("@identifier", identifier);
            DataTable dt = this.ExecuteRead(@"dbo.sp_orders", _params);
            if (!string.IsNullOrWhiteSpace(ErrorMessage))
            {
                _logger.createLogs($"ProductUtils | getAll");
            }
            foreach (DataRow row in dt.Rows)
            {
                OrderResponse rd = new OrderResponse();
                rd.OrderId = Convert.ToInt64(row["OrderId"].ToString());
                rd.ProductId = Convert.ToInt64(row["ProductId"].ToString());
                rd.ProductName = row["ProductName"].ToString();
                rd.Cost = Convert.ToDecimal(row["Cost"].ToString());
                rd.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                rd.IsPaid = Convert.ToBoolean(row["IsPaid"].ToString());
                result.Add(rd);

            }
            return result;
        }

        public OrderResponse removeFromOrder(int orderId, string identifier)
        {
            SqlParameterCollection _params = new SqlCommand().Parameters;
            _params.AddWithValue("@identifier", identifier);
            _params.AddWithValue("@OrderId", orderId);
            DataTable dt = this.ExecuteRead(@"dbo.sp_orders", _params);
            OrderResponse rd = new OrderResponse();
            foreach (DataRow row in dt.Rows)
            {

                rd.OrderId = Convert.ToInt64(row["OrderId"].ToString());
                rd.ProductId = Convert.ToInt64(row["ProductId"].ToString());
                rd.ProductName = row["ProductName"].ToString();
                rd.Cost = Convert.ToDecimal(row["Cost"].ToString());
                rd.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                rd.IsPaid = Convert.ToBoolean(row["IsPaid"].ToString());

            }

            this.ExecuteScalar("dbo.sp_orders", _params);

            if (!string.IsNullOrWhiteSpace(ErrorMessage))
            {
                _logger.createLogs($"OrderUtils | removeFromOrder ");
            }

            return rd;

        }

        public void updateIsPaidById(string identifier)
        {

            SqlParameterCollection _params = new SqlCommand().Parameters;
            _params.AddWithValue("@identifier", identifier);
            this.ExecuteScalar("dbo.sp_orders", _params);
            if (!string.IsNullOrWhiteSpace(ErrorMessage))
            {
                _logger.createLogs($"OrderUtils | updateIsPaidById | {ErrorMessage}");
            }

        }

        public OrderResponse GetById(int orderId, string identifier)
        {
            SqlParameterCollection _params = new SqlCommand().Parameters;
            _params.AddWithValue("@identifier", identifier);
            _params.AddWithValue("@OrderId", orderId);
            DataTable dt = this.ExecuteRead(@"dbo.sp_orders", _params);
            OrderResponse obj = new OrderResponse();
            foreach (DataRow row in dt.Rows)
            {

                obj.OrderId = Convert.ToInt64(row["OrderId"].ToString());
                obj.ProductId = Convert.ToInt64(row["ProductId"].ToString());
                obj.ProductName = row["ProductName"].ToString();
                obj.Cost = Convert.ToDecimal(row["Cost"].ToString());
                obj.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                obj.IsPaid = Convert.ToBoolean(row["IsPaid"].ToString());

            }
            return obj;

        }
    }
}