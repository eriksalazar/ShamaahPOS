using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NPoco;

namespace ShamaahPOS.Models
{
    [TableName("DailyCorporationWithdrawal")]
    [PrimaryKey("DailyCorporationWithdrawalId")]
    public class DailyCorporationWithdrawal
    {
         [Column("DailyCorporationWithdrawalId")]
        public int DailyCorporationWithdrawalId { get; set; }
         [Column("CorporationId")]
        public int CorporationId { get; set; }
         [Column("WithdrawalTypeId")]
        public int WithdrawalTypeId { get; set; }
         [Column("WithdrawalAmount")]
        public decimal? WithdrawalAmount { get; set; }
         [Column("WithdrawalDate")]
        public DateTime WithdrawalDate { get; set; }
         [Column("WithdrawalDescription")]
        public string WithdrawalDescription { get; set; }
    }
    public class DailyCorporationWithdrawalRow
    {
        public int DailyCorporationWithdrawalId { get; set; }
        public int CorporationId { get; set; }
        public int WithdrawalTypeId { get; set; }
        public string WithdrawalTypeName { get; set; }
        public decimal? WithdrawalAmount { get; set; }
        public DateTime WithdrawalDate { get; set; }
        public string WithdrawalDescription { get; set; }
    }
}