using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using System;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using api.Data;
using api.Services;
using Microsoft.AspNetCore.Http;

namespace api.Controllers
{
    [Route("[controller]")]
    public class HomeController : Controller
    {
        private readonly DataBaseContext _repository;
        public HomeController(DataBaseContext repository)
        {
            // construtor
            _repository = repository;
        }
        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Authenticate([FromBody] Aluno usuario)
        {
            //verifica se existe aluno a ser excluído
            var user = _repository.Aluno
            .Where(u => u.Email == usuario.Email && u.Senha == usuario.Senha)
            .FirstOrDefault();

            if (user == null)
                return NotFound(new { message = "Usuário ou senha inválidos" });

            var token = TokenService.GenerateToken(user);
            user.Senha = "";
            return new
            {
                user = user,
                token = token
            };
        }
        
        [HttpPost]
        [Route("signup")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Signup([FromBody] Aluno usuario)
        {
            //verifica se existe aluno a ser excluído
            try{
                _repository.Add(usuario);                 
                if (await _repository.SaveChangesAsync()==1)
                    return Ok();
            }
            catch{
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            return BadRequest();
        }
        
        [HttpGet]
        [Route("authenticated")]
        [Authorize]
        public string Authenticated() => String.Format("Autenticado -{0}", User.Identity.Name);
        
        [HttpGet]
        [Route("aluno")]
        [Authorize(Roles = "aluno,monitor")]
        public string Aluno() => "Aluno";
        
        [HttpGet]
        [Route("monitor")]
        [Authorize(Roles = "monitor")]
        public string Manager() => "Monitor";
    }
}