using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NewReactDatabase58.Data;
using NewReactDatabase58.Web.Models;

namespace NewReactDatabase58.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connectionString;
        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");

        }
        [Route("getpeople")]
        public List<Person> GetPeople()
        {
            PeopleRepository repo = new(_connectionString);
            List<Person> list = repo.GetPeople().ToList();
            return list;
        }
        [HttpPost]
        [Route("addperson")]
        public void AddPerson(Person person)
        {
            PeopleRepository repo = new(_connectionString);
            repo.AddPerson(person);
        }
        [HttpPost]
        [Route("deleteperson")]
        public void DeletePerson(Person person)
        {
            PeopleRepository repo = new(_connectionString);
            repo.DeletePerson(person);
        }
        [HttpPost]
        [Route("deleteall")]
        public void DeleteAll(ViewModel viewModel)
        {
            PeopleRepository repo = new(_connectionString);
            repo.DeleteAll(viewModel.Ids);
        }
        [HttpPost]
        [Route("updatePerson")]
        public void UpdatePerson(Person person)
        {
            PeopleRepository repo = new(_connectionString);
            repo.UpdatePerson(person);

        }
    }
}

