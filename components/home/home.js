export class Home {
  constructor(data, hostElement) {
    this.data = data;
    this.hostElement = hostElement;

    // Шаблон с правильной структурой контейнеров
    this.template = `
        <div class="container">
            <div class="inner"></div> <!-- Этот блок будет содержать элементы (item) -->
            <div class="usercard" id="usercard"></div> <!-- Карточка пользователя -->
        </div>
      `;

    this.container = null;
    this.WebApp = window.Telegram.WebApp;
    this.render();
  }

  render() {
    // Вставляем шаблон в hostElement и находим блок "inner"
    this.hostElement.innerHTML = this.template;
    this.container = this.hostElement.querySelector(".inner");
    
    // Вызываем методы рендеринга и обработки событий
    this.renderCarts();
    this.applyHandler();
  }

  applyHandler() {
    // Добавляем обработчик кликов для кнопок внутри "inner"
    this.container.addEventListener("click", this.onClick.bind(this));
  }

  onClick(event) {
    const current = event.target;

    // Проверяем, что клик был по кнопке с классом "item__btn"
    if (!current.classList.contains("item__btn")) {
      return;
    }

    console.log("Товар" + " " + current.id); // Отображаем ID товара
  }

  renderCarts() {
    let text = "";

    // Генерируем HTML для каждого элемента в data и добавляем его в text
    this.data.forEach((el, i) => {
      let item = `
        <a href="#about/item=${i}" class="item">
          <div class="img__box">
              <img src="${el.img[0]}" alt="" class="img">
          </div>
          <p class="price">${el.price}</p>
          <p class="name_item">${el.name}</p>
          <button class="btn item__btn" id="${i}">+ Добавить</button>
        </a>`;
      text += item; // Добавляем каждый item к общему тексту
    });

    // Вставляем сгенерированный HTML в контейнер
    this.container.innerHTML = text;
  }
}
