// ---
// Copyright (c) 2010 Francesco Cottone, http://www.kesiev.com/
// ---

	var tool={
		_images:[],
		_loadedflag:[],
		_data:{},
		_count:0,
		_countloaded:0,
		_loaded:function(id) {
			this._loadedflag[id]=true;
			tool._countloaded++;
			document.title=tool._countloaded+"/"+tool._count;
			for (var i=0;i<this._images.length;i++)
				if (!this._loadedflag[i]) document.title+=this._images[i].src+", ";
		},
		_loadall:function() {
			if (tool._count!=tool._countloaded)
				setTimeout(tool._loadall,1000);
			else
				tool._allloaded();
		},
		makecels:function(data) {
			this._data=data;
			var id=0;
			for (var r=0;r<data.rows.length;r++) {
				for (var i=0;i<data.rows[r].length;i++) {
					this._images[id]=new Image();
					this._images[id].addEventListener('load', function(){tool._loaded(this.id)},false);
					this._images[id].setAttribute("id",id);
					this._images[id].src=data.rows[r][i].img;
					this._count++;
					id++;
				}
			}
			this._loadall();
		},
		_allloaded:function() {
			var data=this._data;
			var wid=0;
			var hei=0;
			var curwid=0;
			var id=0;
			for (var r=0;r<data.rows.length;r++) {
				hei+=this._images[id].height*1;
				curwid=0;
				for (var i=0;i<data.rows[r].length;i++) { curwid+=this._images[id].width*1; id++}
				if (wid<curwid) wid=curwid;
			}
			
			var cels=document.createElement("canvas");
			cels.style.border="1px solid red";
			cels.setAttribute('height',hei);
			cels.setAttribute('width',wid);
			document.body.appendChild(cels);
			var ctx=cels.getContext("2d");
		
			var curx=0;
			var cury=0;
			id=0;
			for (var r=0;r<data.rows.length;r++) {
				curx=0;
				for (var i=0;i<data.rows[r].length;i++) {
					ctx.drawImage(this._images[id],curx,cury);
					if (data.rows[r][i].filter) {
						if (data.rows[r][i].filter) {
							var imgd = ctx.getImageData(curx, cury, this._images[id].width, this._images[id].height);
							var pix = imgd.data;

							// Loop over each pixel and invert the color.
							for (var z = 0, n = pix.length; z < n; z += 4) {
								if (data.rows[r][i].filter.replace) {
									for (var w=0;w<data.rows[r][i].filter.replace.length;w++) {
										
										repl=data.rows[r][i].filter.replace[w].from;
										to=data.rows[r][i].filter.replace[w].to;
										if ((pix[z]==repl.r)&&(pix[z+1]==repl.g)&&(pix[z+2]==repl.b)&&(pix[z+3]==repl.a)) {
											pix[z  ] = to.r;
 											pix[z+1] = to.g;
  											pix[z+2] =to.b;
  											pix[z+3] =to.a;
										}
									}
								}
								if (data.rows[r][i].filter.color&&(pix[z+3]!=0)) {
									pix[z  ] = data.rows[r][i].filter.color.r;
 									pix[z+1] = data.rows[r][i].filter.color.g;
  									pix[z+2] =data.rows[r][i].filter.color.b;
  									pix[z+3] =data.rows[r][i].filter.color.a;
								}
  								
  								// i+3 is alpha (the fourth element)
							}
							ctx.putImageData(imgd, curx, cury);
						
						}
					}
					curx+=this._images[id].width*1;
					id++;
				}
				cury+=this._images[id-1].height*1;
			}
			
		}
	
	}
	
	