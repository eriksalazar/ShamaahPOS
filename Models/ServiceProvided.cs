using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NPoco;

namespace ShamaahPOS.Models
{
    [TableName("ServiceProvided")]
    [PrimaryKey("ServiceProvidedId")]
    public class ServiceProvided
    {
        [Column("ServiceProvidedId")]
        public int ServiceProvidedId { get; set; }
        [Column("ServiceProvidedName")]
        public string ServiceProvidedName { get; set; }
        [Column("ServiceProvidedDescription")]
        public string ServiceProvidedDescription { get; set; }
        [Column("IsActive")]
        public bool IsActive { get; set; }
    }
}