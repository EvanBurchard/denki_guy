  var object_to_add = { id:"player",
    group:"player",
    tileset:"player",
    zindex:0, // Needed for zindexed objects
    isPaused:false, // Pauses the player during dialogues, cutscenes etc.

    doPause:function(p) {
      this.isPaused=p;
    },

    initialize:function() {
                 toys.topview.initialize(this,{
                   haspushing:true,
                 shadow:{tileset:"shadows",tile:0},
                 frames:{
                   standup:{ speed:1, frames:[0] },
                 standdown:{ speed:1, frames:[3] },
                 standleft:{ speed:1, frames:[6] },
                 standright:{ speed:1, frames:[6] },
                 movingup:{speed:3,frames:[0,1,0,2] },
                 movingdown:{speed:3,frames:[3,4,3,5] },
                 movingleft:{speed:3,frames:[6,7] },
                 movingright:{speed:3,frames:[6,7] },
                 pushingup:{speed:6,frames:[0,1,0,2] },
                 pushingdown:{speed:6,frames:[3,4,3,5] },
                 pushingleft:{speed:6,frames:[6,7] },
                 pushingright:{speed:6,frames:[6,7] }
                 }
                 });
               },


    first:function() {

            // Counter
            this.counter=(this.counter+1)%60;

            var pl=gbox.getObject("player","player");
            var ontile=help.getTileInMap(pl.x+pl.colx+pl.colhw,pl.y+pl.coly+pl.colhh,tilemaps[tilemaps.current],tilemaps._defaultblock,"map");
            
            //take player to link
            for (var value in tiles_to_leave_from){
              if (ontile==value) {
                leave_page(tiles_to_leave_from[value]);
              }
            }

            if (this.stilltimer||maingame.gameIsHold()||this.isPaused)
              toys.topview.controlKeys(this,{}); // Stays still. No key is moving! :)
            else
              toys.topview.controlKeys(this,{left:"left",right:"right",up:"up",down:"down"}); // Moves (if not attacking)
            toys.topview.handleAccellerations(this);
            toys.topview.handleGravity(this); // z-gravity					
            toys.topview.applyForces(this); // Apply forces
            toys.topview.tileCollision(this,tilemaps[tilemaps.current],"map",tilemaps._defaultblock); // tile collisions
            toys.topview.floorCollision(this); // Collision with the floor (for z-gravity)
            toys.topview.spritewallCollision(this,{group:"walls"}); // Doors and tresaure chests are sprites that acts like a wall.
            toys.topview.adjustZindex(this);
            if (!this.stilltimer) toys.topview.setFrame(this); // set the right animation frame (if not attacking)

            if (!this.isPaused&&!maingame.gameIsHold())
              if (gbox.keyIsHit("a")) {
                var ahead=toys.topview.getAheadPixel(this,{distance:5});
                ahead.group="walls";
                ahead.call="doPlayerAction";
                if (!toys.topview.callInColliding(this,ahead)) // if any action is done
                  maingame.hud.addValue("weapon","value",1);
              }

          },
    blit:function() {

           gbox.blitTile(gbox.getBufferContext(),{tileset:this.shadow.tileset,tile:this.shadow.tile,dx:this.x,dy:this.y+this.h-gbox.getTiles(this.shadow.tileset).tileh+4,camera:this.camera});
           // Then the object. Notes that the y is y+z to have the "over the floor" effect.
           gbox.blitTile(gbox.getBufferContext(),{tileset:this.tileset,tile:this.frame,dx:this.x,dy:this.y+this.z,camera:this.camera,fliph:this.fliph,flipv:this.flipv});
         }

  }
