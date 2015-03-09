using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NPoco;

namespace ShamaahPOS.Models
{
    [TableName("DailyCompanyServiceIncome")]
    [PrimaryKey("DailyCompanyServiceIncomeId")]
    public class DailyCorporationServiceIncome
    {
        [Column("DailyCompanyServiceIncomeId")]
        public int DailyCorporationServiceIncomeId { get; set; }
        [Column("CorporationServiceProvidedId")]
        public int CorporationServiceProvidedId { get; set; }
        [Column("DailyCorporationServiceIncomeAmount")]
        public decimal DailyCorporationServiceIncomeAmount { get; set; }
        [Column("DailyCorporationServiceIncomeDate")]
        public DateTime DailyCorporationServiceIncomeDate { get; set; }
        [Column("DailyCorporationServiceIncomeNote")]
        public string DailyCorporationServiceIncomeNote { get; set; }
        [Column("DailyCorporationServiceCommission")]
        public decimal DailyCorporationServiceCommission { get; set; }

    }
}