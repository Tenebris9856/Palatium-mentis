// Константы:
const Game_window = document.getElementById("Game_window");
const Form = document.getElementById("Form");

// Объекты:
// Объект - Игровое поле:
var Map = {
    // Массивы:
    Terrain: [],

    // Методы:
    // Метод - Заполнение массива:
    Create_terrain: function() {
        // Инициализация массиов:
        this.Terrain.length = 0;

        // Переменные:
        let Form = document.getElementById("Form");
        let Map_length = Form.elements.Array_length.value;

        // Циклы:
        for (let Condition_1 = 0; Condition_1 < Map_length; Condition_1++) {
            // Массивы:
            var Terrain_row = [];

            // Циклы:
            for (let Condition_2 = 0; Condition_2 < Map_length; Condition_2++) {
                Terrain_row.push(1);
            }

            // Инициализация массивов:
            this.Terrain.push(Terrain_row);
        }

        // Вывод информации:
        console.log("|}- Метод Create_terrain() успешно выполнен!");
    },

    // Метод - Создание объекта "Змея":
    Spawn_snake: function() {
        // Константы:
        const Middle_row = Math.floor(this.Terrain.length / 2); // Вычисление середины массива по вертикали.
        const Middle_col = Math.floor(this.Terrain[0].length / 2); // Вычисление середины массива по горизонтали.

        // Массивы:
        this.Terrain[Middle_row][Middle_col] = '&';

        // Вывод информации:
        console.log("|}- Метод Spawn_snake() успешно выполнен!");
    },

    // Метод - Размещение объекта "Еда":
    Spawn_food: function () {
        // Переменные:
        let Row, Col; // Строки и стобцы.

        // Циклы:
        do {
            Row = Math.floor(Math.random() * this.Terrain.length);
            Col = Math.floor(Math.random() * this.Terrain[0].length);
        } while (this.Terrain[Row][Col] !== 1);

        // Массивы:
        this.Terrain[Row][Col] = 'F';

        // Вывод информации:
        console.log("|}- Функция Spawn_food() успешно выполнена!");
        console.log("------------------------------------");
        console.log(`|}- Еда размещена в позициях: ${Row}, ${Col}.`);
    },

    // Метод - Отрисовка игрового поля:
    Draw_terrain: function() {
        // Инициализация констант:
        Game_window.innerHTML = "";
        
        // Циклы:
        for (let Row = 0; Row < this.Terrain.length; Row++) {
            // Константы:
            const Tr = document.createElement("tr");
            
            // Циклы:
            for (let Col = 0; Col < this.Terrain[Row].length; Col++) {
                // Константы:
                const Td = document.createElement("td");
                    
                // Условные конструкции:
                if (this.Terrain[Row][Col] === 1) {
                    Td.textContent = ' ';
                } else if (this.Terrain[Row][Col] === '&') {
                    Td.textContent = '&';
                } else if (this.Terrain[Row][Col] === 0) {
                    Td.textContent = 0;
                } else if (this.Terrain[Row][Col] === 'F') {
                    Td.textContent = 'F';
                }
        
                // Инициализация констант:
                Tr.appendChild(Td);
            }
        
            // Инициализация констант:
            Game_window.appendChild(Tr);
        }
        
        // Вывод информации в консоль:
        console.log("|}- Функция Draw_terrain() успешно выполнена!");
    },

    // Метод - Очистка игрового поля:
    Clear_terrain: function () {
        // Циклы:
        for (let Row = 0; Row < this.Terrain.length; Row++) {
            for (let Col = 0; Col < this.Terrain[Row].length; Col++) {
                this.Terrain[Row][Col] = 1;
            }
        }

        // Вывод информации:
        console.log("|}- Массив Terrain полностью очищен!");
    }
}

// Объект - Количество очков:
var Score = {
    // Параметры:
    Quantity: 0,
    // Массивы:
    Array_quantity: [],

    // Методы:
    // Метод - Увеличить количество очков:
    Increase_score: function() {
        // Переназначение переменных:
        this.Quantity++;

        // Вывод значения на документ:
        document.getElementById("Output_score").textContent = this.Quantity;

        // Вывод информации:
        console.log("|}- Метод Increase_score() успешно выполнен!");
    },

    // Метод - Подсчёт лучшего результата:
    Calculate_best_quantity: function(Quantity = 0) {
        // Циклы:
        for (let Condition = 0; Condition < this.Array_quantity.length; Condition++) {
            if (this.Array_quantity[Condition] > Quantity) {
                Quantity = this.Array_quantity[Condition];
            }
        }

        // Вывод значений на сайт:
        document.getElementById("Best_score").textContent = Quantity;

        // Вывод информации:
        console.log("|}- Функция Calculate_best_quantity() успешно выполнена!");
    },

    // Метод - Сбросить количество очков:
    Reset_score: function() {
        // Инициализация массивов:
        this.Array_quantity.push(this.Quantity);
        // Переназначение переменных:
        this.Quantity = 0;

        // Вывод значений на документ:
        document.getElementById("Output_score").textContent = this.Quantity;

        // Вызов методов:
        this.Calculate_best_quantity();

        // Вывод информации:
        console.log("|}- Метод Reset_score() успешно выполнен!");
    }
}

// Переменные:
let Current_direction = null; // Текущее направление движения объекта "Змейка".
let Game_interval = null; // Интервал для цикла игры.
let Is_game_started = false; // Флаг для отслеживания начала игры.
// Массивы:
var Snake_body = [];

