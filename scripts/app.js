'use strict';

var app = app || {};

var Phone = {
    index: window.localStorage.getItem("Phone:index"),
    $table: document.getElementById("phones-table"),
    $form: document.getElementById("phones-form"),
    $textarea: document.getElementById("add-phones-form"),
    $button_save: document.getElementById("save"),
    $button_discard: document.getElementById("discard"),

    init: function() {
        if (!Phone.index) {
            window.localStorage.setItem("Phone:index", Phone.index = 1);
        }

        Phone.$form.reset();
        Phone.$button_discard.addEventListener("click", function (event) {
            Phone.$form.reset();
            Phone.$form.id_entry.value = 0;
            $('#phones-table').show();
            $('#phones-form').hide();
            $('#add-phones-form').hide();
        }, true);

        Phone.$form.addEventListener("submit", function (event) {
            var entry = {
                id: parseInt(this.id_entry.value),
                phone: this.phone.value,
                name: this.name.value,
                city: this.city.value,
                gender: this.gender.value,
                zodiac: this.zodiac.value,
                note: this.note.value
            };

            if (entry.id == 0) {
                Phone.storeAdd(entry);
                Phone.tableAdd(entry);
            }

            else {
                Phone.storeEdit(entry);
                Phone.tableEdit(entry);
            }

            this.reset();
            this.id_entry.value = 0;
            event.preventDefault();
            $('#phones-table').show();
            $('#phones-form').hide();
            $('#add-phones-form').hide();
        }, true);

        Phone.$textarea.addEventListener("submit", function (event) {
            var entry = {
            };
            var inputLines = document.getElementById('inputText').value;
            var lines = inputLines.split(/\n/);
            for(var j = 0; j <= lines.length; j++){
                var inputLine = lines[j].split(/\t/);
                for (var k = 0; k <= inputLine.length; k++) {
                    entry.id = k;
                    switch (k) {
                        case 0:
                            entry.phone = inputLine[k];
                            break;
                        case 1:
                            entry.name = inputLine[k];
                            break;
                        case 2:
                            entry.city = inputLine[k];
                            break;
                        case 3:
                            entry.gender = inputLine[k];
                            break;
                        case 4:
                            entry.zodiac = inputLine[k];
                            break;
                        case 5:
                            entry.note = inputLine[k];
                            break;
                        default:

                    }
                }
                Phone.storeAdd(entry);
                if(inputLine.length >= 3) {
                    Phone.tableAdd(entry);
                    $('#phones-table').show();
                    $('#phones-form').hide();
                    $('#add-phones-form').hide();
                }
            }
            this.reset();

        }, true);

        if (window.localStorage.length - 1) {
            var phones_list = [], i, key;
            for (i = 0; i < window.localStorage.length; i++) {
                key = window.localStorage.key(i);
                if (/Phone:\d+/.test(key)) {
                    phones_list.push(JSON.parse(window.localStorage.getItem(key)));
                }
            }

            if (phones_list.length) {
                phones_list.forEach(Phone.tableAdd);
            }
        }

        Phone.$table.addEventListener("click", function(event) {
            var op = event.target.getAttribute("data-op");
            if (/details|edit|remove/.test(op)) {
                var entry = JSON.parse(window.localStorage.getItem("Phone:"+ event.target.getAttribute("data-id")));
                if (op == "edit") {
                    $('#phones-form').show();
                    $('#phones-table').hide();
                    $('#add-phones-form').hide();
                    $('#button-wrapper').show();

                    Phone.$form.phone.value = entry.phone;
                    Phone.$form.name.value = entry.name;
                    Phone.$form.city.value = entry.city;
                    Phone.$form.gender.value = entry.gender;
                    Phone.$form.zodiac.value = entry.zodiac;
                    Phone.$form.note.value = entry.note;
                    Phone.$form.id_entry.value = entry.id;
                }

                if (op == "details") {
                    $('#phones-form').show();
                    $('#phones-table').hide();
                    $('#add-phones-form').hide();
                    $('#button-wrapper').hide();
                    Phone.$form.phone.value = entry.phone;
                    Phone.$form.name.value = entry.name;
                    Phone.$form.city.value = entry.city;
                    Phone.$form.gender.value = entry.gender;
                    Phone.$form.zodiac.value = entry.zodiac;
                    Phone.$form.note.value = entry.note;
                    Phone.$form.id_entry.value = entry.id;

                }

                else if (op == "remove") {
                    if (confirm('Are you sure you want to remove "'+ entry.phone +'" from your contacts?')) {
                        Phone.storeRemove(entry);
                        Phone.tableRemove(entry);
                    }
                }

                event.preventDefault();
            }
        }, true);
    },

    storeAdd: function(entry) {
        entry.id = Phone.index;
        window.localStorage.setItem("Phone:index", ++Phone.index);
        window.localStorage.setItem("Phone:"+ entry.id, JSON.stringify(entry));
    },

    storeEdit: function(entry) {
        window.localStorage.setItem("Phone:"+ entry.id, JSON.stringify(entry));
    },

    storeRemove: function(entry) {
        window.localStorage.removeItem("Phone:"+ entry.id);
    },

    tableAdd: function(entry) {
        var $tr = document.createElement("tr"), $td, key;
        for (key in entry) {
            if (entry.hasOwnProperty(key)) {
                if((key != "zodiac")&&(key  != "note")) {
                    $td = document.createElement("td");
                    $td.appendChild(document.createTextNode(entry[key]));
                    $tr.appendChild($td);
                }
            }
        }

        $td = document.createElement("td");
        $td.innerHTML = '<a data-op="details" data-id="'+ entry.id +'">Details</a> | <a data-op="edit" data-id="'
        + entry.id +'">Edit</a> | <a data-op="remove" data-id="'+ entry.id +'">Remove</a>';
        $tr.appendChild($td);
        $tr.setAttribute("id", "entry-"+ entry.id);
        Phone.$table.appendChild($tr);
    },

    tableEdit: function(entry) {
        var $tr = document.getElementById("entry-"+ entry.id), $td, key;
        $tr.innerHTML = "";
        for (key in entry) {
            if (entry.hasOwnProperty(key)) {
                if((key != "zodiac")&&(key  != "note")) {
                    $td = document.createElement("td");
                    $td.appendChild(document.createTextNode(entry[key]));
                    $tr.appendChild($td);
                }
            }
        }

        $td = document.createElement("td");
        $td.innerHTML = '<a data-op="details" data-id="'+ entry.id +'">Details</a> | <a data-op="edit" data-id="'
        + entry.id +'">Edit</a> | <a data-op="remove" data-id="'+ entry.id +'">Remove</a>';
        $tr.appendChild($td);
    },

    tableRemove: function(entry) {
        Phone.$table.removeChild(document.getElementById("entry-"+ entry.id));
    }
};

Phone.init();


	