
define(['knockout', 'lodash', 'jquery', 'knockout.mapping', 'utils'], function (ko, _, $, mapping) {

    return function (data) {
        var self = this;
        self.dailyCorporationCashDrawerId = ko.observable(data.DailyCorporationCashDrawerId);
        self.corporationId = ko.observable(data.CorporationId);
        self.cashDrawerTypeId = ko.observable(data.CashDrawerTypeId);
        self.cashDrawerTypeName = ko.observable(data.CashDrawerTypeName);
        self.cashDrawerAmount = ko.observable(data.CashDrawerAmount);
        self.cashDrawerDate = ko.observable(data.CashDrawerDate);
        self.cashDrawerDescription = ko.observable(data.CashDrawerDescription);
        self.cashDrawerAmountTotal = ko.pureComputed(function () {
            return parseFloat(self.cashDrawerAmount() ? self.cashDrawerAmount() : 0);
        });

        self.IsSaving = ko.observable(false);
        var save = ko.computed(function () {
            var cashDrawerAmount = self.cashDrawerAmount();
             
            if (ko.computedContext.isInitial()) return;
            self.IsSaving(true);
            $.ajax({
                url: '/DailyIncome/SaveDailyCorporationCashDrawer',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({
                    dailyCorporationCashDrawerId: self.dailyCorporationCashDrawerId(),
                    cashDrawerAmount: cashDrawerAmount,
                    dailyServiceDate: getParameterByName('serviceDate')
                })
            }).done(function (data) {
                self.dailyCorporationCashDrawerId(data);
                self.IsSaving(false);
            });;

        });
        save.extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    };
});