// ---
// Copyright (c) 2010 Francesco Cottone, http://www.kesiev.com/
// ---
	
	var gamecycle={
		createMaingame:function(id,group) {
		return gbox.addObject({
		  	id:id,
		  	group:group,
		  	counter:0,
		  	difficulty:0,
		  	
		  	step:100,
		  	isready:false,
		  	
		  	hud:{},
		  	
		  	
		  	// Level intro animation
		  	
		  	gameIntroAnimation:function(reset) {
		 	 },
		 	 
		  	// game title animation
		  	gameTitleIntroAnimation:function(reset) {
		  	},
		  	
		  
		  	// CHECK
		  	
		  	gameIsHold:function() { // Use this clause to check collision and kill player: if true the level is changing
		  		return (this.step==400)||(this.step==401);
		  	},
		  	
		  	// PRIVATES
		  	
		  	setStep:function(st) {
		  		this.step=st;
		  		this.isready=false;
		  	},
		  	
		  	_resetGroups:function() {
		  		var g=gbox.getGroups();
		  		for (var i=0;i<g.length;i++)
		  			if (g[i]!=this.group) gbox.clearGroup(g[i]);
				gbox.soloGroup(this.group);
		  	},

		  	stepIsReady:function() { this.isready=true; },
		  	blit:function() {
		  		var ok=false;
		  		switch (this.step) {
		  			case 100:
		  			case 102: { // Press Start / Menu
		  				if (!this.isready&&(this.step==100)) {
		  					this._resetGroups();
							this.gameTitleIntroAnimation(true);
		  				}
		  				this.gameTitleIntroAnimation(false);
		  				switch (this.step) {
		  					case 100: { // Press to start
		  						if (!this.isready) {
		  							this.stepIsReady();
		  						}
		  						this.setStep(102);
		  						break;
		  					}
		  					case 102: { // Fader
		  						if (!this.isready) {
		  							this._resetGroups();
		  							toys.resetToy(this,"fadeout");
		  							this.stepIsReady();
		  						}
                  this.setStep(200);
		  						break;
		  					}
		  					break;
		  				}
		  				break;
		  			}
		  			case 200:// Game intro animation
		  			
		  			case 300:// Start game
		  			
		  			

		  			{ // Game playing
		  				if (!this.isready) {
		  					switch (this.step) {
		  						case 200: { // Game intro
		  							toys.resetToy(this,"fadein");
		  							this.level=null;
		  							this._nextlevel=null;
		  							this.hud=toys.ui.hud("maingamehud");
		  							
		  							this.initializeGame();
		  							this.gameIntroAnimation(true);
		  							
		  							break;
		  						}
		  						case 300: {
		  							// Game start
		  							gbox.playAllGroups();
		  							this.changeLevel(this._nextlevel);
		  						}
		  					}
		  					this.stepIsReady();
		  				}
		  				
		  				switch (this.step) {
		  					case 200: { // Game intro
		  						if (this.gameIntroAnimation(false)) this.setStep(300);
		  						break;
		  					}
		  				}
		  				
		  				this.hud.blit();
		  				break;
		  			}
		  		}
		  	}
		  });
		 }
		}
