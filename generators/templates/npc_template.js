//This is how to add blocks (objects you can't walk through) and npcs (non-playable characters) to the map.
function addNpcs() {
  //params: x, y, name, sprite number(left to right), ?
  maingame.addBlock(60,30,"house",0, true);
  //params: x, y, idle sprite number(s), name, ?, talking sprite number(s), ?
  maingame.addNpc(60,100,[8],"gray_critter",null,[9,10], true);
  maingame.addNpc(330,80,[15],"kid_critter",null,[15],true);
  maingame.addNpc(420,80,[4],"brown_critter",null,[5,6], true);
}
//This is how dialogues are added to NPCs.
function addDialogues(){
  dialogues={

//npc_name:{font_name, key to press to go to the next 'scene', key to press to exit the dialogue, which face to use(disabled by default)
    gray_critter:{ font:"small", skipkey:"a", esckey:"b", who: faces,
                   scenes:[
//each 'scene' corresponds to a screen of text (by default, five lines is good.  More than that will roll off the bottom unless a smaller font is used. Each line is separated by a quote, quote pattern, ala an array of strings)
                   { speed:1, who:"noone", talk:["If you want to change what I say,", "head over to the npc file."]}]

                 },
    brown_critter:{ font:"small", skipkey:"a", esckey:"b", who: faces,
                   scenes:[
                   { speed:1, who:"noone", talk:["If you try to go in the caves or house,", "You may encounter something unexpected.", "To fix that, edit the map file."]

                   }

                   ]
                 },
    kid_critter:{ font:"small", skipkey:"a", esckey:"b", who: faces,
                  scenes:[
                  { speed:1, who:"noone", talk:["What do I know?  I'm just a kid!"]

                  }

                  ]
                }
  }
}
