using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NPoco;

namespace ShamaahPOS.Models
{
    [TableName("WithdrawalType")]
    [PrimaryKey("WithdrawalTypeId")]
    public class WithdrawalType
    {
        [Column("WithdrawalTypeId")]
        public int WithdrawalTypeId { get; set; }
        [Column("WithdrawalTypeName")]
        public string WithdrawalTypeName { get; set; }
        [Column("IsActive")]
        public bool IsActive { get; set; }
    }
}