using System.ComponentModel.DataAnnotations;
using System;

namespace api.Models
{
    public class Agendamento
    {
        [Key]
        public int IdAgendamento { get; set; }
        public string Email { get; set; }
        public int IdMonitor {get;set;}
        public int DiaDaSemana { get; set; }
        public DateTime HoraInicio { get; set; }
        public DateTime HoraFim { get; set; }
        public int Preco {get; set;}
    }
}