// Функции:
// Функция - Смерть объекта "Змейка":
function Snake_death() {
    // Инициализация функций:
    alert("Погиб!");

    // Переназначение переменных:
    clearInterval(Game_interval); // Останавка игры.
    Current_direction = null; // Сброс направления движения объекта "Змейка".
    Game_interval = null; // Сброс интервала.
    Is_game_started = false; // Сброс флага начала игры.

    // Инициализация методов:
    Map.Clear_terrain();

    // Константы:
    const Middle_row = Math.floor(Map.Terrain.length / 2); // Вычисление середины массива по вертикали.
    const Middle_col = Math.floor(Map.Terrain[0].length / 2); // Вычисление середины массива по горизонтали.

    // Инициализация массивов:
    Map.Terrain[Middle_row][Middle_col] = '&'; // Возврат объекта "Змейка" на начальную позицию.
    Snake_body = [{ Row: Middle_row, Col: Middle_col }]; // Возврат "тела" объекта "Змейка" на начальную позицию.

    // Инициализация функций:
    Map.Draw_terrain();

    // Вывод информации в консоль:
    console.log("|}- Функция Snake_death() успешно выполнена!");
}

// Функция - Движение объекта "Змейка":
function Move_snake() {
    // Переменные:
    let Head = Snake_body[0]; // Голова объекта "Змейка".
    let New_row = Head.Row; // Новая позиция по вертикали объекта "Змейка".
    let New_col = Head.Col; // Новая позиция по горизонтали объекта "Змейка".

    // Условные-переключатели:
    switch (Current_direction) {
        // Переключатель № 1:
        case "ArrowUp":
            // Переназначение переменных:
            New_row -= 1;
            break;
        // Переключатель № 2:
        case "ArrowDown":
            New_row += 1;
            break;
        case "ArrowLeft":
            // Переназначение переменных:
            New_col -= 1;
            break;
        // Переключатель № 3:
        case "ArrowRight":
            // Переназначение переменных:
            New_col += 1;
            break;
    }

    // Условные констукции:
    // Условная конструкция - Проверка объекта "Змейка" на смерть:
    if (New_row < 0 || New_row >= Map.Terrain.length || New_col < 0 || New_col >= Map.Terrain[0].length || Map.Terrain[New_row][New_col] === '&' || Map.Terrain[New_row][New_col] === 0) {
        // Инициализация функций:
        Snake_death(Head.Row, Head.Col);

        return console.log("|}- Функция Move_snake() успешно выполнена!");
    }

    // Условная конструкция - Проверка поля на наличие объекта "Еда":
    if (Map.Terrain[New_row][New_col] === 'F') {
        // Инициализация массивов:
        Snake_body.unshift({ Row: New_row, Col: New_col });

        // Инициализация методов:
        Score.Increase_score(); // Увеличение и вывод очков.
        Map.Spawn_food(); // Появление еды.
    } else {
        // Инициализация массивов:
        Snake_body.pop(); // Удаление "хвоста" объекта "Змейка".
        Snake_body.unshift({ Row: New_row, Col: New_col }); // Размещение новой "головы" объекта "Змейка."
    }

    // Циклы:
    // Цикл - Обновление игрового поля:
    for (let Row = 0; Row < Map.Terrain.length; Row++) {
        for (let Col = 0; Col < Map.Terrain[Row].length; Col++) {
            if (Map.Terrain[Row][Col] === '&' || Map.Terrain[Row][Col] === 0) {
                Map.Terrain[Row][Col] = 1;
            }
        }
    }

    // Цикл - Отрисовка нового положения объекта "Змейка":
    for (let Condition_1 = 0; Condition_1 < Snake_body.length; Condition_1++) {
        // Константы:
        const Part = Snake_body[Condition_1];

        // Условыне конструкции:
        if (Condition_1 === 0) {
            Map.Terrain[Part.Row][Part.Col] = '&';
        } else {
            Map.Terrain[Part.Row][Part.Col] = 0;
        }
    }

    // Инициализация методов:
    Map.Draw_terrain();

    // Вывод информации в консоль:
    console.log("|}- Функция Move_snake() успешно выполнена!");
}

// Функция - Обработка нажатия клавиш:
function Handle_key_press(Event) {
    // Константы:
    const Valid_keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

    // Условные конструкции:
    // Условная констуркция - Назначение направления движения объекта "Змейка":
    if (Valid_keys.includes(Event.key)) {
        // Переназначение переменных:
        Current_direction = Event.key;

        // Условные конструкции:
        if (!Is_game_started) {
            // Переназначение переменных:
            Is_game_started = true;

            // Инициализация методов:
            Score.Reset_score(); // Очистка очков.
            Map.Spawn_food(); // Появление еды.
        }
    }

    // Условная конструкция - Запуск игры:
    if (!Game_interval && Current_direction) {
        Game_interval = setInterval(Move_snake, 200);
    }
}

// Инициализация констант:
Form.addEventListener("submit", function(Event) {
    // Инициализация методов:
    Event.preventDefault(); // Остановка перезагрузки страницы.
    Map.Create_terrain(); // Генерация карты.
    Map.Spawn_snake(); // Появление объекта "Змейка".
    
    // Массивы:
    Snake_body = [{ Row: Math.floor(Map.Terrain.length / 2), Col: Math.floor(Map.Terrain[0].length / 2) }];

    // Инициализация методов:
    Map.Draw_terrain();
});

// Инициализация методов:
Map.Create_terrain(); // Создание карты.
Map.Spawn_snake(); // Появление объекта "Зиейка".
        
// Массивы:
Snake_body = [{ Row: Math.floor(Map.Terrain.length / 2), Col: Math.floor(Map.Terrain[0].length / 2) }];

// Инициализация методов:
Map.Draw_terrain();

// Добавление обработчика событий клавиш:
document.addEventListener("keydown", Handle_key_press);