using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime LastModified { get; set; }
        public DateTime CreatedOn { get; set; }
        public string OwnedBy { get; set; } = "User";
        public bool Shared { get; set; }
    }
}
