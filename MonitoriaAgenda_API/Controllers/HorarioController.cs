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
    public class HorarioController : Controller
    {
        public readonly IRepository repository;
        public HorarioController(IRepository rep) {
            this.repository = rep;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() {
            var result = await repository.GetAllHorariosAsync();
            return Ok(result);
        }

        [HttpGet("{IdHorario}")]
        public async Task<IActionResult> Get(int idHorario) {
            try {
                var result = await repository.GetHorarioByKeyAsync(idHorario);
                if (result == null)
                    return this.StatusCode(StatusCodes.Status404NotFound);
                    
                return Ok(result);
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPost]
        public async Task<ActionResult> post(Horario model)
        {
            try
            {
                repository.Add(model);
                if (await repository.SaveChangesAsync())
                {
                    //return Ok();
                    return Created($"/horario",model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }
        
        [HttpDelete("{IdHorario}")]
        public async Task<ActionResult> delete(int idHorario)
        {
            try
            {
                //verifica se existe aluno a ser excluído
                var horario = await repository.GetHorarioByKeyAsync(idHorario);
                if (horario == null)
                {
                    //método do EF
                    return NotFound();
                }
                repository.Delete(horario);
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

        [HttpGet("day/{DiaSemana}")]
        public async Task<IActionResult> GetAllByDia(int diaSemana) {
                try {
                var result = await repository.GetHorarioByDayAsync(diaSemana);
                if (result == null)
                    return this.StatusCode(StatusCodes.Status404NotFound);
                    
                return Ok(result);
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpGet("monitor/{IdMonitor}")]
        public async Task<IActionResult> GetAllByMonitor(int idMonitor) {
                try {
                var result = await repository.GetHorarioByMonitorAsync(idMonitor);
                if (result == null)
                    return this.StatusCode(StatusCodes.Status404NotFound);
                    
                return Ok(result);
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpGet("dayMonitor/{DiaSemana}/{IdMonitor}")]
        public async Task<IActionResult> GetAllByMonitorDia(int diaSemana, int idMonitor) {
                try {
                var result = await repository.GetHorarioByDayMonitorAsync(diaSemana, idMonitor);
                if (result == null)
                    return this.StatusCode(StatusCodes.Status404NotFound);
                    
                return Ok(result);
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

    }
}