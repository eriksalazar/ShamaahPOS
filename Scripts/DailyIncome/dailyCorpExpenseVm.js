
define(['knockout', 'lodash', 'jquery', 'knockout.mapping', 'utils'], function (ko, _, $, mapping) {

    return function (data) {
        var self = this;
        self.dailyCorporationExpenseId = ko.observable(data.DailyCorporationExpenseId);
        self.corporationId = ko.observable(data.CorporationId);
        self.expenseTypeId = ko.observable(data.ExpenseTypeId);
        self.expenseTypeName = ko.observable(data.ExpenseTypeName);
        self.expenseAmount = ko.observable(data.DailyCorporationExpenseAmount);
        self.expenseDate = ko.observable(data.DailyCorporationExpenseDate);
        self.expenseDescription = ko.observable(data.DailyCorporationExpenseNote);
        self.expenseAmountTotal = ko.pureComputed(function () {
            return parseFloat(self.expenseAmount() ? self.expenseAmount() : 0);
        });

        self.IsSaving = ko.observable(false);
        var save = ko.computed(function () {
            var expenseAmount = self.expenseAmount();
            var expenseDescription = self.expenseDescription();
            if (ko.computedContext.isInitial()) return;
            self.IsSaving(true);
            $.ajax({
                url: '/DailyIncome/SaveDailyCorporationExpense',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({
                    dailyCorporationExpenseId: self.dailyCorporationExpenseId(),
                    expenseAmount: expenseAmount,
                    expenseDescription: expenseDescription,
                    expenseDate: getParameterByName('serviceDate')
                })
            }).done(function (data) {
                self.dailyCorporationExpenseId(data.DailyCorporationExpenseId);
                self.expenseTypeId(data.ExpenseTypeId);
                self.expenseTypeName(data.ExpenseTypeName);
                
                self.IsSaving(false);
            });;

        });
        save.extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    };
});