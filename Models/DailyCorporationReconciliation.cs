using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NPoco;

namespace ShamaahPOS.Models
{
    [TableName("DailyCorporationReconciliation")]
    [PrimaryKey("DailyCorporationReconciliationId")]
    public class DailyCorporationReconciliation
    {
        [Column("DailyCorporationReconciliationId")]
        public int DailyCorporationReconciliationId { get; set; }
        [Column("CorporationId")]
        public int CorporationId { get; set; }
        [Column("ReconciliationDate")]
        public DateTime ReconciliationDate { get; set; }
        [Column("DenominationTypeId")]
        public int DenominationTypeId { get; set; }
        [Column("ReconciliationAmount")]
        public decimal? ReconciliationAmount { get; set; }
    }
    public class DailyCorporationReconciliationRow
    {
        public int DailyCorporationReconciliationId { get; set; }
        public int CorporationId { get; set; }
        public DateTime ReconciliationDate { get; set; }
        public int DenominationTypeId { get; set; }
        public string DenominationTypeName { get; set; }
        public decimal? ReconciliationAmount { get; set; }
    }
}