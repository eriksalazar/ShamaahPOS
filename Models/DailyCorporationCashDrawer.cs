using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NPoco;

namespace ShamaahPOS.Models
{
    [TableName("DailyCorporationCashDrawer")]
    [PrimaryKey("DailyCorporationCashDrawerId")]
    public class DailyCorporationCashDrawer
    {
         [Column("DailyCorporationCashDrawerId")]
        public int DailyCorporationCashDrawerId { get; set; }
         [Column("CorporationId")]
        public int CorporationId { get; set; }
         [Column("CashDrawerTypeId")]
        public int CashDrawerTypeId { get; set; }
         [Column("CashDrawerAmount")]
        public decimal? CashDrawerAmount { get; set; }
         [Column("CashDrawerDate")]
        public DateTime CashDrawerDate { get; set; }
         [Column("CashDrawerDescription")]
        public string CashDrawerDescription { get; set; }
    }
    public class DailyCorporationCashDrawerRow
    {
        public int DailyCorporationCashDrawerId { get; set; }
        public int CorporationId { get; set; }
        public int CashDrawerTypeId { get; set; }
        public string CashDrawerTypeName { get; set; }
        public decimal? CashDrawerAmount { get; set; }
        public DateTime CashDrawerDate { get; set; }
        public string CashDrawerDescription { get; set; }
    }
}