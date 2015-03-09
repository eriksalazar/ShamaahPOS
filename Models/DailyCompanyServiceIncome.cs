using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.ComponentModel.DataAnnotations;
using NPoco;

namespace ShamaahPOS.Models
{
    [TableName("DailyCompanyServiceIncome")]
    [PrimaryKey("DailyCompanyServiceIncomeId")]
  
    public class DailyCompanyServiceIncome 
    {
        [Column("DailyCompanyServiceIncomeId")]
        public int DailyCompanyServiceIncomeId { get; set; }
        [Column("CompanyServiceProvidedId")]
        public int? CompanyServiceProvidedId  { get; set; }
        [Column("IncomeAmount")]
        public decimal? IncomeAmount { get; set; }
        [Column("DailyCompanyCommission")]
        public decimal? DailyCompanyCommission { get; set; }
          [Column("DailyCorporationCommission")]
        public decimal? DailyCorporationCommission { get; set; }
         [Column("DailyServiceDate")]
          public DateTime DailyServiceDate { get; set; }
         [Column("ManualCompanyServiceName")]
         public string ManualCompanyServiceName { get; set; }
         [Column("IsPayout")]
         public bool? IsPayout { get; set; }

    }

   
}