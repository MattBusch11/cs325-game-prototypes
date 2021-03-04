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
  }

  moveUp()
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
  }

  update()
  {
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData("isShooting"))
    {
      if (this.getData("timerShootTick") < this.getData("timerShootDelay"))
      {
        this.setData("timerShootTick", this.getData("timerShootTick") + 1);
      }
      else
      {
        var laser = new Laser(this.scene, this.x, this.y);
        this.scene.Lasers.add(laser);
        this.setData("timerShootTick", 0);
      }
    }
  }
}

export class Laser extends Entity
{
  constructor(scene, x, y)
  {
    super(scene, x, y, "laser");
    this.body.velocity.y = -200;
  }
}

export class Virus extends Entity
{
  constructor(scene, x, y)
  {
    super(scene, x, y, "enemy1", "Virus");
    this.body.velocity.y = Phaser.Math.Between(35, 75);
    this.states = {
      MOVE_DOWN: "MOVE_DOWN",
      CHASE: "CHASE"
    };
    this.state = this.states.MOVE_DOWN;
  }
  update()
  {
    if (!this.getData("isDead") && this.scene.player)
    {
      if (Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.scene.player.x,
        this.scene.player.y,
      ) < 320)
      {
        this.state = this.states.CHASE;
      }
      if (this.state == this.states.CHASE)
      {
        var dx = this.scene.player.x - this.x;
        var dy = this.scene.player.y - this.y;
        var angle = Math.atan2(dy, dx);
        var speed = 100;
        this.body.setVelocity(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed
        );
      }
    }
  }
}
