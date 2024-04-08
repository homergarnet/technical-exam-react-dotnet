

using System;
using System.Collections.Generic;
using System.Web.Http;
using TechnicalExam.App_Utility.Data;


using System.Linq;

using Newtonsoft.Json;
using TechExam.Models.DTO;

namespace TechnicalExam.Controllers
{
    [RoutePrefix("api/product")]
    public class ProductController : ApiController
    {
        // GET: Product
        private ErrorLogs _logger = new ErrorLogs();
        private ProductUtils ProductUtils = new ProductUtils();

        [Route("create")]
        [HttpPost]
        public IHttpActionResult CreateProduct(ProductDto dto)
        {
            try
            {

                ProductUtils.create(dto, "create");
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.createLogs(ex);
                return InternalServerError(ex);
            }
        }

        [Route("get-all")]
        [HttpGet]
        public IHttpActionResult GetAllProduct()
        {
            try
            {

     
                List<ProductDto> result = ProductUtils.getAll("all");
                return Ok(result);

            }
            catch (Exception ex)
            {
                _logger.createLogs(ex);
                return InternalServerError(ex);
            }
        }


        [Route("get-by-id/{productId}")]
        [HttpGet]
        public IHttpActionResult GetProductById(int productId)
        {
            try
            {
                var result = ProductUtils.GetById(productId, "get_by_id");
                if (result == null)
                    return BadRequest("Product not found!");

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.createLogs(ex);
                return InternalServerError(ex);
            }
        }

        [Route("get-by-search/{search}")]
        [HttpGet]
        public IHttpActionResult GetBySearchList(string search)
        {
            try
            {


                List<ProductDto> result = ProductUtils.getBySearch(search,"get_by_search");
                return Ok(result);

            }
            catch (Exception ex)
            {
                _logger.createLogs(ex);
                return InternalServerError(ex);
            }
        }

        [Route("update-by-id/{productId}")]
        [HttpPut]
        public IHttpActionResult UpdateProductById(int productId, [FromBody] ProductDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.Values.SelectMany(x => x.Errors).Select(s => s.ErrorMessage).FirstOrDefault());
            try
            {

                var result = ProductUtils.GetById(productId, "get_by_id");
                if (result == null)
                    return BadRequest("Product not found!");
                ProductUtils.updateStatus(productId, dto, "update_by_id");
                return Ok();

            }
            catch (Exception ex)
            {
                _logger.createLogs(ex, JsonConvert.SerializeObject(dto));
                return InternalServerError(ex);
            }
        }

        [Route("soft-delete/{productId}")]
        [HttpPut]
        public IHttpActionResult SoftDelete(int productId, [FromBody] ProductDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.Values.SelectMany(x => x.Errors).Select(s => s.ErrorMessage).FirstOrDefault());
            try
            {

                var result = ProductUtils.GetById(productId, "get_by_id");
                if (result == null)
                    return BadRequest("Product not found!");
                ProductUtils.softDelete(productId, "update_by_id");
                return Ok();

            }
            catch (Exception ex)
            {
                _logger.createLogs(ex, JsonConvert.SerializeObject(dto));
                return InternalServerError(ex);
            }
        }
    }
}