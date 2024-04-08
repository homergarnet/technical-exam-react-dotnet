using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using TechExam.App_Utility.Data;
using TechExam.Models.DTO;
using TechExam.Models.Response;
using TechnicalExam.App_Utility.Data;
namespace TechExam.Controllers
{
    [RoutePrefix("api/orders")]
    public class OrdersController : ApiController
    {
        private ErrorLogs _logger = new ErrorLogs();
        private OrderUtils OrderUtils = new OrderUtils();

        [Route("create")]
        [HttpPost]
        public IHttpActionResult CreateOrder(OrderDto dto)
        {
            try
            {

                OrderUtils.create(dto, "create");
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
        public IHttpActionResult GetAllOrders()
        {
            try
            {


                List<OrderResponse> result = OrderUtils.getAll("all");
                return Ok(result);

            }
            catch (Exception ex)
            {
                _logger.createLogs(ex);
                return InternalServerError(ex);
            }
        }

        [Route("remove-from-order/{orderId}")]
        [HttpDelete]
        public IHttpActionResult RemoveFromOrder(int orderId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.Values.SelectMany(x => x.Errors).Select(s => s.ErrorMessage).FirstOrDefault());
            try
            {

                var result = OrderUtils.GetById(orderId, "get_by_id");
                if (result == null)
                    return BadRequest("Order not found!");
                OrderResponse orderResponse = OrderUtils.removeFromOrder(orderId, "remove_from_order");
                return Ok(orderResponse);

            }
            catch (Exception ex)
            {

                _logger.createLogs(ex);

                return InternalServerError(ex);
            }
        }

        [Route("update-is-paid-by-id")]
        [HttpPut]
        public IHttpActionResult UpdateIsPaid()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.Values.SelectMany(x => x.Errors).Select(s => s.ErrorMessage).FirstOrDefault());
            try
            {


                OrderUtils.updateIsPaidById("update_is_paid");
                return Ok("Orders is now paid");

            }
            catch (Exception ex)
            {

                _logger.createLogs(ex);

                return InternalServerError(ex);
            }
        }


    }
}