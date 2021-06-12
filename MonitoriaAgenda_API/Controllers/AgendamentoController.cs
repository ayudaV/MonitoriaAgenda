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
    public class AgendamentoController : Controller
    {
        public readonly IRepository repository;
        public AgendamentoController(IRepository rep) {
            this.repository = rep;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() {
            var result = await repository.GetAllAgendamentosAsync();
            return Ok(result);
        }

        [HttpGet("{IdAgendamento}")]
        public async Task<IActionResult> Get(int idAgendamento) {
            try {
                var result = await repository.GetAgendamentoByKeyAsync(idAgendamento);
                if (result == null)
                    return this.StatusCode(StatusCodes.Status404NotFound);
                    
                return Ok(result);
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
    
        [HttpGet("day/{DiaSemana}")]
        public async Task<IActionResult> GetAllAgendamentoByDia(int diaSemana) {
                try {
                var result = await repository.GetAgendamentoByKeyAsync(diaSemana);
                if (result == null)
                    return this.StatusCode(StatusCodes.Status404NotFound);
                    
                return Ok(result);
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpGet("monitor/{IdMonitor}")]
        public async Task<IActionResult> GetAllAgendamentoByMonitor(int idMonitor) {
                try {
                var result = await repository.GetAgendamentoByMonitorAsync(idMonitor);
                if (result == null)
                    return this.StatusCode(StatusCodes.Status404NotFound);
                    
                return Ok(result);
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpGet("dayMonitor/{DiaSemana}/{IdMonitor}")]
        public async Task<IActionResult> GetAllAgendamentoByDiaMonitor(int diaSemana, int idMonitor) {
                try {
                var result = await repository.GetAgendamentoByDayMonitorAsync(diaSemana, idMonitor);
                if (result == null)
                    return this.StatusCode(StatusCodes.Status404NotFound);
                    
                return Ok(result);
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPost]
        public async Task<ActionResult> post(Agendamento model)
        {
            try
            {
                repository.Add(model);
                if (await repository.SaveChangesAsync())
                {
                    //return Ok();
                    return Created($"/agendamento",model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }
    
        [HttpDelete("{IdAgendamento}")]
        public async Task<ActionResult> delete(int idAgendamento)
        {
            try
            {
                //verifica se existe aluno a ser excluído
                var agendamento = await repository.GetAgendamentoByKeyAsync(idAgendamento);
                if (agendamento == null)
                {
                    //método do EF
                    return NotFound();
                }
                repository.Delete(agendamento);
                await repository.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu deletar
            //return BadRequest();
        }
    }
}