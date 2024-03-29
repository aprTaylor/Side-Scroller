export default class SplashScreen extends Phaser.Scene {
  /**
   *  Takes care of loading the main game assets, including textures, tile
   *  maps, sound effects and other binary files, while displaying a busy
   *  splash screen.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({
      key: 'preload'/*'SplashScreen'*/,

      //  Splash screen and progress bar textures.
      
      pack: {
        files: [{
          key: 'splash-screen',
          type: 'image',
          url: '/static/assets/background.png'
        }, {
          key: 'progress-bar',
          type: 'image',
          url: 'progress-bar.png'
        }]
      }
    });
  }

  /**
   *  Show the splash screen and prepare to load game assets.
   *
   *  @protected
   */
  preload() {
    //  Display cover and progress bar textures.
    //this.showCover();
    this.showProgressBar();

    //  HINT: Declare all game assets to be loaded here.
    this.load.image('spark', 'effect/flare_01.png');
    this.load.image('background', 'background.png');
    this.load.image('ruby', 'gems/gem5.png');
    this.load.image('logo');
    this.load.image('button-sound', 'button_sound.png');
    this.load.image('coin', 'coinGold.png');
    this.load.image('speech-bubble', 'speechBubble.png');
    this.load.image('button', 'button.png')

    this.load.atlas('potions', 'potion.png', 'potion.json');
    this.load.atlas('alchemy', 'Alchemy tools.png', 'alchemy.json');
    this.load.atlas('player', 'spritesheet.png','sprites.json');
    this.load.atlas('npc1', 'npc1.png','npc1.json');
    this.load.atlas('player-idle', 'idle.png','idle.json');
    this.load.atlas('player-jump', 'jump.png','jump.json');
    this.load.spritesheet('tiles', 'tiles.png', {frameWidth: 70, frameHeight: 70});
    this.load.spritesheet('nature', 'plants.png', {frameWidth: 70, frameHeight: 70});
    this.load.tilemapTiledJSON('map', 'map.json');

    this.load.audio("bkg-music", "sound/Dance Dont Delay.mp3");
    this.load.audio("forest", "sound/forest.wav");
    this.load.audio("footsteps", "sound/footsteps.wav")
    this.load.audio("splash", "sound/splash.wav")
    this.load.audio("bubble", "sound/bubble.wav")
    this.load.audio("collect", "sound/collect.wav")
    this.load.audio("collect-glass", "sound/collectGlass.wav")
    this.load.audio("jump1", "sound/jump1.mp3");
    this.load.audio("jump2", "sound/jump2.mp3");
    this.load.audio("jump3", "sound/jump3.mp3");
    this.load.audio("jump4", "sound/jump4.mp3");

    //Plugins
    /*
    const plugins = [
      ["rexbbcodetextplugin", "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/plugins/dist/rexbbcodetextplugin.min.js", true]
    ]
    plugins.forEach(plugin => console.log("Loadied", this.load.plugin(...plugin)));
    console.log("PLUGIN", this.plugins.get('rexbbcodetextplugin'))*/
  }

  /**
   *  Set up animations, plugins etc. that depend on the game assets we just
   *  loaded.
   *
   *  @protected
   */
  create() {
    //  We have nothing left to do here. Start the next scene.
    this.scene.start('Game');
  }

  //  ------------------------------------------------------------------------

  /**
   *  Show the splash screen cover.
   *
   *  @private
   */
  showCover() {
    const i = this.add.image(0, 0, 'splash-screen').setOrigin(0);
    console.log("Image", i)
  }

  /**
   *  Show the progress bar and set up its animation effect.
   *
   *  @private
   */
  showProgressBar() {
   /*
    //  Get the progress bar filler texture dimensions.
    const {width: w, height: h} = this.textures.get('progress-bar').get();

    //  Place the filler over the progress bar of the splash screen.
    const img = this.add.sprite(82, 282, 'progress-bar').setOrigin(0);

    //  Crop the filler along its width, proportional to the amount of files
    //  loaded.
    this.load.on('progress', v => img.setCrop(0, 0, Math.ceil(v * w), h));
    */
   const width = this.cameras.main.width;
   const height = this.cameras.main.height;
   const barHeight = 320;
   const barWidth = 50

   const progressBar = this.add.graphics();
   const progressBox = this.add.graphics();
   progressBox.fillStyle(0x222222, 0.8);
   progressBox.fillRect(width/2, height/2, barHeight, barWidth);
	
  
  const loadingText = this.make.text({
    x: width / 2,
    y: height / 2 - 50,
    text: 'Loading...',
    style: {
        font: '20px monospace',
        fill: '#ffffff'
    }
  });

  loadingText.setOrigin(0.5, 0.5);

  this.load.on('complete', function () {
    progressBar.destroy();
    progressBox.destroy();
    loadingText.destroy();
  });


  this.load.on("progress", (value) => {
    progressBar.clear();
    progressBar.fillStyle(0xffffff, 1);
    progressBar.fillRect(width/2 + barWidth*.1, height/2, + barHeight*.1, 300 * value, barHeight - barHeight*.2);
   })
  }
}
