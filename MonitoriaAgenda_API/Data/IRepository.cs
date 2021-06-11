using System.Threading.Tasks;
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

        // GET para Horario
        Task<Horario[]> GetAllHorariosAsync();
        Task<Horario> GetHorarioByKeyAsync(int key);
        Task<Horario[]> GetHorarioByDayAsync(int day);
        Task<Horario[]> GetHorarioByMonitorAsync(int idMonitor);
        Task<Horario[]> GetHorarioByDayMonitorAsync(int day, int idMonitor);

        // GET para Horario
        Task<Agendamento[]> GetAllAgendamentosAsync();
        Task<Agendamento> GetAgendamentoByKeyAsync(int key);
        Task<Agendamento[]> GetAgendamentoByDayAsync(int day);
        Task<Agendamento[]> GetAgendamentoByMonitorAsync(int idMonitor);
        Task<Agendamento[]> GetAgendamentoByDayMonitorAsync(int day, int idMonitor);
    }
}