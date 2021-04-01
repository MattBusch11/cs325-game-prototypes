import {Player, Virus, Laser, RedLaser, BlueLaser, ShootingVirus, EnemyLaser} from "./Entities.js";
// You can copy-and-paste the code from any of the examples at https://examples.phaser.io here.
// You will need to change the `parent` parameter passed to `new Phaser.Game()` from
// `phaser-example` to `game`, which is the id of the HTML element where we
// want the game to go.
// The assets (and code) can be found at: https://github.com/photonstorm/phaser3-examples
// You will need to change the paths you pass to `this.load.image()` or any other
// loading functions to reflect where you are putting the assets.
// All loading functions will typically all be found inside `preload()`.

// The simplest class example: https://phaser.io/examples/v3/view/scenes/scene-from-es6-class
var score = 0;
var gameOver = false;
var scoreText;
export class MyScene extends Phaser.Scene
{

    constructor()
    {
        super("MyScene");

        this.bouncy = null;
    }

    preload()
    {
        // Load an image and call it 'logo'.
        this.load.image("enemy1", "assets/bomb.png");
        this.load.image("enemy2", "assets/sprEnemy1.png");
        this.load.spritesheet("sprPlayer", "assets/sprPlayer.png",
        {
          frameWidth: 16,
          frameHeight: 16
        });
        this.load.spritesheet("sprExplosion", "assets/sprExplosion.png",
        {
          frameWidth: 32,
          frameHeight: 32
        });
        this.load.image("blueLaser", "assets/sprLaserPlayer.png");
        this.load.image("redLaser", "assets/sprLaserEnemy0.png");
        this.load.image("enemyLaser", "assets/sprLaserEnemy0.png");
    }

    create()
    {
      this.anims.create({
        key: "player",
        frames: this.anims.generateFrameNumbers("sprPlayer"),
        frameRate: 20,
        repeat: -1
      });
      this.anims.create({
        key:"sprExplosion",
        frames: this.anims.generateFrameNumbers("sprExplosion"),
        frameRate: 20,
        repeat: 0
      });

      this.player = new Player(
        this,
        this.game.config.width * 0.5,
        this.game.config.height * 0.5,
        "player"
      );
      this.player.setScale(1.5);

      // Input setup
      this.input.mouse.disableContextMenu();
      this.input.on("pointerdown", function  (pointer)
      {
        if (pointer.rightButtonDown())
        {
            this.player.setData("redLaser", true);
        }
        else
        {
          this.player.setData("redLaser", false);
        }
        this.player.setData("isShooting", true);
        this.player.setData("pointerX", pointer.x);
        this.player.setData("pointerY", pointer.y);
      }, this);
      this.input.on("pointerup", function()
      {
        this.player.setData("isShooting", false);
      }, this);



      /*this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);*/

      //Groups
      this.enemies = this.add.group();
      this.redLasers = this.add.group();
      this.blueLasers = this.add.group();
      this.enemyLasers = this.add.group();

      this.time.addEvent({
        delay: 1000,
        callback: function() {
          var enemy = null;
          var int = Phaser.Math.Between(0, 11);
          if (int <= 2)
          {
            if (Phaser.Math.Between(0, 1) == 0)
            {
              enemy = new Virus(
                this,
                Phaser.Math.Between(0, this.game.config.width),
                0
              );
            }
            else
            {
              enemy = new Virus(
                this,
                Phaser.Math.Between(0, this.game.config.width),
                600
              );
            }
          }
          else if (int <= 5 && int > 2)
          {
            if (Phaser.Math.Between(0, 1) == 0)
            {
              enemy = new ShootingVirus(
                this,
                Phaser.Math.Between(0, this.game.config.width),
                0
              );
            }
            else
            {
              enemy = new ShootingVirus(
                this,
                Phaser.Math.Between(0, this.game.config.width),
                600
              );
            }
          }
          else if (int <= 8 && int > 5)
          {
            if (Phaser.Math.Between(0, 1) == 0)
            {
              enemy = new ShootingVirus(
                this,
                0,
                Phaser.Math.Between(0, this.game.config.height)
              );
            }
            else
            {
              enemy = new ShootingVirus(
                this,
                800,
                Phaser.Math.Between(0, this.game.config.height)
              );
            }
          }
          else if (int <= 11 && int > 8)
          {
            if (Phaser.Math.Between(0, 1) == 0)
            {
              enemy = new Virus(
                this,
                0,
                Phaser.Math.Between(0, this.game.config.height)
              );
            }
            else
            {
              enemy = new Virus(
                this,
                800,
                Phaser.Math.Between(0, this.game.config.height)
              );
            }
          }

          if (enemy !== null)
          {
            enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
            this.enemies.add(enemy);
          }
        },
        callbackScope: this,
        loop: true
      });

      this.physics.add.collider(this.blueLasers, this.enemies, function(laser, enemy)
      {
        if (enemy)
        {
          if (enemy.onDestroy !== undefined)
          {
            enemy.explode(true);
            score += 10;
            scoreText.setText('Score: ' + score);
            laser.destroy();
          }
          else {
            {
              enemy.explode(true);
              score += 5;
              scoreText.setText('Score: ' + score);
              laser.destroy();
            }
          }
        }
      });

      this.physics.add.collider(this.redLasers, this.enemyLasers, function(laser, enemyLaser)
      {
        if (enemyLaser)
        {
          laser.destroy();
          enemyLaser.destroy();
        }
      });



      this.physics.add.overlap(this.player, this.enemies, function(player, enemy)
      {
        if (!player.getData("isDead") && !enemy.getData("isDead"))
        {
          player.explode(false);
          if (enemy.onDestroy !== undefined)
          {
            enemy.onDestroy();
          }
          else
          {
            enemy.destroy();
          }
        }
      });

      this.physics.add.overlap(this.player, this.enemyLasers, function(player, laser)
      {
        if (!player.getData("isDead") && !laser.getData("isDead"))
        {
          player.explode(false);
          laser.destroy();
        }
      });

      scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#FFF'});
    }

