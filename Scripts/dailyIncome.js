function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatCurrency(value) {
    return "$" + numberWithCommas(value.toFixed(2));
}

define(['knockout', 'DailyIncome/dailyCompanyIncomesVm', 'DailyIncome/dailyCorpIncomesVm', 'DailyIncome/dailyCorpCashDrawerVm', 'DailyIncome/dailyCorpWithdrawalVm', 'DailyIncome/dailyCorpReconciliationVm', 'DailyIncome/dailyCorpExpenseVm'], function (ko, dCompVm, dCorpVm, dCorpCashDrawerVm, dCorpWithdrawalVm, dCorpReconciliationVm, dCorpExpenseVm) {

    return function (rawModel) {
        var self = this;

        self.dailyIncomes = ko.observableArray();
        self.initialCash = ko.observable();
        self.bankDrawer = ko.observable();
        self.dailyCorporationIncomes = ko.observableArray();      
        self.dailyCorporationCashDrawers = ko.observableArray();
        self.dailyCorporationWithdrawals = ko.observableArray();
        self.dailyCompanyPayouts = ko.observableArray();
        self.dailyCorporationReconciliations = ko.observableArray();
        self.dailyCorporationExpenses = ko.observableArray();
        self.dailyCorporationCashCheckingIncomes = ko.observableArray();
        self.totalCashBalance = ko.observable(0);
        self.totalExistingCash = ko.observable(0);
        self.cashDifference = ko.observable(0);
    
        //Company Income Totals
        self.IncomeAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyIncomes(), function () { total += parseFloat(this.IncomeAmount() ? this.IncomeAmount():0) });
            return total;
        });
        self.CommissionCompanyAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyIncomes(), function () { total += parseFloat(this.DailyCompanyCommission()  ? this.DailyCompanyCommission():0) });
            return total;
        });
        self.CompanyAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyIncomes(), function () { total += parseFloat(this.DailyCompanyIncomeTotal() ? this.DailyCompanyIncomeTotal():0) });
            return total;
        });
        self.CommissionCorporationAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyIncomes(), function () { total += parseFloat(this.DailyCorporationCommission() ? this.DailyCorporationCommission():0) });
            return total;
        });
        self.transferGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyIncomes(), function () { total += parseFloat(this.DailyCorporationIncomeTotal() ? this.DailyCorporationIncomeTotal() : 0) });
            return total;
        });

        //Corporation Cash Checking Totals
        self.corporationCashCheckingAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyCorporationCashCheckingIncomes(), function () { total += parseFloat(this.incomeAmount() ? this.incomeAmount() : 0) });
            return total;
        });
        self.corporationCashCheckingCommissionAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyCorporationCashCheckingIncomes(), function () { total += parseFloat(this.dailyCorporationCommission() ? this.dailyCorporationCommission() : 0) });
            return total;
        });
        self.corporationCashCheckingGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyCorporationCashCheckingIncomes(), function () { total += parseFloat(this.dailyCorporationIncomeTotal() ? this.dailyCorporationIncomeTotal() : 0) });
            return total;
        });

        //Corporation Income Totals
        self.corporationIncomeAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyCorporationIncomes(), function () { total += parseFloat(this.incomeAmount() ? this.incomeAmount() : 0) });
            return total;
        });
        self.corporationCommissionAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyCorporationIncomes(), function () { total += parseFloat(this.dailyCorporationCommission() ? this.dailyCorporationCommission() : 0) });
            return total;
        });
        self.corporationGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyCorporationIncomes(), function () { total += parseFloat(this.dailyCorporationIncomeTotal() ? this.dailyCorporationIncomeTotal() : 0) });
            return total;
        });
        //Cash Drawer Totals
        self.corporationCashDrawerAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyCorporationCashDrawers(), function () { total += parseFloat(this.cashDrawerAmount() ? this.cashDrawerAmount() : 0) });
            return total;
        });

        //Withdrawals Totals
        self.corporationWithdrawalAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyCorporationWithdrawals(), function () { total += parseFloat(this.withdrawalAmount() ? this.withdrawalAmount() : 0) });
            return total;
        });
       
        //Company Payouts Total
        self.payoutIncomeAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyCompanyPayouts(), function () { total += parseFloat(this.IncomeAmount() ? this.IncomeAmount() : 0) });
            return total;
        });
        self.payoutCommissionCorporationAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyCompanyPayouts(), function () { total += parseFloat(this.DailyCorporationCommission() ? this.DailyCorporationCommission() : 0) });
            return total;
        });
        self.payoutGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyCompanyPayouts(), function () { total += parseFloat(this.DailyCorporationIncomeTotal() ? this.DailyCorporationIncomeTotal() : 0) });
            return total;
        });
          //Expenses Totals
        self.corporationExpenseAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyCorporationExpenses(), function () { total += parseFloat(this.expenseAmount() ? this.expenseAmount() : 0) });
            return total;
        });
        
     
        //Corporation Reconciliations Totals
        self.corporationReconciliationAmountGrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyCorporationReconciliations(), function () { total += parseFloat(this.reconciliationAmountTotal() ? this.reconciliationAmountTotal() : 0) });
            return total;
        });
      
        //Daily Income Add/Remove
        self.addDailyIncome = function () {
            self.dailyIncomes.push(new dCompVm({
                DailyCompanyServiceIncomeId: null, CompanyServiceProvidedId: null, IncomeAmount: 0,
                DailyCompanyCommission: 0, DailyCorporationCommission: 0, DailyServiceDate: getParameterByName('serviceDate'),
                ManualCompanyServiceName: null, IsPayout:0
                }));         
        };
        
        self.removeDailyIncome = function (data) {
            var conf = confirm("Are you sure?");
            if (conf == false) return;
            self.dailyIncomes.remove(data);
            $.ajax({
                url: '/DailyIncome/RemoveDailyCompanyServiceIncome',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({ dailyCompanyServiceIncomeId: data.DailyCompanyServiceIncomeId() })
            });
        }
        //Daily Expense Add/Remove
        self.addDailyOtherExpense = function () {
            self.dailyCorporationExpenses.push(new dCorpExpenseVm({
                dailyCorporationExpenseId: null, expenseTypeId: 2, corporationId: 1,
                dailyCorporationExpenseAmunt: 0, DailyCorporationExpenseDate: getParameterByName('serviceDate'),
                dailyCorporationExpenseNote: null
            }));
        };

        self.removeDailyOtherExpense = function (data) {
            var conf = confirm("Are you sure?");
            if (conf == false) return;

            self.dailyCorporationExpenses.remove(data);
            $.ajax({
                url: '/DailyIncome/RemoveDailyOtherExpense',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({ dailyCorporationExpenseId: data.dailyCorporationExpenseId() })
            });
        }

        self.reset =function() { return self.loadData() }

        self.loadData = function () {
            self.dailyIncomes(_.map(rawModel.DailyCompanyServiceIncomes, function (d) {
                return new dCompVm(d);
            }));
            self.dailyCorporationCashDrawers(_.map(rawModel.DailyCorporationCashDrawers, function (d) {
                return new dCorpCashDrawerVm(d);
            }));

            self.dailyCorporationIncomes(_.map(rawModel.DailyCorporationServiceIncomes, function (d) {
                return new dCorpVm(d);
            }));
            self.dailyCorporationCashCheckingIncomes(_.map(rawModel.DailyCorporationCashCheckingIncomes, function (d) {
                return new dCorpVm(d);
            }));
            self.dailyCorporationWithdrawals(_.map(rawModel.DailyCorporationWithdrawals, function (d) {
                return new dCorpWithdrawalVm(d);
            }));
            self.dailyCompanyPayouts(_.map(rawModel.DailyCompanyPayouts, function (d) {
                return new dCompVm(d);
            }));

            self.dailyCorporationReconciliations(_.map(rawModel.DailyCorporationReconciliations, function (d) {
                return new dCorpReconciliationVm(d);
            }));
            self.dailyCorporationExpenses(_.map(rawModel.DailyCorporationExpenses, function (d) {
                return new dCorpExpenseVm(d);
            }));
        };
      
        self.cashDifference(self.corporationReconciliationAmountGrandTotal() - (self.transferGrandTotal() + self.corporationGrandTotal() + self.corporationCashDrawerAmountGrandTotal() - (self.corporationWithdrawalAmountGrandTotal() + self.payoutGrandTotal() + self.corporationExpenseAmountGrandTotal())))
        self.applyBindings = function () {
            ko.applyBindings(self);
        };


        ko.bindingHandlers.numeric = {
            init: function (element, valueAccessor) {
                $(element).on("keydown", function (event) {
                    // Allow: backspace, delete, tab, escape, and enter
                    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
                        // Allow: Ctrl+A
                        (event.keyCode == 65 && event.ctrlKey === true) ||
                        // Allow: . ,
                        (event.keyCode == 188 || event.keyCode == 190 || event.keyCode == 110) ||
                        // Allow: home, end, left, right
                        (event.keyCode >= 35 && event.keyCode <= 39)) {
                        // let it happen, don't do anything
                        return;
                    }
                    else {
                        // Ensure that it is a number and stop the keypress
                        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                            event.preventDefault();
                        }
                    }
                });

            }

        };
    };
});
