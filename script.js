// Объект гравця
    let player = {
        name: "Superhero",
        HP: 200,
        gold: 0,
        attack: 10,
        exp: 0,
    };

    
// Массив ворогів
    let enemiesHP = 100;
    let enemies = [
        { name: "Ворог №1", HP: enemiesHP, gold: 10, exp: 1, attack: 5, img: './images/enemy1.png' },
        { name: "Ворог №2", HP: enemiesHP, gold: 20, exp: 2, attack: 6, img: './images/enemy2.png' },
        { name: "Ворог №3", HP: enemiesHP, gold: 30, exp: 3, attack: 9, img: './images/enemy3.png'},
    ];
    let enemyCount = 0;
    let enemy = getRandomEnemy();
   
    // Функція для выбору рандомного ворага
    function getRandomEnemy() {
        let randomIndex = Math.floor(Math.random() * enemies.length);
        return enemies[randomIndex];
    }


    // Інициализация гри
    updateUI();
    // Функция для оновлення інформації на сторінці
    function updateUI() {
        document.getElementById("player-name").textContent = player.name;
        document.getElementById("player-hp").textContent = player.HP;
        document.getElementById("player-attack").textContent = player.attack;
        document.getElementById("player-gold").textContent = player.gold;
        document.getElementById("player-exp").textContent = player.exp;	
        document.getElementById("enemy-name").textContent = enemy.name;
        document.getElementById("enemy-hp").textContent = enemy.HP;
        document.getElementById("enemy-attack").textContent = enemy.attack;
        document.getElementById("enemy-gold").textContent = enemy.gold;
        document.getElementById("enemy-exp").textContent = enemy.exp;
        document.getElementById("enemy-pic").setAttribute("src", enemy.img);
    }


    // Функция для обработки атаки игрока
    function playerAttack() {
        enemy.HP = enemy.HP - player.attack;
        player.HP = player.HP - enemy.attack;
        
        // Проверка на победу игрока
        if (enemy.HP <= 0) {
            player.gold = player.gold + enemy.gold;
            player.exp = player.exp + enemy.exp;
            alert("Ви перемогли ворога та отримали "  + enemy.gold + " золота та " + enemy.exp + " досвіду!");
            enemy = getRandomEnemy();
            updateUI();           
            enemy.HP = enemiesHP;		
            enemyCount++;	
            document.getElementById("superpower").disabled = false;
            
            //Перевірка на новий рівень 
            if (player.exp > 5) {                            
                alert("Вам доступна Суперсила! Один раз на бій.");
                document.getElementById("superpower").classList.remove('hide');    
            }
            
        }
        
        // Проверка на проигрыш игрока
        if (player.HP <= 0) {
            alert("Вы програли, але встигли перемогти " + enemyCount + " ворогів");
            resetGame();
        }
        
        updateUI();
    }
    
    //Магазин - Добавить атаку
    function addAttack() {
        if (player.gold >= 10) {
            player.attack = player.attack + 1;
            player.gold = player.gold - 10;
            updateUI();
        } else {
            alert("У вас недостатньо золота!")
        }
    }

    //Магазин - Добавить HP
    function addHP() {
        if (player.gold >= 10) {
        player.HP = player.HP + 10;
        player.gold = player.gold - 10;
        updateUI();
    } else {
            alert("У вас недостатньо золота!")
        }
    }

    //Суперсила
    function useSuperpower() {
        enemy.HP = enemy.HP - player.attack;
        document.getElementById("superpower").disabled = true;
        playerAttack();
    }

    // Функция для сброса игры
    function resetGame() {
        player.HP = 100;
        player.attack = 10;
        player.gold = 0;		
        player.exp = 0;
        enemy = getRandomEnemy();
        updateUI();
    }

    // Назначение обработчика кликов
    document.getElementById("attack-button").addEventListener("click", playerAttack);
    document.getElementById("add-attack").addEventListener("click", addAttack);
    document.getElementById("add-hp").addEventListener("click", addHP);
    document.getElementById("superpower").addEventListener("click", useSuperpower);
