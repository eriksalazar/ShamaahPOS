using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NPoco;

namespace ShamaahPOS.Models
{
    [TableName("DailyCorporationServiceIncome")]
    [PrimaryKey("DailyCorporationServiceIncomeId")]
    public class DailyCorporationServiceIncome
    {
        [Column("DailyCorporationServiceIncomeId")]
        public int DailyCorporationServiceIncomeId { get; set; }
        [Column("CorporationServiceProvidedId")]
        public int CorporationServiceProvidedId { get; set; }
        [Column("DailyCorporationServiceIncomeAmount")]
        public decimal? DailyCorporationServiceIncomeAmount { get; set; }
        [Column("DailyCorporationServiceIncomeDate")]
        public DateTime DailyCorporationServiceIncomeDate { get; set; }
        [Column("DailyCorporationServiceIncomeNote")]
        public string DailyCorporationServiceIncomeNote { get; set; }
        [Column("DailyCorporationServiceCommission")]
        public decimal? DailyCorporationServiceCommission { get; set; }

    }
    public class DailyCorporationServiceIncomeRow
    {
        public int DailyCorporationServiceIncomeId { get; set; }
        public int? CorporationServiceProvidedId { get; set; }
        public string CorporationServiceProvidedName { get; set; }
        public decimal? IncomeAmount { get; set; }
        public decimal? DailyCorporationCommission { get; set; }
        public DateTime DailyCorporationIncomeDate { get; set; }
        public string DailyCorporationIncomeNote { get; set; }
    }
}