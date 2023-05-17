using Microsoft.EntityFrameworkCore;

namespace NewReactDatabase58.Data
{
    public class PeopleRepository
    {
        private string _connectionString;
        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddPerson(Person person)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }
        public List<Person> GetPeople()
        {
            using var context = new PeopleDbContext(_connectionString);
            return context.People.ToList();
        }
        public void DeletePerson(Person person)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Remove(person);
            context.SaveChanges();
        }
        public void UpdatePerson(Person person)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Update(person);
            context.SaveChanges();
        }
        public void DeleteAll(List<int> ids)
        {
            using var context = new PeopleDbContext(_connectionString);
            foreach (int id in ids)
            {
                context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {id}");
            }
        }
    }
}