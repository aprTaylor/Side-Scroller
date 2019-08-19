//Sprite https://www.gameart2d.com/cute-girl-free-sprites.html
//https://opengameart.org/content/alchemy-tools-1
//<a href="https://pngtree.com/">Graphics from pngtree.com</a>
//Code Inferno Games (codeinferno.com)

//import Logo from '@/objects/logo';
import Map from '@/objects/map';
import Input from '@/objects/input';
import Player from '../objects/player';
import Score from '../objects/score';
import Animations from '../objects/animations';
import Cameras from '../objects/cameras';
import Gems from '../objects/gems';
import Cauldron from '../objects/cauldron';

let map;
let player;
let input;
let gems;
//var groundLayer, coinLayer;
let score;
//var text;
 

export default class Game extends Phaser.Scene {
  /**
   *  A sample Game scene, displaying the Phaser logo.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Game'});
    this.objects = {};
  }

  add(key, object, ...args){
    this.objects[key] = new object(this,...args);
    if(this.object[key].create)
      this.object[key].create(this);
  }

  addAll(arr){
    for(let i of arr){
      this.objects[i[0]] = new i[1](this,...i.slice(2));
    }
    for(let i of arr){
      if(this.objects[i[0]].create){
        console.log("Create", this.physics)
        this.objects[i[0]].create(this);
      }
    }
  }

  get(key){
    return this.objects[key];
  }

  del(key){
    delete this.objects[key];
  }

  /**
   *  Called when a scene is initialized. Method responsible for setting up
   *  the game objects of the scene.
   *
   *  @protected
   *  @param {object} data Initialization parameters.
   */
  create(/* data */) {
    this.groundLevel = 450;
    const scene = this;

    this.addAll([
      ["map", Map],
      ["input", Input],
      ["score", Score],
      ["cauldron", Cauldron, 700, scene.groundLevel, this.get("map")],
      ["gems", Gems],
      ["player", Player],
      ["cameras", Cameras],
      ["animations", Animations]
    ])

    this.scene.launch('UI', this.objects);
  }

  /**
   *  Called when a scene is updated. Updates to game logic, physics and game
   *  objects are handled here.
   *
   *  @protected
   *  @param {number} t Current internal clock time.
   *  @param {number} dt Time elapsed since last update.
   */
  update(t, dt) {
    
    Object.values(this.objects).forEach(obj => {
      if(obj.update){
        obj.update(this, t, dt)
      }
    })
  }
}