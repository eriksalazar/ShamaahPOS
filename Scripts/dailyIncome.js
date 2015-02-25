function formatCurrency(value) {
    return "$" + value.toFixed(2);
}

define(['knockout', 'xhr', 'jquery', 'knockout.mapping'], function (ko, xhr, $, mapping) {
    "use strict";
    return function () {
        var self = this;

        self.dailyIncomes = ko.observableArray();
       
        self.lineVM = function (data) {
            var self = this;
            self.DailyCorporationIncomeId = ko.observable(data.DailyCorporationIncomeId);
            self.CompanyServiceProvidedId = ko.observable(data.CompanyServiceProvidedId)
            self.DailyCorporationIncomeAmount = ko.observable(data.DailyCorporationIncomeAmount);
            self.DailyCorporationIncomeCompanyCommission = ko.observable(data.DailyCorporationIncomeCompanyCommission);
            self.DailyCorporationIncomeCommission = ko.observable(data.DailyCorporationIncomeCommission);
            self.DailyCorporationIncomeDate = ko.observable(data.DailyCorporationIncomeDate);
            self.DailyCorporationIncomeTotal = ko.computed(function () { return self.DailyCorporationIncomeAmount() ? parseFloat(self.DailyCorporationIncomeAmount()) + parseFloat(self.DailyCorporationIncomeCommission()) + parseFloat(self.DailyCorporationIncomeCompanyCommission()) : 0 });
            self.DailyCompanyIncomeTotal = ko.computed(function () { return self.DailyCorporationIncomeAmount() ? parseFloat(self.DailyCorporationIncomeAmount()) + parseFloat(self.DailyCorporationIncomeCompanyCommission()) : 0 });
            self.ManualCompanyServiceName = ko.observable(data.ManualCompanyServiceName);
        };
        
       
        self.IncomeAmountGrandTotal = ko.computed(function () {
            var total = 0;
            $.each(self.dailyIncomes(), function () { total += parseFloat(this.DailyCorporationIncomeAmount()) })
            return total;
        });
        self.CommissionCompanyAmountGrandTotal = ko.computed(function () {
            var total = 0;
            $.each(self.dailyIncomes(), function () { total += parseFloat(this.DailyCorporationIncomeCompanyCommission()) })
            return total;
        });
        self.CompanyAmountGrandTotal = ko.computed(function () {
            var total = 0;
            $.each(self.dailyIncomes(), function () { total += this.DailyCompanyIncomeTotal() })
            return total;
        });
        self.CommissionCorporationAmountGrandTotal = ko.computed(function () {
            var total = 0;
            $.each(self.dailyIncomes(), function () { total += parseFloat(this.DailyCorporationIncomeCommission()) })
            return total;
        });
        self.GrandTotal = ko.computed(function () {
            var total = 0;
            $.each(self.dailyIncomes(), function () { total += this.DailyCorporationIncomeTotal() })
            return total;
        });

        self.save = function () {
            xhr.jsonPost('/dailyIncome/save', mapping.toJS(self.dailyIncomes()));
           

        };
        self.addDailyIncome = function () {
            self.dailyIncomes.push(new self.lineVM({
                DailyCorporationIncomeId: null, CompanyServiceProvidedId: null, DailyCorporationIncomeAmount: 0,
                DailyCorporationIncomeCompanyCommission: 0, DailyCorporationIncomeCommission: 0, DailyCorporationIncomeDate: '3/04/2014',
                ManualCompanyServiceName: null 
                }));
            
            
        };
        
        self.removeDailyIncome = function (data) {
            self.dailyIncomes.remove(data);
            xhr.jsonPost('/dailyIncome/remove', mapping.toJS(data));
        }
        self.reset =function() { return self.loadData() }

        self.loadData = function () {
            xhr.jsonPost('/dailyIncome/getAll').done(function (data) {
                //var mappedDailyIncomes = $.map(allData, function (item) { return new DailyIncome(item) });
                var a = [];
                for(var i=0; i<data.length; i++){
                    var line = data[i];

                   var q = new self.lineVM(line);
                    a.push(q);
                }
                self.dailyIncomes(a);

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
