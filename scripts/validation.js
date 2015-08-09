'use strict';

function validateForm() {
    var phone = document.forms["phones-form"]["phone"].value;
    var allNumbers = [];
    var allName = [];
    for (var i = 1; i < localStorage.length; i++){
        var entryId= "Phone:" + i;
        var entry = localStorage.getItem(entryId);
        var entrySplit = entry.split(',');
        var numberSplit = entrySplit[1].split(':');
        var nameSplit = entrySplit[2].split(':');
        var number = numberSplit[1].split('"');
        var names = nameSplit[1].split('"');
        allName.push(names[1]);
        allNumbers.push(number[1]);
    }

    if(allNumbers.indexOf(phone) != -1){
        alert("Phone already exist.");
        return false;
    }


    if ((phone.charAt(0) != '0' && phone.charAt(0) !== '+')){
        alert("Phone must be start with '0' or '+'. ");
        return false;
    }

    else if(phone.length < 5 || phone.length > 12){
        alert("Phone must be between 5 and 12.");
        return false;
    }

    else if(isNaN(phone)){
        alert("Phone must be a number.");
        return false;
    }

    else if(isNaN(phone)){
        alert("Phone must be a number.");
        return false;
    }

    var name = document.forms["phones-form"]["name"].value;
    if(allName.indexOf(name) != -1){
        alert("Name already exist.");
        return false;
    }

    if(name.length > 30){
        alert("Name must be between 1 and 30.");
        return false;
    }

    var city = document.forms["phones-form"]["city"].value;
    if(city.length > 30){
        alert("City must be between 1 and 30.");
        return false;
    }

    var note = document.forms["phones-form"]["note"].value;
    if(note.length > 500){
        alert("Note must be between 1 and 50.");
        return false;
    }
}
