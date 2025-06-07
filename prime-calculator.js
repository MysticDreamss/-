document.addEventListener('DOMContentLoaded', () => {
  const accounts = [];
  const cases = [];
  const skins = [];

  // Модальные окна
  const accountModal = document.getElementById('account-modal');
  const caseModal = document.getElementById('case-modal');
  const skinModal = document.getElementById('skin-modal');

  // Кнопки открытия модальных окон
  document.getElementById('add-account-btn').addEventListener('click', () => {
    // Сброс формы и подготовка к добавлению
    document.getElementById('account-form').reset();
    accountModal.dataset.mode = 'add'; // Устанавливаем режим добавления
    document.querySelector('#account-modal h2').textContent = 'Добавить аккаунт';
    document.querySelector('#account-form button[type="submit"]').textContent = 'Добавить';
    accountModal.style.display = 'block';
  });

  document.getElementById('add-case-btn').addEventListener('click', () => {
    document.getElementById('case-form').reset();
    caseModal.dataset.mode = 'add';
    document.querySelector('#case-modal h2').textContent = 'Добавить кейс';
    document.querySelector('#case-form button[type="submit"]').textContent = 'Добавить';
    caseModal.style.display = 'block';
  });

  document.getElementById('add-skin-btn').addEventListener('click', () => {
    document.getElementById('skin-form').reset();
    skinModal.dataset.mode = 'add';
    document.querySelector('#skin-modal h2').textContent = 'Добавить скин';
    document.querySelector('#skin-form button[type="submit"]').textContent = 'Добавить';
    skinModal.style.display = 'block';
  });

  // Кнопки закрытия модальных окон
  document.getElementById('close-account-modal').addEventListener('click', () => {
    accountModal.style.display = 'none';
  });
  document.getElementById('close-case-modal').addEventListener('click', () => {
    caseModal.style.display = 'none';
  });
  document.getElementById('close-skin-modal').addEventListener('click', () => {
    skinModal.style.display = 'none';
  });

  // Добавление/Редактирование аккаунта
  document.getElementById('account-form').addEventListener('submit', (e) => {
    e.preventDefault();
   const nickname = document.getElementById('account-nickname').value;
   const balance = parseFloat(document.getElementById('account-balance').value);

    const mode = accountModal.dataset.mode;
    const index = parseInt(accountModal.dataset.editIndex); // Получаем индекс для редактирования

    if (mode === 'add') {
      accounts.push({ nickname, balance });
    } else if (mode === 'edit' && !isNaN(index) && accounts[index]) {
      accounts[index].nickname = nickname;
      accounts[index].balance = balance;
    }

    displayAccounts();
    accountModal.style.display = 'none';
    document.getElementById('account-form').reset();
  });

  // Добавление/Редактирование кейса
  document.getElementById('case-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('case-name').value;
    const quantity = parseInt(document.getElementById('case-quantity').value);
    const price = parseFloat(document.getElementById('case-price').value);
    const mode = caseModal.dataset.mode;
    const index = parseInt(caseModal.dataset.editIndex);

    if (mode === 'add') {
      cases.push({ name, quantity, price });
    } else if (mode === 'edit' && !isNaN(index) && cases[index]) {
      cases[index].name = name;
      cases[index].quantity = quantity;
      cases[index].price = price;
    }

    displayCases();
    caseModal.style.display = 'none';
    document.getElementById('case-form').reset();
  });

  // Добавление/Редактирование скина
  document.getElementById('skin-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('skin-name').value;
    const quantity = parseInt(document.getElementById('skin-quantity').value);
    const price = parseFloat(document.getElementById('skin-price').value);
    const mode = skinModal.dataset.mode;
    const index = parseInt(skinModal.dataset.editIndex);

    if (mode === 'add') {
      skins.push({ name, quantity, price });
    } else if (mode === 'edit' && !isNaN(index) && skins[index]) {
      skins[index].name = name;
      skins[index].quantity = quantity;
      skins[index].price = price;
    }

    displaySkins();
    skinModal.style.display = 'none';
    document.getElementById('skin-form').reset();
  });


  // --- Функции отображения данных --- //
  function displayAccounts() {
    const accountsList = document.getElementById('accounts-list');
    accountsList.innerHTML = '';
    if (accounts.length === 0) {
      accountsList.innerHTML = '<p>Аккаунты не добавлены.</p>';
      return;
    }
    accounts.forEach((acc, index) => {
      accountsList.innerHTML += `
        <div class="item">
          <strong>🔸 Аккаунт: ${acc.nickname}</strong><br/>
          Баланс: ${acc.balance.toFixed(2)} грн
          <div class="item-actions">
            <button class="edit-btn" data-type="account" data-index="${index}">✏️ Редактировать</button>
            <button class="delete-btn" data-type="account" data-index="${index}">❌ Удалить</button>
          </div>
        </div>
      `;
    });
    addEventListenersToItemButtons(); // Добавляем слушатели событий после обновления DOM
  }

  function displayCases() {
    const casesList = document.getElementById('cases-list');
    casesList.innerHTML = '';
    if (cases.length === 0) {
      casesList.innerHTML = '<p>Кейсы не добавлены.</p>';
      return;
    }
    cases.forEach((c, index) => {
      casesList.innerHTML += `
        <div class="item">
          <strong>🎁 Кейс: ${c.name}</strong><br/>
          Количество: ${c.quantity}<br/>
          Цена за шт.: ${c.price.toFixed(2)} грн
          <div class="item-actions">
            <button class="edit-btn" data-type="case" data-index="${index}">✏️ Редактировать</button>
            <button class="delete-btn" data-type="case" data-index="${index}">❌ Удалить</button>
          </div>
        </div>
      `;
    });
    addEventListenersToItemButtons();
  }

  function displaySkins() {
    const skinsList = document.getElementById('skins-list');
    skinsList.innerHTML = '';
    if (skins.length === 0) {
      skinsList.innerHTML = '<p>Скины не добавлены.</p>';
      return;
    }
    skins.forEach((s, index) => {
      skinsList.innerHTML += `
        <div class="item">
          <strong>🎯 Скин: ${s.name}</strong><br/>
          Количество: ${s.quantity}<br/>
          Цена за шт.: ${s.price.toFixed(2)} грн
          <div class="item-actions">
            <button class="edit-btn" data-type="skin" data-index="${index}">✏️ Редактировать</button>
            <button class="delete-btn" data-type="skin" data-index="${index}">❌ Удалить</button>
          </div>
        </div>
      `;
    });
    addEventListenersToItemButtons();
  }

  // --- Функция для добавления слушателей к кнопкам редактирования/удаления ---
  function addEventListenersToItemButtons() {
    // Делегирование событий для кнопок редактирования
    document.querySelectorAll('.edit-btn').forEach(button => {
      button.onclick = (e) => { // Использование onclick, чтобы избежать множественного добавления
        const type = e.target.dataset.type;
        const index = parseInt(e.target.dataset.index);
        
        if (type === 'account') {
          const acc = accounts[index];
          document.getElementById('account-nickname').value = acc.nickname;
          document.getElementById('account-balance').value = acc.balance;
          accountModal.dataset.mode = 'edit';
          accountModal.dataset.editIndex = index;
          document.querySelector('#account-modal h2').textContent = 'Редактировать аккаунт';
          document.querySelector('#account-form button[type="submit"]').textContent = 'Сохранить изменения';
          accountModal.style.display = 'block';
        } else if (type === 'case') {
          const c = cases[index];
          document.getElementById('case-name').value = c.name;
          document.getElementById('case-quantity').value = c.quantity;
          document.getElementById('case-price').value = c.price;
          caseModal.dataset.mode = 'edit';
          caseModal.dataset.editIndex = index;
          document.querySelector('#case-modal h2').textContent = 'Редактировать кейс';
          document.querySelector('#case-form button[type="submit"]').textContent = 'Сохранить изменения';
          caseModal.style.display = 'block';
        } else if (type === 'skin') {
          const s = skins[index];
          document.getElementById('skin-name').value = s.name;
          document.getElementById('skin-quantity').value = s.quantity;
          document.getElementById('skin-price').value = s.price;
          skinModal.dataset.mode = 'edit';
          skinModal.dataset.editIndex = index;
          document.querySelector('#skin-modal h2').textContent = 'Редактировать скин';
          document.querySelector('#skin-form button[type="submit"]').textContent = 'Сохранить изменения';
          skinModal.style.display = 'block';
        }
      };
    });

    // Делегирование событий для кнопок удаления
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.onclick = (e) => { // Использование onclick
        if (!confirm('Вы уверены, что хотите удалить этот элемент?')) {
            return;
        }
        const type = e.target.dataset.type;
        const index = parseInt(e.target.dataset.index);

        if (type === 'account') {
          accounts.splice(index, 1);
          displayAccounts();
        } else if (type === 'case') {
          cases.splice(index, 1);
          displayCases();
        } else if (type === 'skin') {
          skins.splice(index, 1);
          displaySkins();
        }
      };
    });
  }

  // Инициализация отображения списков при загрузке страницы
  displayAccounts();
  displayCases();
  displaySkins();

  // --- Логика расчета ---
  document.getElementById('distribute-btn').addEventListener('click', () => {
    const primePrice = parseFloat(document.getElementById('prime-price').value);
    const reserve = parseFloat(document.getElementById('reserve').value);

    if (isNaN(primePrice) || isNaN(reserve) || primePrice <= 0) {
      alert('Пожалуйста, введите корректные значения для стоимости прайма и запаса.');
      return;
    }

    if (accounts.length === 0) {
      alert('Пожалуйста, добавьте хотя бы один аккаунт.');
      return;
    }

    // Объединяем все предметы и сортируем по цене для оптимального распределения
    const allItems = [
      ...cases.map(item => ({ ...item, type: 'case', initialQuantity: item.quantity })),
      ...skins.map(item => ({ ...item, type: 'skin', initialQuantity: item.quantity }))
    ].sort((a, b) => b.price - a.price); // Сортируем от дорогих к дешевым

    const totalNeeded = accounts.map(acc => {
      const needed = Math.max(0, primePrice + reserve - acc.balance);
      return {
        ...acc,
        needed: needed > 0 ? needed : 0, // Если баланс уже достаточен, нужно 0
        items: [],
        sumItems: 0 // Сумма предметов, которые пойдут на этот аккаунт
      };
    }).sort((a, b) => b.needed - a.needed); // Сортируем аккаунты по убыванию "нужности"

    // Распределяем предметы по аккаунтам
// Применяем комиссию рынка ко всем предметам заранее и готовим плоский список для распределения
    let distributableItems = []; //
    const marketFee = parseFloat(document.getElementById('market-fee').value); // Получаем комиссию рынка один раз

    cases.forEach(c => { //
      for (let i = 0; i < c.quantity; i++) { //
        const netPrice = c.price * (1 - marketFee / 100); // Вычисляем чистую цену один раз
        distributableItems.push({ type: 'case', name: c.name, price: c.price, netPrice: netPrice }); //
      }
    });
    skins.forEach(s => { //
      for (let i = 0; i < s.quantity; i++) { //
        const netPrice = s.price * (1 - marketFee / 100); // Вычисляем чистую цену один раз
        distributableItems.push({ type: 'skin', name: s.name, price: s.price, netPrice: netPrice }); //
      }
    });

    // Сортируем предметы по чистой цене в порядке убывания
    distributableItems.sort((a, b) => b.netPrice - a.netPrice); //

    // Сортируем аккаунты по необходимой сумме в порядке убывания
    totalNeeded.sort((a, b) => b.needed - a.needed); //

    // Распределяем предметы по аккаунтам
    for (const acc of totalNeeded) { //
      if (acc.needed <= 0) continue; // Если аккаунт уже покрыт, пропускаем

      let currentSumForAccount = 0; //
      for (let i = 0; i < distributableItems.length; ) { //
        const item = distributableItems[i]; //

        // Проверяем, соответствует ли добавление этого предмета (с учетом его чистой цены) требуемой сумме + небольшой допуск
        if (currentSumForAccount + item.netPrice <= acc.needed + 2) { // +2 - небольшой допуск для округлений
          acc.items.push(item); //
          currentSumForAccount += item.netPrice; //
          distributableItems.splice(i, 1); // Удаляем предмет из общего пула
        } else {
          i++; // Переходим к следующему предмету, если текущий слишком дорог
        }

        if (currentSumForAccount >= acc.needed) break; // Если для этого аккаунта собрано достаточно, переходим к следующему
      }
      acc.sumItems = currentSumForAccount; //
    }

    // После распределения, все оставшиеся предметы в 'distributableItems' не были использованы.
    const remainingItems = distributableItems; // Это предметы, которые не были распределены


    // Выводим результаты
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    let totalCollectedFromItems = 0;
    let totalPrimePurchases = 0;

   totalNeeded.forEach(acc => {
      // ... (код группировки предметов - оставляем без изменений) ...
      const groupedAccountItems = acc.items.reduce((accGroup, item) => {
        const key = `${item.type}-${item.name}-${item.price.toFixed(2)}`;
        if (!accGroup[key]) {
          accGroup[key] = { ...item, count: 0, totalOriginalPrice: 0, totalNetPrice: 0 };
        }
        accGroup[key].count++;
        accGroup[key].totalOriginalPrice += item.price;
        accGroup[key].totalNetPrice += item.netPrice;
        return accGroup;
      }, {});

      const displayAccountItems = Object.values(groupedAccountItems);

      let недостатокТекст = '';
      if (acc.sumItems < acc.needed) {
          const недостаток = acc.needed - acc.sumItems;
          недостатокТекст = `Недостаточно предметов для полной оплаты. Не хватает: ${недостаток.toFixed(2)} грн`;
      }

      // НОВОЕ: Рассчитываем итоговый баланс
      const finalBalance = acc.balance + acc.sumItems;


      resultsDiv.innerHTML += `<div class="item">
        <strong>🔸 Аккаунт: ${acc.nickname}</strong><br/>
        Баланс: ${acc.balance.toFixed(2)} грн<br/>
        Нужно собрать: ${acc.needed.toFixed(2)} грн<br/>
        Предметов выделено на сумму: ${acc.sumItems.toFixed(2)} грн<br/>
        ${недостатокТекст ? `<span style="color: red;">${недостатокТекст}</span><br/>` : ''}
        <strong>Итоговый баланс будет: ${finalBalance.toFixed(2)} грн</strong><br/>
        <ul>` + displayAccountItems.map(item => `<li>${item.type === 'case' ? '🎁' : '🎯'} ${item.name} x${item.count} — ${item.totalOriginalPrice.toFixed(2)} грн (с учётом комиссии: ${item.totalNetPrice.toFixed(2)} грн)</li>`).join('') + `</ul>
      </div>`;
    });
    // Показываем оставшиеся "лишние" предметы
// Показываем оставшиеся "лишние" предметы
// Показываем оставшиеся "лишние" предметы
    if (remainingItems.length > 0) {
      // Группируем оставшиеся предметы по типу и названию
      const groupedRemainingItems = remainingItems.reduce((acc, item) => {
        const key = `${item.type}-${item.name}`;
        if (!acc[key]) {
          acc[key] = { ...item, count: 0 };
        }
        acc[key].count++;
        return acc;
      }, {});

      // Преобразуем сгруппированные предметы в массив для отображения
      const displayRemainingItems = Object.values(groupedRemainingItems);

      resultsDiv.innerHTML += `
        <div class="item" style="margin-top:20px;">
          <strong>Оставшиеся предметы (не понадобились для прайма):</strong>
          <ul>
            ${displayRemainingItems.map(item => `<li>${item.type === 'case' ? '🎁' : '🎯'} ${item.name} x${item.count} — ${(item.price * item.count).toFixed(2)} грн</li>`).join('')}
          </ul>
        </div>
      `;
    }

    // Общая сводка
    const totalSummaryDiv = document.getElementById('total-summary');
    totalSummaryDiv.innerHTML = `
        <div class="item" style="text-align: center; font-size: 1.2rem; margin-top: 30px; background-color: #3b3f54;">
            <strong>💸 Общая сводка:</strong><br/>
            Собрано с предметов: ${totalCollectedFromItems.toFixed(2)} грн<br/>
            Всего праймов можно купить: ${totalPrimePurchases} шт.<br/>
        </div>
    `;
  });

});



