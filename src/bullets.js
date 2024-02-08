class Bullet {
  constructor(x, y, parent, target, obstacle, bullets, direction) {
    this.x = x;
    this.y = y;
    this.parent = parent;
    this.friends = friends;
    this.target = target;
    this.obstacle = obstacle;
    this.bullets = bullets;
    this.speed = 45;
    this.direction = direction;
    this.width = 15;
    this.height = 15;
    this.sprite;
    this.move = this.move.bind(this);
    this.timerId;
  }

  spawnBullets() {
    let newBullet = document.createElement("div");
    newBullet.classList.add("bullets");
    newBullet.style.top = this.y + "px";
    newBullet.style.left = this.x + "px";
    this.parent.appendChild(newBullet);
    this.sprite = newBullet;
    let shootSound = new Audio("./assets/sounds/disparoTanque2.flac");
    shootSound.pause();
    shootSound.play();
  }

  move() {
    this.x += this.speed * this.direction;
    this.sprite.style.left = this.x + "px";
    this.checkCollision();
  }

  despawnBullets() {
    clearInterval(this.timerId);
    this.sprite.remove();
    this.bullets.splice(this.bullets.indexOf(this), 1);
  }

  checkCollision() {
    if (
      this.x >= this.parent.offsetWidth + this.width + 30 ||
      this.x <= 0 - 30
    ) {
      this.despawnBullets();
      return;
    }

    if (this.direction === -1) {
      console.log(this.direction);
      if (
        this.x > obstacle.x &&
        this.x < obstacle.x + obstacle.width &&
        this.y < obstacle.y + obstacle.height &&
        this.y + this.height > obstacle.y
      ) {
        console.log("enemy tank into  the wall");
        this.despawnBullets();
        return;
      }
    }
    if (this.direction === 1) {
      console.log( this.direction);
      if (
        this.x < obstacle.x + obstacle.width &&
        this.x + this.width > obstacle.x &&
        this.y < obstacle.y + obstacle.height &&
        this.y + this.height > obstacle.y
      ) {
        console.log("maintank tank into  the wall");
        this.despawnBullets();
        return;
      }
    }

    this.target.forEach((tank) => {
      if (
        this.x < tank.x + tank.width &&
        this.x + this.width > tank.x &&
        this.y < tank.y + tank.height &&
        this.y + this.height > tank.y
      ) {
        this.despawnBullets();
        let explosionSound = new Audio("assets/sounds/explosionTanque.mp3");
        explosionSound.play();
        tank.health--;

        playerStats.textContent = `${playerName.value}.Lifes: [${mainTank.health}]`;

        enemyStats.textContent = `enemy.Lifes: [${enemyTank.health}]`;

        if (tank.health <= 0) {
          tank.despawnPlayer();
          this.target = this.target.splice(this.target.indexOf(tank.sprite), 1);
        }

        return true;
      }
    });
  }
}
