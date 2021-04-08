import "./phaser.js";
import {MainMenu} from "./MainMenu.js";
import {MyScene} from "./MyScene.js";



const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    backgroundColor: "black",
    scene: [MainMenu, MyScene],
    pixelArt: true,
    physics: { default: 'arcade' },
    });
