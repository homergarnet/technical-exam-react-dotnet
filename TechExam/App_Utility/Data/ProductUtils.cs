using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using TechExam.Models;
using TechExam.Models.DTO;

namespace TechnicalExam.App_Utility.Data
{
    public class ProductUtils : DBInterface
    {

        private ErrorLogs _logger = new ErrorLogs();

        public void create(ProductDto dto, string identifier)
        {

            SqlParameterCollection _params = new SqlCommand().Parameters;
            _params.AddWithValue("@identifier", identifier);
            _params.AddWithValue("@ProductName", dto.ProductName);
            _params.AddWithValue("@Cost", dto.Cost);
            _params.AddWithValue("@Quantity", dto.Quantity);

            this.ExecuteRead("dbo.sp_product", _params);
            if (!string.IsNullOrWhiteSpace(ErrorMessage))
            {
                _logger.createLogs($"ProductUtils | save | {JsonConvert.SerializeObject(dto) + " " + ErrorMessage}");
            }

        }

        public List<ProductDto> getAll(string identifier)
        {
            List<ProductDto> result = new List<ProductDto>();
            SqlParameterCollection _params = new SqlCommand().Parameters;
            _params.AddWithValue("@identifier", identifier);
            DataTable dt = this.ExecuteRead(@"dbo.sp_product", _params);
            foreach (DataRow row in dt.Rows)
            {
                ProductDto rd = new ProductDto();

                rd.ProductId = Convert.ToInt64(row["ProductId"].ToString());
                rd.ProductName = row["ProductName"].ToString();
                rd.Cost = Convert.ToDecimal(row["Cost"].ToString());
                rd.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                result.Add(rd);

            }
            return result;
        }

        public ProductDto GetById(int productId, string identifier)
        {
            SqlParameterCollection _params = new SqlCommand().Parameters;
            _params.AddWithValue("@identifier", identifier);
            _params.AddWithValue("@ProductId", productId);

            DataTable dt = this.ExecuteRead(@"dbo.sp_product", _params);

            ProductDto obj = new ProductDto();
            foreach (DataRow row in dt.Rows)
            {

                obj.ProductId = Convert.ToInt64(row["ProductId"].ToString());
                obj.ProductName = row["ProductName"].ToString();
                obj.Cost = Convert.ToDecimal(row["Cost"].ToString());
                obj.Quantity = Convert.ToInt32(row["Quantity"].ToString());

            }
            return obj;

        }

        public List<ProductDto> getBySearch(string search, string identifier)
        {

            decimal decimalOutput;
            int intOutput;
            List<ProductDto> result = new List<ProductDto>();
            SqlParameterCollection _params = new SqlCommand().Parameters;
            _params.AddWithValue("@identifier", identifier);
            
            _params.AddWithValue("@ProductName", search);
            
            if (decimal.TryParse(search, out decimalOutput))
            {
                _params.AddWithValue("@Cost", decimalOutput);
            }

            if (int.TryParse(search, out intOutput))
            {
                _params.AddWithValue("@Quantity", intOutput);
                _params.AddWithValue("@ProductId", intOutput);
            }
            
            
            DataTable dt = this.ExecuteRead(@"dbo.sp_product", _params);
            foreach (DataRow row in dt.Rows)
            {
                ProductDto rd = new ProductDto();
                rd.ProductId = Convert.ToInt64(row["ProductId"].ToString());
                rd.ProductName = row["ProductName"].ToString();
                rd.Cost = Convert.ToDecimal(row["Cost"].ToString());
                rd.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                result.Add(rd);

            }
            return result;
        }

        public void updateStatus(int productId, ProductDto obj, string identifier)
        {

            SqlParameterCollection _params = new SqlCommand().Parameters;
            _params.AddWithValue("@identifier", identifier);
            _params.AddWithValue("@ProductId", productId);
            _params.AddWithValue("@ProductName", obj.ProductName);
            _params.AddWithValue("@Cost", obj.Cost);
            _params.AddWithValue("@Quantity", obj.Quantity);


            this.ExecuteScalar("dbo.sp_product", _params);
            var dto = new { ProductId = productId };
            if (!string.IsNullOrWhiteSpace(ErrorMessage))
            {
                _logger.createLogs($"DeliveryUtils | update | {JsonConvert.SerializeObject(dto) + " " + ErrorMessage}");
            }
        }

        public void softDelete(int productId, string identifier)
        {

            SqlParameterCollection _params = new SqlCommand().Parameters;
            _params.AddWithValue("@identifier", identifier);
            _params.AddWithValue("@ProductId", productId);

            this.ExecuteRead("dbo.sp_product", _params);
            if (!string.IsNullOrWhiteSpace(ErrorMessage))
            {
                _logger.createLogs($"ProductUtils | delete | {productId + " " + ErrorMessage}");
            }

        }
    }
}