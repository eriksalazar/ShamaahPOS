function formatCurrency(value) {
    return "$" + value.toFixed(2);
}

define(['knockout', 'xhr','lodash', 'jquery', 'knockout.mapping', 'utils'], function (ko, xhr, _, $, mapping) {
    "use strict";
    return function () {
        var self = this;

        self.dailyIncomes = ko.observableArray();
       
        self.LineVm = function (data) {
            var self = this;
            self.DailyCompanyServiceIncomeId = ko.observable(data.DailyCompanyServiceIncomeId);
            self.CompanyServiceProvidedId = ko.observable(data.CompanyServiceProvidedId);
            self.CompanyServiceProvidedName = ko.observable(data.CompanyServiceProvidedName);
            self.IncomeAmount = ko.observable(data.IncomeAmount);
            self.DailyCompanyCommission = ko.observable(data.DailyCompanyCommission);
            self.DailyCorporationCommission = ko.observable(data.DailyCorporationCommission);
            self.DailyServiceDate = ko.observable(data.DailyServiceDate);
            self.DailyCorporationIncomeTotal = ko.pureComputed(function () {
                return parseFloat(self.IncomeAmount() ? self.IncomeAmount() : 0) + parseFloat(self.DailyCompanyCommission() ? self.DailyCompanyCommission() : 0) + parseFloat(self.DailyCorporationCommission() ? self.DailyCorporationCommission() : 0);
            });
            self.DailyCompanyIncomeTotal = ko.pureComputed(function () {
                return parseFloat(self.IncomeAmount() ? self.IncomeAmount() : 0) + parseFloat(self.DailyCompanyCommission() ? self.DailyCompanyCommission() : 0);
            });
            self.ManualCompanyServiceName = ko.observable(data.ManualCompanyServiceName);
            self.IsPayout = ko.observable(data.IsPayout);
            var save = ko.computed(function () {
                var incomeAmount = self.IncomeAmount();
                if (ko.computedContext.isInitial()) return;

                alert('here ' + self.DailyCompanyServiceIncomeId());
            });
            save.extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
        };
        
       
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
        self.GrandTotal = ko.pureComputed(function () {
            var total = 0;
            $.each(self.dailyIncomes(), function () { total += parseFloat(this.DailyCorporationIncomeTotal() ? this.DailyCorporationIncomeTotal() : 0) });
            return total;
        });

        self.save = function () {
            xhr.jsonPost('/dailyIncome/save', mapping.toJS(self.dailyIncomes()));
           

        };


        self.addDailyIncome = function () {
            self.dailyIncomes.push(new self.LineVm({
                DailyCorporationIncomeId: null, CompanyServiceProvidedId: null, IncomeAmount: 0,
                DailyCompanyCommission: 0, DailyCorporationCommission: 0, DailyServiceDate: getParameterByName('serviceDate'),
                ManualCompanyServiceName: null, IsPayout:0
                }));
            
            
        };
        
        self.removeDailyIncome = function (data) {
            self.dailyIncomes.remove(data);
            xhr.jsonPost('/dailyIncome/remove', mapping.toJS(data));
        }
        self.reset =function() { return self.loadData() }

        self.loadData = function () {
            $.ajax({
                url: '/DailyIncome/GetAll',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({
                    serviceDate: getParameterByName('serviceDate')
                })
            }).done(function(data) {

                self.dailyIncomes(_.map(data, function (d) {
                    return new self.LineVm(d);
                }));
            });


           
        };

      

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
