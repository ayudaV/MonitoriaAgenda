using System.ComponentModel.DataAnnotations;
using System;
namespace api.Models
{
    public class AgendaAluno
    {
        public virtual Agendamento Agendamento { get; set; }
        public virtual Aluno Aluno { get; set; }

    }
}