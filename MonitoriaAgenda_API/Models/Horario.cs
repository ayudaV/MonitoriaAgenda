using System.ComponentModel.DataAnnotations;
using System;

namespace api.Models
{
    public class Horario
    {
        [Key]
        public int IdHorario { get; set; }
        public int DiaDaSemana { get; set; }
        public DateTime HoraInicio { get; set; }
        public DateTime HoraFim { get; set; }
        public int IdMonitor { get; set; }
    }
}