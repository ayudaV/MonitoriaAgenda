using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Data
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options) { }

        public DbSet<Aluno> Aluno { get; set; }
        public DbSet<Horario> Horario { get; set; }
        public DbSet<Agendamento> Agendamento { get; set; }
        public DbSet<Monitor> Monitor { get; set; }
        public DbSet<AgendaHorario> AgendaHorario { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AgendaHorario>().HasNoKey();
            modelBuilder.Entity<MonitorAluno>().HasNoKey();
        }
    }
}