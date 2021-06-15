using System.ComponentModel.DataAnnotations;
using System;
namespace api.Models
{
    public class MonitorAluno
    {
        public virtual Monitor Monitor { get; set; }
        public virtual Aluno Aluno { get; set; }
    }
}