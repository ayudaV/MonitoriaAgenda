using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using api.Data;
using api.Models;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MonitorController : Controller
    {
        public readonly IRepository repository;
        public MonitorController(IRepository rep)
        {
            this.repository = rep;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await repository.GetAllMonitoresAsync();
            return Ok(result);
        }

        [HttpGet("nome")]
        public async Task<IActionResult> GetAllByName()
        {
            try
            {
                var result = await repository.GetMonitoresByNameAsync();
                if (result == null)
                    return this.StatusCode(StatusCodes.Status404NotFound);
                return Ok(result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpGet("{IdMonitor}")]
        public async Task<IActionResult> Get(int idMonitor)
        {
            try
            {
                var result = await repository.GetMonitorByKeyAsync(idMonitor);
                if (result == null)
                    return this.StatusCode(StatusCodes.Status404NotFound);

                return Ok(result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
        [HttpGet("email/{Email}")]
        public async Task<IActionResult> GetByEmail(string email)
        {
            try
            {
                var result = await repository.GetMonitorByEmailAsync(email);
                if (result == null)
                    return this.StatusCode(StatusCodes.Status404NotFound);

                return Ok(result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpGet("nomeID/{IdMonitor}")]
        public async Task<IActionResult> GetNomeById(int idMonitor)
        {
            try
            {
                Monitor result = await repository.GetMonitorByKeyAsync(idMonitor);
                if (result == null)
                    return this.StatusCode(StatusCodes.Status404NotFound);

                Aluno aluno = await repository.GetAlunoByKeyAsync(result.Email);

                return Ok(aluno);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
        [HttpPost]
        public async Task<ActionResult> post(Monitor model)
        {
            try
            {
                repository.Add(model);
                if (await repository.SaveChangesAsync())
                {
                    //return Ok();
                    return Created($"/monitor", model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

        [HttpDelete("{IdMonitor}")]
        public async Task<ActionResult> delete(int idMonitor)
        {
            try
            {
                //verifica se existe aluno a ser excluído
                var monitor = await repository.GetMonitorByKeyAsync(idMonitor);
                if (monitor == null)
                {
                    //método do EF
                    return NotFound();
                }
                repository.Delete(monitor);
                await repository.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu deletar
            //return BadRequest();
        }

    }
}