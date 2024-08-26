let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let selectedItem = "";

// Функция для обработки нажатия на кнопки
function handleButtonClick(button, itemId) {
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
        selectedItem = "";
    } else {
        tg.MainButton.setText(`Вы выбрали товар ${itemId}`);
        selectedItem = itemId;
        tg.MainButton.show();
    }
}

// Навешиваем обработчики на все кнопки
document.querySelectorAll('.item-btn').forEach((button, index) => {
    button.addEventListener('click', () => handleButtonClick(button, index + 1));
});

// Отправка данных при нажатии на главную кнопку Telegram
Telegram.WebApp.onEvent("mainButtonClicked", function() {
    tg.sendData(selectedItem);
});

// Отображение информации о пользователе
let usercard = document.getElementById("usercard");

if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    let firstName = tg.initDataUnsafe.user.first_name || "";
    let lastName = tg.initDataUnsafe.user.last_name || "";
    let p = document.createElement("p");
    p.innerText = `${firstName} ${lastName}`.trim();
    usercard.appendChild(p);
} else {
    console.error("Telegram user data is not available.");
}
