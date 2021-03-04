import {Player, Virus, Laser} from "./Entities.js";
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
        this.load.image("enemy2", "assets/star.png");
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
        this.load.image("laser", "assets/sprLaserPlayer.png");
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

      // Input setup
      this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      //Groups
      this.enemies = this.add.group();
      this.Lasers = this.add.group();

      this.time.addEvent({
        delay: 500,
        callback: function() {
          var enemy = new Virus(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
          this.enemies.add(enemy);
        },
        callbackScope: this,
        loop: true
      });

      this.physics.add.collider(this.Lasers, this.enemies, function(laser, enemy)
      {
        if (enemy)
        {
          enemy.explode(true);
          score += 10;
          scoreText.setText('Score: ' + score);
          laser.destroy();
        }
      });

      this.physics.add.overlap(this.player, this.enemies, function(player, enemy)
      {
        if (!player.getData("isDead") && !enemy.getData("isDead"))
        {
          player.explode(false);
          enemy.destroy();
        }
      });

      scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#FFF'});
    }

    update()
    {
      if (!this.player.getData("isDead"))
      {
        this.player.update();
        if (this.keyW.isDown)
        {
          this.player.moveUp();
        }
        else if (this.keyS.isDown)
        {
          this.player.moveDown();
        }
        if (this.keyA.isDown)
        {
          this.player.moveLeft();
        }
        else if (this.keyD.isDown)
        {
          this.player.moveRight();
        }
        if (this.keySpace.isDown)
        {
          this.player.setData("isShooting", true);
        }
        else
        {
          this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
          this.player.setData("isShooting", false);
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
              enemy.destroy();
            }
          }
        }
        for (var i = 0; i < this.Lasers.getChildren().length; i++)
        {
          var laser = this.Lasers.getChildren()[i];
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
