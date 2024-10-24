"use strict"

// TODO: make this more sophisticated.
// For example if a barbarian's highest stat is intelligence the output could be
//  "Impossible! Where did a creature like you pop out from."
function generateGreeting(characterInfo)
{
    let output = `Welcome ${characterInfo["name"]}!<br>`
        + `Although you are a ${characterInfo["race"]} ${characterInfo["class"]} `;

    switch (characterInfo["strongestStat"]) {
        case "strength":
        {
            output += `with devilish strength, `;
        } break;
        case "dexterity":
        {
            // NOTE: I like this style more than the "with ..."
            output += `unparalleled in finesse, `;

        } break;
        case "constitution":
        {
            output += `of sturdy construction, `;

        } break;
        case "intelligence":
        {
            output += `with peerless intelligence, `;

        } break;
        case "wisdom":
        {
            output += `with extraodinary perception, `;

        } break;
        case "charisma":
        {
            output += `with dazzling charisma, `;

        } break;

        // NOTE: default here should always write out an error
        default:
        {
            output = "An error occured. Strongest stat was not recognized.";
        } return output;
    }

    output += `it seems `

    switch (characterInfo["weakestStat"]) {
        case "strength":
        {
            output += `thou art as feeble as a sickly lamb! `;
        } break;
        case "dexterity":
        {
            // NOTE: I like this style more than the "with ..."
            output += `thy touch is as graceful as a drunken bear! `;

        } break;
        case "constitution":
        {
            output += `thou art as sturdy as a house of cards! `;

        } break;
        case "intelligence":
        {
            output += `thou art a faint-hearted dolt! `;

        } break;
        case "wisdom":
        {
            output += `thou hast the judgment of a drunken goat! `;

        } break;
        case "charisma":
        {
            output += `thy presence is duller than a dead fish! `;

        } break;

        // NOTE: default here should always write out an error
        default:
        {
            output = "An error occured. Weakest stat was not recognized.";
        } return output;
    }


    output += `Let's meet as little as possible.`

    return output;
}

// FIXME: extract to a main function
document.addEventListener("DOMContentLoaded", () => {
    const characterInfoForm = document.getElementById("CharacterInfoForm");
    const nameInput = document.getElementById("NameInput");
    const raceInput = document.getElementById("RaceInput");
    const classInput = document.getElementById("ClassInput");
    const strongestStatInput = document.getElementById("StrongestStatInput");
    const weakestStatInput = document.getElementById("WeakestStatInput");
    const output = document.getElementById("Output");

    // If there is a previous attempt in local storage load in the values
    if (localStorage.previousAttempt) {
        const previousAttempt = JSON.parse(localStorage.previousAttempt);

        nameInput.value = previousAttempt["name"];
        raceInput.value = previousAttempt["race"];
        classInput.value = previousAttempt["class"];
        strongestStatInput.value = previousAttempt["strongestStat"];
        weakestStatInput.value = previousAttempt["weakestStat"];
        output.innerHTML = previousAttempt["output"];
    }

    characterInfoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        output.innerHTML = "";

        // TODO: validate weakest and strongeset are not the same
        const attempt = {
            "name": nameInput.value,
            "race": raceInput.value,
            "class": classInput.value,
            "strongestStat": strongestStatInput.value,
            "weakestStat": weakestStatInput.value
        }

        let greeting = generateGreeting(attempt);
        attempt["output"] = greeting;
        output.innerHTML = greeting;

        localStorage.previousAttempt = JSON.stringify(attempt);
    });
});
