
define(['knockout', 'lodash', 'jquery', 'knockout.mapping', 'utils'], function (ko, _, $, mapping) {

    return function (data) {
        var self = this;
        self.dailyCorporationWithdrawalId = ko.observable(data.DailyCorporationWithdrawalId);
        self.corporationId = ko.observable(data.CorporationId);
        self.withdrawalTypeId = ko.observable(data.WithdrawalTypeId);
        self.withdrawalTypeName = ko.observable(data.WithdrawalTypeName);
        self.withdrawalAmount = ko.observable(data.WithdrawalAmount);
        self.withdrawalDate = ko.observable(data.WithdrawalDate);
        self.withdrawalDescription = ko.observable(data.WithdrawalDescription);
        self.withdrawalAmountTotal = ko.pureComputed(function () {
            return parseFloat(self.withdrawalAmount() ? self.withdrawalAmount() : 0);
        });

        self.IsSaving = ko.observable(false);
        var save = ko.computed(function () {
            var withdrawalAmount = self.withdrawalAmount();
            var withdrawalDescription = self.withdrawalDescription();
            if (ko.computedContext.isInitial()) return;
            self.IsSaving(true);
            $.ajax({
                url: '/DailyIncome/SaveDailyCorporationWithdrawal',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({
                    dailyCorporationWithdrawalId: self.dailyCorporationWithdrawalId(),
                    withdrawalAmount: withdrawalAmount,
                    withdrawalDescription: withdrawalDescription,
                    dailyServiceDate: getParameterByName('serviceDate')
                })
            }).done(function (data) {
                self.dailyCorporationWithdrawalId(data);
                self.IsSaving(false);
            });;

        });
        save.extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    };
});