﻿using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class AccountEntity
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Token { get; set; }
    }
}
