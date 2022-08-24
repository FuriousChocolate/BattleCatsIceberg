// imports the entries from the json file
import {entries} from './entries.js';
entries.sort(function(a,b) {
    return a.tier - b.tier;
})

// Gives a warning if the user is on mobile because I'm so bad at css the wesite looks horrible on non PC devices lmao.
let mode = "computer";
window.mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};
window.onload = function noMobile() { 
    if(window.mobileAndTabletCheck() || "ontouchstart" in document.documentElement) {
        // true for mobile device
        alert("The battle cats iceberg was not designed for mobile devices, especially phones, and it is highly reccomended that you use acess it from a computer.");
        mode = "mobile";
        //document.getElementById("content").innerHTML = "<h1>We're sorry, but The Battle Cats Iceberg doesn't work on mobile devices. Please try again from a computer.</h1>"
    } 
} 

// An array for the button spacing on each tier because I was too lazy to figure out a way to do it with css. Units are in rems.
const buttonSpacing = [0.07, 0, 0.02, 0.01, 0.02, 0, 0, 0];
// creates a clickable text for each entry.

// loops through each tier and adds buttons. 
for (let tier = 1; tier <= 8; tier++) {
    let innerHTML = "";
    // Selects the correct div for the current tier.
    const div = document.getElementById("tier" + tier);
    // Adds each entry to the current tier, only if it is supposed to be there.
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].tier == tier) {
            innerHTML += "<button style=\"margin: " + buttonSpacing[tier - 1] + "rem;\" class=\"btn btn-primary\" id=\"" + i + "\">" + "<h6 class=\"impact\">" + entries[i].name + "</h6>" + "</button>"
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
    if (entries[id].media == "none") {
        // Sets the image to a basic image that says "no media available" if there is no media to display for the current entry.
        // I don't think this loading icon even works lmao.
        // mediaImage = "<img id=\"entry-image-" + mode + "\" src=\"media/LoadingIcon.gif\">";
        document.getElementById("entry-description-media").innerHTML = "";
        // document.getElementById("entry-image-" + mode).src = "media/NoMedia.svg";
    }
    else if (entries[id].mediaType == "image") {
        // I don't think this loading icon even works lmao.
        mediaImage = "<img id=\"entry-image-" + mode + "\" src=\"media/LoadingIcon.gif\">";
        document.getElementById("entry-description-media").innerHTML = mediaImage;
        document.getElementById("entry-image-" + mode).src = "media/" + entries[id].media;
        // 
    }
    else if (entries[id].mediaType == "HTML") {
        mediaImage = entries[id].media;
        document.getElementById("entry-description-media").innerHTML = mediaImage;
    }
    // Updates all the content on the webpage so it is displaying the right stuff.
    document.getElementById("entry-description-title").innerHTML = "<h1>" + entries[id].name + "</h1>";
    document.getElementById("entry-description-content").innerHTML = "<h2 style=\"padding-top: 1rem;\">Description</h2><p><h4>" + entries[id].description + "</h4></p>";
    document.getElementById("entry-info").innerHTML = "(Tier: " + entries[id].tier + ") Entry No." + (id + 1) + " - " + entries[id].name
    // Makes the old entry slighlty dimmer.
    document.getElementById(selectedEntry).style.color = "#ffffff";
    // Makes the selected entry brighter.
    document.getElementById(id).style.color = "#9cc7ff";
    // Updates the selected entry to be the current one.
    selectedEntry = id;
    return;
}

if (mode == "computer") {
    document.getElementById("prev-entry-btn").addEventListener("click", selectPrevious);
    document.getElementById("next-entry-btn").addEventListener("click", selectNext);
} 
else {
    document.getElementById("prev-entry-btn").addEventListener("touchstart", selectPrevious);
    document.getElementById("next-entry-btn").addEventListener("touchstart", selectNext);
}

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