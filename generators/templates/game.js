var tilemaps;
var maingame;
var dialogues;
var faces;

function leave_page(website) {				
    $('canvas').fadeOut('slow', function() {
      window.location = website;
      maingame.gameIsHold = true;
    });
}

function go() {

  gbox.setGroups(["background","player","bonus","foes","walls","playerbullets","foesbullets","sparks","foreground","gamecycle"]);
  // player, walls, bullets and foes are under z-index layer
  gbox.setRenderOrder(["background",gbox.ZINDEX_LAYER,"sparks","foreground","gamecycle"]);

  maingame=gamecycle.createMaingame("gamecycle","gamecycle");	

  // No level intro animation
  maingame.gameIntroAnimation=function() { return true; }

  // Change level
  maingame.changeLevel=function(level) {
    // Cleanup the level
    gbox.trashGroup("playerbullets");
    gbox.trashGroup("foesbullets");
    gbox.trashGroup("foes");
    gbox.trashGroup("bonus");
    gbox.trashGroup("walls");
    gbox.purgeGarbage(); // Since we're starting, we can purge all now
    level={level:"yard"}; 
    tilemaps.current=level.level;
    gbox.createCanvas("tileslayer",{w:tilemaps[tilemaps.current].w,h:tilemaps[tilemaps.current].h});
    gbox.blitTilemap(gbox.getCanvasContext("tileslayer"),tilemaps[tilemaps.current]);
    toys.topview.spawn(gbox.getObject("player","player"),{x:player_starts_at["x"],y:player_starts_at["y"]});
    tilemaps[tilemaps.current].addObjects();
  }

  maingame.initializeGame= init_game;

  // Changes a tile in the map. It also adds smoke if asked.
  maingame.setTileInMap=function(x,y,tile) {
    help.setTileInMap(gbox.getCanvasContext("tileslayer"),tilemaps[tilemaps.current],x,y,tile);
  }


  // Starts a dialogue
  maingame.startDialogue=function(id,pause) {
    gbox.addObject({
      group:"foreground",
      id:"dialogue",
      dialogueToRead:id,
      pause:1+(pause==null?0:1), // Pauses a dialog for a while. Is important to wait a frame very time to cancel the last "b" key press (for interacting, for example)
        initialize:function() {
          gbox.getObject("player","player").doPause(true); // First pause the player
        },
      blit:function() {
             if (this.pause)
      this.pause--;
             else if (toys.dialogue.render(this,"dialogue",dialogues[this.dialogueToRead])) { // If the dialogue is ended
               gbox.getObject("player","player").doPause(false); // Unpause the player
               gbox.trashObject(this); // Trash the dialogue itself.
             }
           }
    });
  }

  // Add a still object. Are sprites that supports the z-index (houses, trees.) You can walk around these objects
  maingame.addBlock=function(x,y,tileset,frame) {
    gbox.addObject({
      group:"walls",
    tileset:tileset,
    zindex:0, // Needed for zindexed objects
    x:x,
    y:y,
    frame:frame,

    initialize:function() {
      toys.topview.initialize(this); // Any particular initialization. Just the auto z-index
    },
    blit:function() {
           if (gbox.objectIsVisible(this)) {
             // Then the object. Notes that the y is y-z to have the "over the floor" effect.
             gbox.blitTile(gbox.getBufferContext(),{tileset:this.tileset,tile:this.frame,dx:this.x,dy:this.y+this.z,camera:this.camera,fliph:this.fliph,flipv:this.flipv});
           }
         }

    });
  }

  // Add a npc (Not Playing Charachter)
  maingame.addNpc=function(x,y,still,dialogue,questid,talking,has_shadow) {
    // An easy way to create an NPC.
    if (has_shadow==true){
      var where_shadow = 0;
    }
    else {
      var where_shadow = 1;
    };
    gbox.addObject({
      questid:questid,
      group:"walls",
      tileset:"npc",
      zindex:0, // Needed for zindexed objects
      x:x,
      y:y,
      myDialogue:dialogue,
      iamTalking:false,
      shadow:{tileset:"shadows",tile:where_shadow},
      frames:{
        still:{ speed:6, frames:still },
      talking:{ speed:6, frames:(talking==null?still:talking) }
      },

      doPlayerAction:function(sw) {
                       this.iamTalking=true; // go in talking mode
                       maingame.startDialogue(this.myDialogue); // Starts its dialogue. Is another object because of z-index
                     },

      initialize:function() {
                   toys.topview.initialize(this); // Any particular initialization. Just the auto z-index
                 },

      first:function(by) {
              this.counter=(this.counter+1)%12;

              if (this.iamTalking) {
                this.frame=help.decideFrame(this.counter,this.frames.talking);
                if (!gbox.getObject("foreground","dialogue")) {// Check if the dialogue ended
                  this.iamTalking=false; // Stop talking
                  if ((this.questid!=null)&&(!tilemaps.queststatus[this.questid])) {
                    tilemaps.queststatus[this.questid]=true; // If related to a quest, the quest is marked as done
                    maingame.addQuestClear();
                  }
                }
              } else
                this.frame=help.decideFrame(this.counter,this.frames.still);
            },

      blit:function() {
             if (gbox.objectIsVisible(this)) {
               // Shadowed object. First draws the shadow...
               gbox.blitTile(gbox.getBufferContext(),{tileset:this.shadow.tileset,tile:this.shadow.tile,dx:this.x,dy:this.y+this.h-gbox.getTiles(this.shadow.tileset).tileh+4,camera:this.camera});
               // Then the object. Notes that the y is y-z to have the "over the floor" effect.
               gbox.blitTile(gbox.getBufferContext(),{tileset:this.tileset,tile:this.frame,dx:this.x,dy:this.y+this.z,camera:this.camera,fliph:this.fliph,flipv:this.flipv});
             }
           }

    });
  }
  gbox.go();		  
}

window.addEventListener('load', function () {
  help.akihabaraInit(page_title);
  gbox.setCallback(go);

  loadResources();

  gbox.loadAll();
}, false);


