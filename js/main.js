var inventory = [iron_ore(4),copper_ore(4)];

var smeltable = {iron_ore:iron_plate,copper_ore:copper_plate};

var miners = {iron_ore:0};
var smelters = {iron_ore:0};

var ticks = 0;

makeInventory();
makeWorkshop();
setInterval(tick, 20);

function tick() {
    if (ticks % 10 == 0)
        mine();
    else if (ticks % 10 == 5)
        runSmelters();
    updateCredits();
    updateInventory();
    ticks++;
}

function mine() {
    for (var i in miners)
        if (miners[i])
            addItem(inventory,window[i],miners[i]*0.01);
}

function runSmelters() {
    for (var i in smelters)
        if (smelters[i])
            smelt(window[i],smelters[i]*0.01);
        
}

function buyMiner() {
    miners.iron_ore++;
}

function buySmelter() {
    smelters.iron_ore++;
}

function smelt(item, amount=1) {
    if (inventoryCount(inventory,item) >= amount) {
        removeItem(inventory,item,amount);
        addItem(inventory,smeltable[item.name],amount);
    }
    else
        console.log ("Nothing to smelt.")
}

function makeInventory() {
    var curr = "";
    for (var i = 0; i < allItems.length; i++) {
        curr += "<tr id='" + allItems[i]().name + "'>";
        if (inventory[i]) {
            curr += "<td>" + allItems[i]().getName() + ":</td>";
            curr += "<td class='amount'>" + Math.round(inventory[i].amount * 100) / 100 + "</td>";
            curr += "<td>/" + inventory[i].max + "</td>";
        }
        else {
            curr += "<td class='invis'>" + allItems[i]().getName() + "</td>";
            curr += "<td class='amount invis'>0</td>";
            curr += "<td>" + allItems[i]().max + "</td>";
        }
        curr += "</tr>";
    }
    
    $("#inventoryTable").html(curr);
}

function updateInventory() {
    for (var i = 0; i <  inventory.length; i++)
        $("#"+inventory[i].name).find(".amount").html(Math.round(inventory[i].amount * 100) / 100);
}

function updateCredits() {
    $("#credits").html("Credits: " + credits);
}

function makeWorkshop() {
    var curr = "";
    for (var i = 0; i < inventory.length; i++) {
        curr += "<tr>";
        if (smeltable[inventory[i].name])
            curr += "<td class='pointer' onclick='smelt(" + inventory[i].name + ")'>Smelt</td>";
        curr += "</tr>";
    }
    $("#actionTable").html(curr);
}

function makeStore() {
    var curr = "";
    for (var i = 0; i < allItems.length; i++) {
        curr += "<tr>";
        curr += "<td class='pointer' onclick='buy(" + allItems[i].name + ")'>Buy</td>";
        curr += "<td class='pointer' onclick='sell(" + allItems[i].name + ")'>Sell</td>";
        curr += "</tr>";
    }
    $("#actionTable").html(curr);
}