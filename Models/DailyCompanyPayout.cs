using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NPoco;
namespace ShamaahPOS.Models
{
    [TableName("DailyCompanyPayout")]
    [PrimaryKey("DailyCompanyPayoutId")]
    public class DailyCompanyPayout
    {
        [Column("DailyCompanyPayoutId")]
        public int DailyCompanyPayoutId { get; set; }
        [Column("DailyCompanyServiceIncomeId")]
       
        public int DailyCompanyServiceIncomeId { get; set; }
        [Column("IsActive")]
        public bool? IsActive { get; set; }
    }
}