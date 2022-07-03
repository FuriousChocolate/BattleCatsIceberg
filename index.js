// imports the entries from the json file
import entries from './entries.json' assert {type: 'json'};
entries.sort(function(a,b) {
    return a.tier - b.tier;
})

// creates a clickable text for each entry.

// loops through each tier and adds buttons. 
for (let tier = 1; tier <= 8; tier++) {

    let innerHTML = "";
    // Selects the correct div for the current tier.
    const div = document.getElementById("tier" + tier);
    // Adds each entry to the current tier, only if it is supposed to be there.
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].tier == tier) {
            innerHTML += "<button class=\"btn btn-primary\" id=\"" + i + "\">" + "<h6 class=\"impact\">" + entries[i].name + "</h6>" + "</button>"
        }
    }
    // Once all the correct entries have been put together, they are put inside the div.
    div.innerHTML = innerHTML;
}
// makes the buttons clickable
for (let i = 0; i < entries.length; i++) {
    document.getElementById(i).addEventListener("click", function(){changeSelected(i)});
    document.getElementById(i).addEventListener("touchstart", function(){changeSelected(i)});
}

let selectedEntry = 0
// changes the selected entry to the entry of whatever id was passed in.
function changeSelected(id) {
    // Retrieves the media image. Formats it as an image if the type is image, or if the type is HTML, doesn't add any formatting.
    let mediaImage;
    console.log(entries[id].mediaType)
    if (entries[id].media == "none") {
        // Sets the image to a basic image that says "no media available" if there is no media to display for the current entry.
        mediaImage = "<img class=\"entry-image\" src=\"media/NoMedia.svg\">";
    }
    else if (entries[id].mediaType == "image") {
        mediaImage = "<img class=\"entry-image\" src=\"media/" + entries[id].media + "\">";
    }
    else if (entries[id].mediaType == "HTML") {
        mediaImage = entries[id].media;
    }
    // Updates all the content on the webpage so it is displaying the right stuff.
    document.getElementById("entry-description-title").innerHTML = "<h1>" + entries[id].name + "</h1>";
    document.getElementById("entry-description-media").innerHTML = mediaImage;
    document.getElementById("entry-description-content").innerHTML = "<h2 style=\"padding-top: 1rem;\">Description</h2><p><h4>" + entries[id].description + "</h4></p>";
    document.getElementById("entry-info").innerHTML = "(Tier: " + entries[id].tier + ") Entry No." + (id + 1) + " - " + entries[id].name
    // Makes the old entry slighlty dimmer.
    document.getElementById(selectedEntry).style.color = "#cfcfcf";
    // Makes the selected entry brighter.
    document.getElementById(id).style.color = "#ffffff";
    // Updates the selected entry to be the current one.
    selectedEntry = id;
    return;
}


document.getElementById("prev-entry-btn").addEventListener("click", selectPrevious);
document.getElementById("prev-entry-btn").addEventListener("touchstart", selectPrevious);
document.getElementById("next-entry-btn").addEventListener("click", selectNext);
document.getElementById("next-entry-btn").addEventListener("touchstart", selectNext);
// changes the selected entry to the next one. If it is alredy the final entry, nothing happens.
function selectNext() {
    if (selectedEntry == entries.length) {
        return;
    }
    else {
        changeSelected(selectedEntry + 1);
    }
}

// changes the selected entry to the previous one. If it is alredy the first entry, nothing happens.
function selectPrevious() {
    if (selectedEntry <= 0) {
        return;
    }
    else {
        changeSelected(selectedEntry - 1);
    }
}

// Makes it so you can press left and right arrow keys instead of using the buttons.
document.addEventListener('keyup', (event) => {
    let name = event.key;
    if (name == "ArrowLeft") {
        selectPrevious();
    }
    else if (name == "ArrowRight") {
        selectNext();
    }
}, false);