// === Генерация случайных бликов на фоне ===
function createBlink() {
  const blink = document.createElement('div');
  blink.classList.add('blink');

  // Случайная позиция
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;

  blink.style.left = `${x}px`;
  blink.style.top = `${y}px`;

  // Анимация
  blink.style.animation = `fadeInOutBlink 2s ease-out`;

  // Добавляем в контейнер
  const container = document.getElementById('blinks-container');
  if (container) {
    container.appendChild(blink);
  }

  // Удаляем после завершения анимации
  setTimeout(() => {
    blink.remove();
  }, 2000);
}

// Запускаем блики каждые 300 мс
setInterval(createBlink, 300);


// Боковое

let selectedCursor = null;
let selectedPointer = null;

// Переключение вкладок
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const selected = tab.dataset.tab;
    document.querySelectorAll(".tab-content").forEach(content => {
      content.classList.remove("active");
    });
    document.querySelector(`.tab-${selected}`).classList.add("active");

    // 🟣 Новый код — повторно фильтруем
    const input = document.getElementById('cursor-search');
    if (input) {
      const event = new Event('input');
      input.dispatchEvent(event);
    }
  });
});


// Открытие модального окна
document.getElementById("open-cursor-menu").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("cursor-modal").style.display = "flex";
});

// Закрытие модального окна
document.getElementById("close-cursor-modal").addEventListener("click", function () {
  document.getElementById("cursor-modal").style.display = "none";
});

