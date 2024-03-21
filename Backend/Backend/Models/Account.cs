using System.ComponentModel.DataAnnotations;

namespace Account.Models
{
    public class Account
    {
        [Key]
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Role { get; set; }
        public string? Token { get; set; }
    }
}
