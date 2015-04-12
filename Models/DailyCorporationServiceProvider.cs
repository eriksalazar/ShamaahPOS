using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NPoco;

namespace ShamaahPOS.Models
{
    public class DailyCorporationServiceProvider
    {
         private readonly IDatabase _db;
       
         public DailyCorporationServiceProvider()
        {
            IDatabase db = new Database("DefaultConnection");
            _db = db;
        }

        public DailyCorporationServiceViewModel Load(string serviceDate)
        {
            var todayServiceDate = Convert.ToDateTime(serviceDate).ToShortDateString();
            var vm = new DailyCorporationServiceViewModel();
            vm.DailyCompanyServiceIncomes = _db.Fetch<DailyCompanyServiceIncomeRow>(
                "exec dbo.getDailyCompanyIncome @0, @1, @2", Convert.ToDateTime(todayServiceDate),1, 0).ToArray();
            vm.DailyCorporationCashDrawers = _db.Fetch<DailyCorporationCashDrawerRow>(
                "exec dbo.getDailyCorporationCashDrawer @0, @1", Convert.ToDateTime(todayServiceDate), 1).ToArray();
            vm.DailyCorporationServiceIncomes = _db.Fetch<DailyCorporationServiceIncomeRow>(
                "exec dbo.getDailyCorporationIncome @0, @1", Convert.ToDateTime(todayServiceDate), 1).OrderBy(x => x.CorporationServiceProvidedName).ToArray();
            vm.DailyCorporationWithdrawals = _db.Fetch<DailyCorporationWithdrawalRow>(
                "exec dbo.getDailyCorporationWithdrawal @0, @1", Convert.ToDateTime(todayServiceDate), 1).ToArray();
            vm.DailyCompanyPayouts = _db.Fetch<DailyCompanyServiceIncomeRow>(
                "exec dbo.getDailyCompanyIncome @0, @1, @2", Convert.ToDateTime(todayServiceDate), 1, 1).ToArray();

            vm.DailyCorporationReconciliations = _db.Fetch<DailyCorporationReconciliationRow>(
               "exec dbo.getDailyCorporationReconciliation @0, @1", Convert.ToDateTime(todayServiceDate), 1).ToArray();
            vm.DailyCorporationExpenses = _db.Fetch<DailyCorporationExpenseRow>(
               "exec dbo.getDailyCorporationExpense @0, @1", Convert.ToDateTime(todayServiceDate), 1).ToArray();

            return vm;
        }

    }
}