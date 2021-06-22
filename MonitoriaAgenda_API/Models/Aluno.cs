using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Aluno
    {
        [Key]
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Apelido { get; set; }
        public int SaldoDeMonitoria { get; set; }
        public string Role {get; set;}

        public override string ToString()
        {
            return Email;
        }
    }
}