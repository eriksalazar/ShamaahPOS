using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NPoco;

namespace ShamaahPOS.Models
{
    [TableName("CompanyServiceProvided")]
    [PrimaryKey("CompanyServiceProvidedId")]
    public class CompanyServiceProvided
    {
        [Column("CompanyServiceProvidedId")]
        public int CompanyServiceProvidedId { get; set; }
        [Column("CompanyId")]
        public int CompanyId { get; set; }
        [Column("ServiceProvidedId")]
        public int ServiceProvidedId { get; set; }
        [Column("AllowsPayout")]
        public bool? AllowsPayout { get; set; }
        [Column("CommissionPercent")]
        public decimal CommissionPercent { get; set; }
    }
}