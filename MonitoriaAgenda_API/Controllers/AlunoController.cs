using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using api.Data;
using api.Models;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AlunoController : Controller
    {
        
        public readonly IRepository repository;
        public AlunoController(IRepository rep) {
            this.repository = rep;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() {
            var result = await repository.GetAllAlunosAsync();
            return Ok(result);
        }

        [HttpGet("{Email}")]
        public async Task<IActionResult> Get(string email) {
            try {
                var result = await repository.GetAlunoByKeyAsync(email);
                if (result == null)
                    return this.StatusCode(StatusCodes.Status404NotFound);
                    
                return Ok(result);
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
    
        [HttpPost]
        public async Task<ActionResult> post(Aluno model)
        {
            try
            {
                repository.Add(model);
                if (await repository.SaveChangesAsync())
                {
                    //return Ok();
                    return Created($"/aluno/{model.Email}",model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

        [HttpPut("{Email}")]
        public async Task<IActionResult> Put(string email, Aluno dadosAlunoAlt)
        {
            try {
                //verifica se existe aluno a ser alterado
                var result = await repository.GetAlunoByKeyAsync(email);

                if (result == null)
                {
                    return BadRequest();
                }
                result = dadosAlunoAlt;

                await repository.SaveChangesAsync();
                return Created($"/aluno/{email}", dadosAlunoAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
        }
    
        [HttpPut]
        [Route("resetMensal")]
        public async Task<IActionResult> ResetMensal()
        {
            try {
                //verifica se existe aluno a ser alterado
                Aluno[] result = await repository.GetAllAlunosAsync();
                if (result.Count() == 0)
                {
                    return BadRequest();
                }
                for(var i = 0; i < result.Count(); i++)
                {
                    Aluno _result = (Aluno)result.GetValue(i);
                    _result.SaldoDeMonitoria = _result.SaldoDeMonitoria = _result.SaldoDeMonitoria / 10 + 500;
                    Created($"/aluno/{_result.Email}", _result);
                }
                await repository.SaveChangesAsync();
                return Ok();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
        }
        
        [HttpPut]
        [Route("resetAnual")]
        public async Task<IActionResult> ResetAnual()
        {
            try {
                //verifica se existe aluno a ser alterado
                Aluno[] result = await repository.GetAllAlunosAsync();
                if (result.Count() == 0)
                {
                    return BadRequest();
                }
                for(var i = 0; i < result.Count(); i++)
                {
                    Aluno _result = (Aluno)result.GetValue(i);
                    _result.SaldoDeMonitoria = _result.SaldoDeMonitoria = 500;
                    Created($"/aluno/{_result.Email}", _result);
                }
                await repository.SaveChangesAsync();
                return Ok();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
        }
    
        [HttpPut("descontarSaldo/{Email}")]
        public async Task<IActionResult> DescontarSaldo(string email, Aluno dadosAlt)
        {
            try {
                //verifica se existe aluno a ser alterado
                var result = await repository.GetAlunoByKeyAsync(email);

                if (result == null)
                {
                    return BadRequest();
                }
                result.SaldoDeMonitoria = dadosAlt.SaldoDeMonitoria;

                await repository.SaveChangesAsync();
                return Created($"/aluno/descontarSaldo/{result.Email}", result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
        }

        [HttpDelete("remover/{Email}")]
        public async Task<ActionResult> delete(string Email)
        {
            try
            {
                //verifica se existe aluno a ser excluído
                var aluno = await repository.GetAlunoByKeyAsync(Email);
                if (aluno == null)
                {
                    //método do EF
                    return NotFound();
                }
                repository.Delete(aluno);
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