'use strict';

var app = app || {};

(function () {
    var selector = '#wrapper';

    app.router = Sammy(function () {
        this.get('#/', function (){
            if (window.localStorage.getItem("Phone:index") > 1) {
                app.router.setLocation("#/all-phones");
            }

            else {
                app.router.setLocation("#/add-phone");
            }
        });

        this.get('#/all-phones', function (){
            $('#phones-table').show();
            $('#phones-form').hide();
            $('#add-phones-form').hide();
        });

        this.get('#/add-phone', function () {
            $('#phones-table').hide();
            $('#phones-form').show();
            $('#add-phones-form').hide();
            $('#button-wrapper').show();
        });

        this.get('#/import-phones', function () {
            $('#phones-table').hide();
            $('#phones-form').hide();
            $('#add-phones-form').show();
        });
    });

    app.router.run('#/');
}());


