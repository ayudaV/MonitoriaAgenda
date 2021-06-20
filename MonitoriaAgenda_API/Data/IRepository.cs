using System.Threading.Tasks;
using System.Linq;
using api.Models;

namespace api.Data
{
    public interface IRepository
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entiry) where T : class;

        Task<bool> SaveChangesAsync();

        // GET para Aluno
        Task<Aluno[]> GetAllAlunosAsync();
        Task<Aluno> GetAlunoByKeyAsync(string key);

        // GET para Monitor
        Task<Monitor[]> GetAllMonitoresAsync();
        Task<Monitor> GetMonitorByKeyAsync(int key);
        Task<Monitor> GetMonitorByEmailAsync(string email);
        Task<MonitorAluno[]> GetMonitoresByNameAsync();

        // GET para Horario
        Task<Horario[]> GetAllHorariosAsync();
        Task<Horario> GetHorarioByKeyAsync(int key);
        Task<Horario[]> GetHorarioByDayAsync(int day);
        Task<Horario[]> GetHorarioByMonitorAsync(int idMonitor);
        Task<Horario[]> GetHorarioByDayMonitorAsync(int day, int idMonitor);

        // GET para Agendamento
        Task<Agendamento[]> GetAllAgendamentosAsync();
        Task<Agendamento> GetAgendamentoByKeyAsync(int key);
        Task<Agendamento> GetAgendamentoByEmailAsync(string email);
        Task<AgendaHorario[]> GetAgendamentoByDayAsync(int day);
        Task<AgendaAluno[]> GetAlunoAgendamentoByHorarioAsync(int idHorario);
        Task<AgendaHorario[]> GetAgendamentoByDayMonitorAsync(int day, int idMonitor);
        Task<AgendaHorario[]> GetAgendamentoByHorarioAsync(int idHorario);
    }
}