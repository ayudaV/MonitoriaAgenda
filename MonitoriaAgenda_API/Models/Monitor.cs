using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Monitor
    {
        [Key]
        public int IdMonitor { get; set; }
        public string Email { get; set; }
    }
}