// Выбор курсора или поинтера
document.querySelectorAll(".cursor-options").forEach(group => {
  group.addEventListener("click", (e) => {
    const target = e.target.closest(".cursor-option");
    if (!target) return;

    group.querySelectorAll(".cursor-option").forEach(opt => opt.classList.remove("selected"));
    target.classList.add("selected");

    const type = group.dataset.type;
    const img = target.querySelector("img");
    const name = img ? img.getAttribute("src") : null;

    if (type === "cursor") selectedCursor = name;
    if (type === "pointer") selectedPointer = name;
  });
});

// Подтверждение выбора
document.querySelector(".confirm-cursor").addEventListener("click", () => {
  if (selectedCursor) {
    localStorage.setItem('selectedCursor', selectedCursor);
    document.body.style.cursor = `url('${selectedCursor}'), auto`;
  }

  if (selectedPointer) {
    localStorage.setItem('selectedPointer', selectedPointer);

    const pointerTargets = document.querySelectorAll(
      "button, a, [role='button'], .clickable, .tool-card, .tab, .confirm-cursor"
    );
    pointerTargets.forEach(el => {
      el.style.cursor = `url('${selectedPointer}'), pointer`;
    });
  }

  document.getElementById("cursor-modal").style.display = "none";
});

// Применение сохранённых курсоров при загрузке
window.addEventListener("DOMContentLoaded", () => {
  const savedCursor = localStorage.getItem('selectedCursor');
  const savedPointer = localStorage.getItem('selectedPointer');

  if (savedCursor) {
    document.body.style.cursor = `url('${savedCursor}'), auto`;
    selectedCursor = savedCursor;

    document.querySelectorAll('.tab-cursor .cursor-option').forEach(opt => {
      const img = opt.querySelector('img');
      opt.classList.toggle('selected', img && img.getAttribute("src") === savedCursor);
    });
  }

  if (savedPointer) {
    selectedPointer = savedPointer;

    const pointerTargets = document.querySelectorAll(
      "button, a, [role='button'], .clickable, .tool-card, .tab, .confirm-cursor"
    );
    pointerTargets.forEach(el => {
      el.style.cursor = `url('${savedPointer}'), pointer`;
    });

    document.querySelectorAll('.tab-pointer .cursor-option').forEach(opt => {
      const img = opt.querySelector('img');
      opt.classList.toggle('selected', img && img.getAttribute("src") === savedPointer);
    });
  }
});

// Поиск по названию курсора
// Фільтр курсорів по пошуку
document.getElementById('cursor-search').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const allOptions = document.querySelectorAll('.tab-content.active .cursor-option');

  allOptions.forEach(opt => {
    const text = opt.querySelector('p')?.textContent.toLowerCase() || '';
    if (text.includes(query)) {
      opt.classList.remove('hidden');
    } else {
      opt.classList.add('hidden');
    }
  });
});



// === Частицы пламени внутри модального окна ===
function createFlameParticle() {
  const container = document.getElementById("cursor-particles");
  if (!container) return;

  const particle = document.createElement("div");
  particle.className = "cursor-particle";

  const x = Math.random() * container.offsetWidth;
  const y = Math.random() * 20 + (container.offsetHeight - 30); // чуть снизу

  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  container.appendChild(particle);

  setTimeout(() => particle.remove(), 2000);
}

// Запуск частиц только при открытом окне
setInterval(() => {
  const modal = document.getElementById("cursor-modal");
  if (modal && modal.style.display === "flex") {
    createFlameParticle();
  }
}, 150);
