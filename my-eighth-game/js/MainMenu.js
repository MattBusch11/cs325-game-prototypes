export class MainMenu extends Phaser.Scene {

    constructor ()
    {
      super({key: "MainMenu"});
	  }

    preload()
    {
      this.load.image("sprBtnPlay", "assets/sprBtnPlay.png");
    }

    create()
    {
      this.title = this.add.text(this.game.config.width * 0.5, 128, "WAVE ONSLAUGHT", {
        fontFamil: 'monospace',
        fontSize: 48,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center'
      });
      this.title.setOrigin(0.5);
      this.add.text(16, 16, 'Left Click to shoot blue lasers\nRight Click to shoot red lasers', {fontSize: '32px', fill: '#FFF'});
      this.btnPlay = this.add.sprite(
        this.game.config.width * 0.5,
        this.game.config.height * 0.5,
        "sprBtnPlay"
      );
      this.btnPlay.setInteractive();
      this.btnPlay.on("pointerup", function()
      {
        this.scene.start("MyScene");
      }, this);
    }
}
