export class Entity extends Phaser.GameObjects.Sprite
{
  constructor(scene, x, y, key, type)
  {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData("type", type);
    this.setData("isDead", false);
  }

  explode(canDestroy)
  {
    if (!this.getData("isDead"))
    {
      this.setTexture("sprExplosion");
      this.play("sprExplosion");

      if (this.shootTimer !== undefined)
      {
        if (this.shootTimer)
        {
          this.shootTimer.remove(false);
        }
      }

      this.setAngle(0);
      this.body.setVelocity(0, 0);

      this.on('animationcomplete', function()
      {
        if (canDestroy)
        {
          this.destroy();
        }
        else
        {
          this.setVisible(false);
        }
      }, this);
      this.setData("isDead", true);
    }
  }
}

export class Player extends Entity
{
  constructor(scene, x, y, key)
  {
    super(scene, x, y, key, "Player");
    this.setData("speed", 200);
    this.play("player");
    this.setData("isShooting", false);
    this.setData("timerShootDelay", 10);
    this.setData("timerShootTick", this.getData("timerShootDelay") - 1);
    this.setData("pointerX", 0);
    this.setData("pointerY", 0);
    this.setData("redLaser", false);
  }

  /*moveUp()
  {
    this.body.velocity.y = -this.getData("speed");
  }

  moveDown()
  {
    this.body.velocity.y = this.getData("speed");
  }

  moveLeft()
  {
    this.body.velocity.x = -this.getData("speed");
  }

  moveRight()
  {
    this.body.velocity.x = this.getData("speed");
  }*/

  update()
  {
    this.body.setVelocity(0, 0);

    /*this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);*/

    if (this.getData("isShooting"))
    {
      if (this.getData("timerShootTick") < this.getData("timerShootDelay"))
      {
        this.setData("timerShootTick", this.getData("timerShootTick") + 1);
      }
      else if (this.getData("redLaser"))
      {
        var laser = new RedLaser(this.scene, this.x, this.y);
        laser.setScale(this.scaleX * .4)
        this.scene.redLasers.add(laser);
        this.setData("timerShootTick", 0);
      }
      else
      {
        var laser = new BlueLaser(this.scene, this.x, this.y);
        laser.setScale(this.scaleX * .4)
        this.scene.blueLasers.add(laser);
        this.setData("timerShootTick", 0);
      }
    }
  }
}

export class Laser extends Entity
{
  constructor(scene, x, y, key)
  {
    super(scene, x, y, key);
    var pointerX = this.scene.player.getData("pointerX");
    var pointerY = this.scene.player.getData("pointerY");
    //this.setRotation(Phaser.Math.Angle.Between(this.scene.player.x, this.scene.player.y, pointerX, pointerY));
    var dx = pointerX - this.x;
    var dy = pointerY - this.y;
    var angle = Math.atan2(dy, dx);
    var speed = 200;
    this.body.setVelocity(
      Math.cos(angle) * speed,
      Math.sin(angle) * speed);
      console.log("Velocity " + this.getData("pointerX"));
  }
}

export class RedLaser extends Laser
{
  constructor(scene, x, y)
  {
    super(scene, x, y, "redLaser");
  }
}

export class BlueLaser extends Laser
{
  constructor(scene, x, y)
  {
    super(scene, x, y, "blueLaser");
  }
}

export class Virus extends Entity
{
  constructor(scene, x, y)
  {
    super(scene, x, y, "enemy1", "Virus");
    this.setData("zig", false);
    this.setData("dx", this.scene.player.x - this.x);
    this.setData("dy", this.scene.player.y - this.y);
    this.states = {
      MOVE_DOWN: "MOVE_DOWN",
      CHASE: "CHASE"
    };
    this.state = this.states.CHASE;

    this.shootTimer = this.scene.time.addEvent({
      delay: 3000,
      callback: function()
      {
        var laser = new EnemyLaser(
          this.scene,
          this.x,
          this.y
        );
        laser.setScale(this.scaleX * .4);
        this.scene.enemyLasers.add(laser);
        this.setData("zig", !this.getData("zig"));
      },
      callbackScope: this,
      loop: true
    });
  }

  onDestroy()
  {
    if (this.shootTimer !== undefined)
    {
      if (this.shootTimer)
      {
        this.shootTimer.remove(false);
      }
    }
  }

  update()
  {
      if (this.state == this.states.CHASE)
      {
        var angle = Math.atan2(this.getData("dy"), this.getData("dx"));
        var speed = 50;
        if (this.getData("zig"))
        {
          this.body.setVelocity(
            Math.cos(angle + 45) * speed,
            Math.sin(angle + 45) * speed
          );
        }
        else
        {
          {
            this.body.setVelocity(
              Math.cos(angle - 45) * speed,
              Math.sin(angle - 45) * speed
            );
          }
        }
      }
    }
  }


export class ShootingVirus extends Entity
{
  constructor(scene, x, y)
  {
    super(scene, x, y, "enemy2", "ShootingVirus");

    this.shootTimer = this.scene.time.addEvent({
      delay: 2000,
      callback: function()
      {
        var laser = new EnemyLaser(
          this.scene,
          this.x,
          this.y
        );
        laser.setScale(this.scaleX * .4);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true
    });

    this.states = {
      MOVE_DOWN: "MOVE_DOWN",
      CHASE: "CHASE"
    };
    this.state = this.states.CHASE;
  }

  onDestroy()
  {
    if (this.shootTimer !== undefined)
    {
      if (this.shootTimer)
      {
        this.shootTimer.remove(false);
      }
    }
  }

  update()
  {
      if (this.state == this.states.CHASE)
      {
        var dx = this.scene.player.x - this.x;
        var dy = this.scene.player.y - this.y;
        var angle = Math.atan2(dy, dx);
        var speed = 25;
        this.body.setVelocity(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed
        );
      }
    }
  }

  export class OrbitingVirus extends Entity
  {
    constructor(scene, x, y)
    {
      super(scene, x, y, "enemy3", "OrbitingVirus");
      this.setScale(this.scaleX * 3)
      this.shootTimer = this.scene.time.addEvent({
        delay: 2500,
        callback: function()
        {
          var laser = new EnemyLaser(
            this.scene,
            this.x,
            this.y
          );
          laser.setScale(this.scaleX * .4);
          this.scene.enemyLasers.add(laser);
        },
        callbackScope: this,
        loop: true
      });
    }

    onDestroy()
    {
      if (this.shootTimer !== undefined)
      {
        if (this.shootTimer)
        {
          this.shootTimer.remove(false);
        }
      }
    }

    update()
    {
      var dx = this.scene.player.x - this.x;
      var dy = this.scene.player.y - this.y;
      var angle = Math.atan2(dy, dx);
      var speed = 50;
      this.body.setVelocity(
        Math.cos(angle + 200) * speed,
        Math.sin(angle + 200) * speed
      );
    }
  }


export class EnemyLaser extends Entity
{
  constructor(scene, x, y)
  {
    super(scene, x, y, "enemyLaser");
    var dx = this.scene.player.x - this.x;
    var dy = this.scene.player.y - this.y;
    var angle = Math.atan2(dy, dx);
    var speed = 75;
    this.body.setVelocity(
      Math.cos(angle) * speed,
      Math.sin(angle) * speed);
  }
}
