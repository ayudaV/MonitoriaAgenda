using System.ComponentModel.DataAnnotations;
using System;
namespace api.Models
{
    public class AgendaHorario
    {
        public virtual Horario Horario { get; set; }
        public virtual Agendamento Agendamento { get; set; }
    }
}