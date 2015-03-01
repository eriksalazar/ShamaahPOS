using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NPoco;

namespace ShamaahPOS.Models
{
    [TableName("ExpenseType")]
    [PrimaryKey("ExpenseTypeId")]
    public class ExpenseType
    {
        [Column("ExpenseTypeId")]
        public int ExpenseTypeId { get; set; }
        [Column("ExpenseTypeName")]
        public string ExpenseTypeName { get; set; }
        [Column("ExpenseTypeDescription")]
        public string ExpenseTypeDescription { get; set; }
        [Column("IsActive")]
        public bool IsActive { get; set; }
    }
}