var inventory = [iron_ore(4),copper_ore(4)];

var smeltable = {iron_ore:iron_plate,copper_ore:copper_plate};

var miners = {iron_ore:0};

updateInventory();
updateWorkshop();
setInterval(tick, 200);

function tick() {
    mine();
}

function mine() {
    for (var i in miners)
        addItem(inventory,window[i],miners[i]*0.01);
}

function buyMiner() {
    miners.iron_ore++;
}

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
        curr += "<td class='amount'>" + Math.round(inventory[i].amount * 100) / 100 + "</td>";
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