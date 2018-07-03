function credits(amount = 1) {
    return new Item ('credits',1,null,amount);
}

function iron_ore(amount = 1) {
    return new Item ('iron_ore',3,null,amount);
} 

function iron_plate(amount = 1) {
    return new Item ('iron_plate',5,null,amount);
}

function copper_ore(amount = 1) {
    return new Item ('copper_ore',6,null,amount);
} 

function copper_plate(amount = 1) {
    return new Item ('copper_plate',11,null,amount);
}

var allItems = [iron_ore,copper_ore,iron_plate,copper_plate];

function Item(name,value,craftable,amount = 1) {
    this.name = name;
    this.value = value;
    this.amount = amount;
    this.craftable = craftable;
    
    this.getName = function() {
        var result = name;
        result = capitalize(result);
        for (var i = 0; i < result.length; i++)
            if (result.charAt(i) == '_')
                result = result.substr(0,i) + ' ' + capitalize(result.substr(i+1));
        return result;
    }
}

function addItem (source,item,amount = 1) {
    var newAmount;
    for (var i = 0; i < source.length; i++) {
        if (item().name == source[i].name) {
            newAmount = source[i].amount + amount;
            source[i] = item(newAmount);
            return;
        }
    }
    source.push(item(amount));
    $("#inventoryTable>tr:contains(" + item().getName() + ")>td").removeClass("invis")
}

function removeItem (source,item,amount = 1) {
    if (inventoryCount(source,item) < amount)
        alert("Error 2: Tried to remove more of item than is in inventory. " + item().name + " : " + amount);
    else {
        for (var i = 0; i < source.length; i++) {
            if (item().name == source[i].name) {
                source[i].amount -= amount;
                amount = 0;
                break;
            }
        }
    }
}

function buy(given,amount = 1) {
    var playerCredits = inventoryCount(inventory,credits);
    if(playerCredits >= given().value*amount) {
        addItem(inventory,given,amount);
        removeItem(inventory,credits,given().value*amount);
    }   
}

function sell(given,amount = 1) {
    if(given().name != "credits" && inventoryCount(inventory,given) >= amount) {
        addItem(inventory,credits,given().value * amount);
        removeItem(inventory,given,amount);
    }   
}

function inventoryCount(source,given) {
    var total = 0;
    if (!(typeof given === 'function'))
        return 0;
    for (var i = 0; i < source.length; i++) {
        if (source[i].name == given().name)
            total += source[i].amount;
    }
    return total;
}