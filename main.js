import { App } from "./components/app/app.js";
import { Telegram } from "./components/telegram/telegram.js";

// Ensure the .app element exists before initializing the App
const appElement = document.querySelector(".app");
if (appElement) {
    const Application = new App(appElement);
} else {
    console.error("Element with class 'app' not found.");
}

// Initialize Telegram
const tg = new Telegram();

if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    const usercard = document.getElementById("usercard");
    
    if (usercard) {
        const p = document.createElement("p");
        p.innerText = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name}`;
        usercard.appendChild(p);
    } else {
        console.error("Element with ID 'usercard' not found.");
    }
} else {
    console.error("Telegram user data is not available.");
}
