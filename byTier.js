import entries from './entries.json' assert {type: 'json'};
entries.sort(function(a,b) {
    return b.tier - a.tier;
})

let tierString = location.search.substring(1);
let tier = tierString.charAt(4);
let tierName = "Tier " + tier;

document.getElementById("tier-name").innerHTML = tierName;


// Selects the correct div for the current tier.
const div = document.getElementById("tier-content");
// Adds each entry to the current tier, only if it is supposed to be there.
for (let i = 0; i < entries.length; i++) {
    if (entries[i].tier == tier) {
        div.innerHTML += "<button class=\"btn btn-primary\" id=\"" + i + "\">" + "<h6>" + entries[i].name + "</h6>" + "</button> •"
    }
}
for (let i = 0; i < entries.length; i++) {
    if (entries[i].tier == tier) {
        document.getElementById(i).addEventListener("click", function(){changeSelected(i)});
    }
}

let selectedEntry = "0"
function changeSelected(id) {
    let mediaImage;
    console.log(entries[id].mediaType)
    if (entries[id].media == "none") {
        mediaImage = "<img class=\"entry-image\" src=\"media/NoMedia.svg\">";
    }
    else if (entries[id].mediaType == "image") {
        mediaImage = "<img class=\"entry-image\" src=\"media/" + entries[id].media + "\">";
    }
    else if (entries[id].mediaType == "HTML") {
        mediaImage = entries[id].media;
    }
    document.getElementById("entry-description").innerHTML = "<h1>" + entries[id].name + "</h1><hr>" + mediaImage + "<h2 style=\"padding-top: 1rem;\">Description</h2><p><h4>" + entries[id].description + "</h4></p>";
    document.getElementById(selectedEntry).style.color = "#cfcfcf";
    document.getElementById(id).style.color = "#ffffff";
    selectedEntry = id;
    return;
}