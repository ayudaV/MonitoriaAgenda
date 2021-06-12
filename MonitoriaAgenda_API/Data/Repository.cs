using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore;
using System.Linq;
using api.Models;

namespace api.Data
{
    public class Repository : IRepository
    {
        DataBaseContext context;
        public Repository(DataBaseContext contx) {
            this.context = contx;
        }

        public void Add<T>(T entity) where T : class {
            this.context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class {
            this.context.Remove(entity);
        }

        public async Task<bool> SaveChangesAsync() {
            return (await this.context.SaveChangesAsync() > 0);
        }

        public void Update<T>(T entity) where T : class {
            this.context.Update(entity);
        }
        //Aluno
        public async Task<Aluno[]> GetAllAlunosAsync() {
            IQueryable<Aluno> consultaAlunos = this.context.Aluno;
            consultaAlunos = consultaAlunos.OrderBy(a => a.Apelido);
            return await consultaAlunos.ToArrayAsync();
        }
        public async Task<Aluno> GetAlunoByKeyAsync(string key) {
            IQueryable<Aluno> consultaAlunos = this.context.Aluno;
            consultaAlunos = consultaAlunos.Where(a => a.Email == key);
            return await consultaAlunos.FirstOrDefaultAsync();
        }

        //Agendamento
        public async Task<Agendamento[]> GetAllAgendamentosAsync() {
            IQueryable<Agendamento> consultaAgendamentos = this.context.Agendamento;
            consultaAgendamentos = consultaAgendamentos.OrderBy(a => a.IdAgendamento);
            return await consultaAgendamentos.ToArrayAsync();
        }
        public async Task<Agendamento> GetAgendamentoByKeyAsync(int key) {
            IQueryable<Agendamento> consultaAgendamentos = this.context.Agendamento;
            consultaAgendamentos = consultaAgendamentos.Where(a => a.IdAgendamento == key);
            return await consultaAgendamentos.FirstOrDefaultAsync();
        }
        public async Task<Agendamento[]> GetAgendamentoByDayAsync(int day) {
            IQueryable<Agendamento> consultaAgendamentos = this.context.Agendamento;
            consultaAgendamentos = consultaAgendamentos.Where(a => a.DiaDaSemana == day);
            return await consultaAgendamentos.ToArrayAsync();
        }
        public async Task<Agendamento[]> GetAgendamentoByMonitorAsync(int idMonitor) {
            IQueryable<Agendamento> consultaAgendamentos = this.context.Agendamento;
            consultaAgendamentos = consultaAgendamentos.Where(a => a.IdMonitor == idMonitor);
            return await consultaAgendamentos.ToArrayAsync();
        }
        public async Task<Agendamento[]> GetAgendamentoByDayMonitorAsync(int day, int idMonitor) {
            IQueryable<Agendamento> consultaAgendamentos = this.context.Agendamento;
            consultaAgendamentos = consultaAgendamentos.Where(a => a.DiaDaSemana == day && a.IdMonitor == idMonitor);
            return await consultaAgendamentos.ToArrayAsync();
        }
    
        //Monitor
        public async Task<Monitor[]> GetAllMonitoresAsync() {
            IQueryable<Monitor> consultaMonitores = this.context.Monitor;
            consultaMonitores = consultaMonitores.OrderBy(a => a.IdMonitor);
            return await consultaMonitores.ToArrayAsync();
        }
        public async Task<Monitor> GetMonitorByKeyAsync(int key) {
            IQueryable<Monitor> consultaMonitores = this.context.Monitor;
            consultaMonitores = consultaMonitores.Where(a => a.IdMonitor == key);
            return await consultaMonitores.FirstOrDefaultAsync();
        }
        public async Task<Monitor> GetMonitorByEmailAsync(string email) {
            IQueryable<Monitor> consultaMonitores = this.context.Monitor;
            consultaMonitores = consultaMonitores.Where(a => a.Email == email);
            return await consultaMonitores.FirstOrDefaultAsync();
        }
        
        //Horario
        public async Task<Horario[]> GetAllHorariosAsync() {
            IQueryable<Horario> consultaHorarios = this.context.Horario;
            consultaHorarios = consultaHorarios.OrderBy(a => a.DiaDaSemana);
            return await consultaHorarios.ToArrayAsync();
        }
        public async Task<Horario> GetHorarioByKeyAsync(int key) {
            IQueryable<Horario> consultaHorarios = this.context.Horario;
            consultaHorarios = consultaHorarios.Where(a => a.IdHorario == key);
            return await consultaHorarios.FirstOrDefaultAsync();
        }
        public async Task<Horario[]> GetHorarioByDayAsync(int day) {
            IQueryable<Horario> consultaHorarios = this.context.Horario;
            consultaHorarios = consultaHorarios.Where(a => a.DiaDaSemana == day);
            return await consultaHorarios.ToArrayAsync();
        }
        public async Task<Horario[]> GetHorarioByMonitorAsync(int idMonitor) {
            IQueryable<Horario> consultaHorarios = this.context.Horario;
            consultaHorarios = consultaHorarios.Where(a => a.IdMonitor == idMonitor);
            return await consultaHorarios.ToArrayAsync();
        }
        public async Task<Horario[]> GetHorarioByDayMonitorAsync(int day, int idMonitor) {
            IQueryable<Horario> consultaHorarios = this.context.Horario;
            consultaHorarios = consultaHorarios.Where(a => a.DiaDaSemana == day && a.IdMonitor == idMonitor);
            return await consultaHorarios.ToArrayAsync();
        }
    }
}