// Game initialization
var init_game = function() {

  // Prepare hud
  maingame.hud.setWidget("weapon",{widget:"radio",value:0,tileset:"items",frames:[0],dx:gbox.getScreenW()-30,dy:gbox.getScreenH()-400});

  // We are not going to use faces for dialogues
  faces={ noone:{ x:10, y:170,box:{x:0,y:160,w:gbox.getScreenW(),h:60,alpha:0.5} } };

  addDialogues();

  tilemaps={
    _defaultblock:100, // The block that is over the borders (a wall)
    queststatus:{}, // Every step the player does, is marked here (opened doors, sections cleared etc)
    yard:help.finalizeTilemap({
      title:map_title,
    tileset:the_tileset,
    map:the_map,
    addObjects:function() {
      addNpcs();
    },
    mapActions:function() {
                 var pl=gbox.getObject("player","player");
                 var ontile=help.getTileInMap(pl.x+pl.colx+pl.colhw,pl.y+pl.coly+pl.colhh,tilemaps[tilemaps.current],tilemaps._defaultblock,"map");

               },
    tileIsSolid:function(obj,t){ return (obj._bullet?(t!=20)&&(t!=19):true)&&(t>11) }
    })
  };

  gbox.addObject({
    id:"bg",
    group:"background",
    blit:function() {
      gbox.centerCamera(gbox.getObject("player","player"),{w:tilemaps[tilemaps.current].w,h:tilemaps[tilemaps.current].h});
      gbox.blit(gbox.getBufferContext(),gbox.getCanvas("tileslayer"),{dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),sourcecamera:true});
    },
  });

  gbox.addObject(object_to_add);

};
