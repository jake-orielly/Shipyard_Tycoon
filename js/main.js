var inventory = [iron_ore(4),copper_ore(4)];

var smeltable = {iron_ore:iron_plate,copper_ore:copper_plate};

updateInventory();
updateWorkshop();

function smelt(item) {
    if (inventoryCount(inventory,item)) {
        removeItem(inventory,item);
        addItem(inventory,smeltable[item.name]);
        updateWorkshop()
    }
    else
        console.log ("Nothing to smelt.")
}

function updateInventory() {
    var curr = "";
    for (var i = 0; i < inventory.length; i++) {
        curr += "<tr>";
        curr += "<td>" + inventory[i].getName() + "</td>";
        curr += "<td>" + inventory[i].amount + "</td>";
        curr += "</tr>";
    }
    
    $("#inventoryTable").html(curr);
}

function updateWorkshop() {
    var curr = "";
    for (var i = 0; i < inventory.length; i++) {
        curr += "<tr>";
        if (smeltable[inventory[i].name])
            curr += "<td onclick='smelt(" + inventory[i].name + ")'>Smelt</td>";
        curr += "</tr>";
    }
    $("#actionTable").html(curr);
}

function updateStore() {
    var curr = "";
    for (var i = 0; i < shopItems.length; i++) {
        curr += "<tr>";
        curr += "<td onclick='buy(" + shopItems[i].name + ")'>Buy</td>";
        curr += "<td onclick='sell(" + shopItems[i].name + ")'>Sell</td>";
        curr += "</tr>";
    }
    $("#actionTable").html(curr);
}