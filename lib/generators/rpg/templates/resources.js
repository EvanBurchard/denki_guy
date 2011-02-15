function loadResources(){
  //load the image that contains the font
  gbox.addImage("font","images/game/font.png");
  //describe the font's name, dimensions, etc.
  gbox.addFont({id:"small",image:"font",firstletter:" ",tileh:8,tilew:8,tilerow:255,gapx:0,gapy:40});

  //load the image that contains the sprites
  gbox.addImage("sprites","images/game/cels.png");

  //describe a tileset inside of the the sprite image
  //In the npc file, these are referred to by their index left to right, using the tilew as an indication of how far to travel with every increase in number, ie. if tilew is 30, when a sprite is 150 pixels to the right, it will be 4 (0,1,2,3,4) 
  //The tileh indicates the height of the sprite
  //tilerow is how many images appear in a given row (so if the tilerow is 12, a call to sprite 13 will wrap to the next line)
  //gapx and gapy are gaps between tile columns and rows, respectively
  //http://tools.bostongamejams.com/akihabara/docs/symbols/gbox.html#.addTiles
 
  gbox.addTiles({id:"player",image:"sprites",tileh:30,tilew:30,tilerow:12,gapx:0,gapy:0});
  gbox.addTiles({id:"tiles",image:"sprites",tileh:30,tilew:30,tilerow:15,gapx:0,gapy:30});
  gbox.addTiles({id:"shadows",image:"sprites",tileh:15,tilew:30,tilerow:12,gapx:0,gapy:210});
  gbox.addTiles({id:"npc",image:"sprites",tileh:30,tilew:30,tilerow:17,gapx:0,gapy:90});
  gbox.addTiles({id:"house",image:"sprites",tileh:60,tilew:90,tilerow:1,gapx:0,gapy:120});		

  //Try to ignore these unless you want some extra features that akihabara has.  We a long way from akihabara's functionality, and this is some cruft that had to stick around... Please excuse the mess.
  gbox.addTiles({id:"bonus",image:"sprites",tileh:20,tilew:20,tilerow:12,gapx:0,gapy:195});
  gbox.addTiles({id:"hud",image:"sprites",tileh:20,tilew:20,tilerow:9,gapx:240,gapy:195});
  gbox.addTiles({id:"items",image:"sprites",tileh:20,tilew:20,tilerow:2,gapx:0,gapy:422});
}
