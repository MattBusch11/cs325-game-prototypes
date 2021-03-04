import "./phaser.js";

// You can copy-and-paste the code from any of the examples at https://examples.phaser.io here.
// You will need to change the `parent` parameter passed to `new Phaser.Game()` from
// `phaser-example` to `game`, which is the id of the HTML element where we
// want the game to go.
// The assets (and code) can be found at: https://github.com/photonstorm/phaser3-examples
// You will need to change the paths you pass to `this.load.image()` or any other
// loading functions to reflect where you are putting the assets.
// All loading functions will typically all be found inside `preload()`.

// The simplest class example: https://phaser.io/examples/v3/view/scenes/scene-from-es6-class
var cursors;
var player;
var stars;
var score = 0;
var scoreText;
var bombs;
var gameOver = false;
var starTimer = 0;
var bombTimer = 0;
var isPlayerAlive = true;
var clock;
function spawnStar()
{
  stars.create(Phaser.Math.Between(0, 800), 0, 'star');
}
function spawnBomb()
{
  bombs.create(Phaser.Math.Between(0, 800), 0, 'bomb');
}
class MyScene extends Phaser.Scene {

    constructor() {
        super();

        this.bouncy = null;
    }

    preload() {
        //All assests save the flask.png are from Phaser. I made the flask png myself.
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/flask.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }



    create() {
      clock = this;

      clock.startTime = new Date();
      clock.totalTime = 20;
      clock.timeElapsed = 0;
      createTimer();
      clock.gameTimer = clock.time.events.loop(100, function(){
        updateTimer();
      });

      function createTimer()
      {
        clock.timeLabel = clock.add.text(400, 25, "00.00", {font: "50px Arial", fill: "#fff"}).setOrigin(0.5, 0);
        clock.timeLabel.align = 'center';
      }

      function updateTimer()
      {
        var currentTime = new Date();
        var timeDifference = clock.startTime.getTime() - currentTime.getTime();

        clock.timeElapsed = Math.abs(timeDifference / 100);

        var timeRemaining = clock.totalTime - clock.timeElapsed;

        var minutes = Math.floor(timeRemaining / 60);
        var seconds = Math.floor(timeRemaining) - (60 * minutes);

        var result = (minutes < 10) ? "0" + minutes : minutes;
        result += (seconds < 10) ? ":0" + seconds : ":" + seconds;

        clock.timeLabel.text = result;
      }



        this.add.image(400, 300, 'sky');
        //Ground creation
        var platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //Player Setup
        player = this.physics.add.sprite(100, 450, 'dude');
        player.setCollideWorldBounds(true);

        this.anims.create({
          key: 'left',
          frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
          frameRate: 10,
          repeat: -1
        });
        this.anims.create({
          key: 'turn',
          frames: [{key: 'dude', frame: 4}],
          frameRate: 20
        });
        this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('dude', {start: 5, end:8}),
          frameRate: 10,
          repeat: -1
        });

        this.physics.add.collider(player, platforms);

        //Keyboard initialization
        cursors = this.input.keyboard.createCursorKeys();

        //Falling Stars setup
        stars = this.physics.add.group({
          key: 'star'});
        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(player, stars, collectStar, null, this);



        //Score Tracking
        scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});

        function collectStar(player, star)
        {
          star.disableBody(true, true);
          score += 10;
          scoreText.setText('Score: ' + score);
        }

        //Bombs Setup
        bombs = this.physics.add.group();
        this.physics.add.overlap(platforms, bombs, destroyBomb, null, this);
        this.physics.add.collider(player, bombs, hitBomb, null, this);

        function destroyBomb(platform, bomb)
        {
          bomb.disableBody(true, true);
        }

        function hitBomb(player, bomb)
        {
          this.physics.pause();
          player.setTint(0xff0000);
          player.anims.play('turn');
          isPlayerAlive = false;
          gameOver = true;
        }
    }

    update() {
      if (clock.timeElapsed >= clock.totalTime)
      {
        this.time.delayedCall(250, function() {
          this.cameras.main.fade(250);
        }, [], this);
        this.time.delayedCall(500, function() {
          this.scene.restart();
        }, [], this);
      }


      if (isPlayerAlive)
      {
        if (cursors.left.isDown)
        {
          player.setVelocityX(-160);
          player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
          player.setVelocityX(160);
          player.anims.play('right', true);
        }
        else
        {
          player.setVelocityX(0);
          player.anims.play('turn');
        }
        starTimer += 1;
        bombTimer += 1;
        if (starTimer >= 50)
        {
          spawnStar();
          starTimer = 0;
        }
        if (bombTimer >= 25)
        {
          spawnBomb();
          bombTimer = 0;
        }
      }
      else
      {
        this.time.delayedCall(250, function() {
          this.cameras.main.fade(250);
        }, [], this);
        this.time.delayedCall(500, function() {
          isPlayerAlive = true;
          this.scene.restart();
        }, [], this);
      }
    }
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: MyScene,
    physics: { default: 'arcade',
               arcade: {
                        gravity: {y:300},
                        debug: false
               }
    },
});