    update()
    {
      if (!this.player.getData("isDead"))
      {
        this.player.update();
        /*if (this.keyUp.isDown)
        {
          this.player.moveUp();
        }
        else if (this.keyDown.isDown)
        {
          this.player.moveDown();
        }
        if (this.keyLeft.isDown)
        {
          this.player.moveLeft();
        }
        else if (this.keyRight.isDown)
        {
          this.player.moveRight();
        }*/
        if (!this.player.getData("isShooting"))
        {
          this.player.setData("timerShootTick", this.player.getData("timerShootTick") + 1);
        }
      }
      else {
        {
          this.time.delayedCall(250, function() {
            this.cameras.main.fade(250);
          }, [], this);
          this.time.delayedCall(500, function() {
            this.scene.start("MainMenu");
          }, [], this);
        }
      }




      for (var i = 0; i < this.enemies.getChildren().length; i++)
      {
        var enemy = this.enemies.getChildren()[i];
        enemy.update();

      if (enemy.x < -enemy.displayWidth ||
          enemy.x > this.game.config.width + enemy.displayWidth ||
          enemy.y < -enemy.displayHeight * 4 ||
          enemy.y > this.game.config.height + enemy.displayHeight)
          {
            if (enemy)
            {
              if (enemy.onDestroy !== undefined)
              {
                  enemy.onDestroy();
              }
              else {
                {
                  enemy.destroy();
                }
              }
            }
          }
        }
        for (var i = 0; i < this.redLasers.getChildren().length; i++)
        {
          var laser = this.redLasers.getChildren()[i];
          laser.update();

          if (laser.x < -laser.displayWidth ||
              laser.x > this.game.config.width + laser.displayWidth ||
              laser.y < -laser.displayHeight * 4 ||
              laser.y > this.game.config.height + laser.displayHeight)
          {
              if (laser)
              {
                laser.destroy();
              }
          }
        }

        for (var i = 0; i < this.blueLasers.getChildren().length; i++)
        {
          var laser = this.blueLasers.getChildren()[i];
          laser.update();

          if (laser.x < -laser.displayWidth ||
              laser.x > this.game.config.width + laser.displayWidth ||
              laser.y < -laser.displayHeight * 4 ||
              laser.y > this.game.config.height + laser.displayHeight)
          {
              if (laser)
              {
                laser.destroy();
              }
          }
        }

        for (var i = 0; i < this.enemyLasers.getChildren().length; i++)
        {
          var laser = this.enemyLasers.getChildren()[i];
          laser.update();

          if (laser.x < -laser.displayWidth ||
              laser.x > this.game.config.width + laser.displayWidth ||
              laser.y < -laser.displayHeight * 4 ||
              laser.y > this.game.config.height + laser.displayHeight)
          {
              if (laser)
              {
                laser.destroy();
              }
          }
        }
      }
}
