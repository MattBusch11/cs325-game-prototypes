import {Button} from './button.js';

export class MainMenu extends Phaser.Scene {

    constructor ()
    {
      super({key: "MainMenu"};
	  }

    create()
    {
      this.scene.start("MyScene");
    }

    update() {
        //	Do some nice funky main menu effect here
    }

    // The callback for the button.
    startGame() {
        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        this.music.stop();

        //	And start the actual game
        this.scene.start( 'Game' );
    }

}
