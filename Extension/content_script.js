	console.log("content_script");
	var actualCode = '(' + function() {
			window.scripts = [];
			function getRandomInt(max) {
 				return Math.floor(Math.random() * Math.floor(max));
			}
			// 
			function setCharAt(str,index,chr) {
   				 if(index > str.length-1) return str;
    			return str.toString().substring(0,index) + chr + str.toString().substring(index+1);
			}
			const original_ft = CanvasRenderingContext2D.prototype.fillText;
			CanvasRenderingContext2D.prototype.fillText = function (text, x, y, maxWidth=1000){
				let fillText = original_ft.apply(this, [text, x, y, maxWidth]);
				// fillText.data.forEach((v, i, a)=>a[i]+=1);
				script = {'operation': 'call', 'symbol': 'CanvasRenderingContext2D.fillText', 'value': null, 'arguments': JSON.stringify([text, x, y, maxWidth]), 'url': document.URL};
				window.scripts.push(script);
				console.log('Overriden method: fillText');
				return fillText;
			}
			const original_st = CanvasRenderingContext2D.prototype.strokeText;
			CanvasRenderingContext2D.prototype.strokeText =  function(text, x, y, maxWidth = 1000){
				let strokeText = original_st.apply(this, [text, x, y, maxWidth]);
				script = {'operation': 'call', 'symbol': 'CanvasRenderingContext2D.strokeText', 'value': null, 'arguments': JSON.stringify([text, x, y, maxWidth]), 'url': document.URL};
				window.scripts.push(script);
				console.log('Overriden method: strokeText');
				return strokeText;
			}
			const original_fll = CanvasRenderingContext2D.prototype.fill;
			CanvasRenderingContext2D.prototype.fill = function(fillRule= 'nonzero'){
				let fill = original_fll.apply(this, [fillRule]);
				script = {'operation': 'call', 'symbol': 'CanvasRenderingContext2D.fill', 'value': null, 'arguments': JSON.stringify([fillRule]), 'url': document.URL};
				window.scripts.push(script);
				console.log('Overriden method: fill');
				// return fill;
			}
			const original_flp = CanvasRenderingContext2D.prototype.fill;
			CanvasRenderingContext2D.prototype.fill = function(path, fillRule = 'nonzero'){
				// console.log(path);
				let fill = original_flp.apply(this, [path, fillRule]);
				script = {'operation': 'call', 'symbol': 'CanvasRenderingContext2D.fill', 'value': null, 'arguments': JSON.stringify([path, fillRule]), 'url': document.URL};
				window.scripts.push(script);
				console.log('Overriden method: fill');
				// return fill;
			}
			const original_save = CanvasRenderingContext2D.prototype.save;
			CanvasRenderingContext2D.prototype.save = function(){
				let save = original_save.apply(this);
				script = {'operation': 'call', 'symbol': 'CanvasRenderingContext2D.save', 'value': null, 'arguments': null, 'url': document.URL};
				window.scripts.push(script);
				console.log('Overriden method: save');
				// return save;
			}
			const original_restore = CanvasRenderingContext2D.prototype.restore;
			CanvasRenderingContext2D.prototype.restore = function(){
				let restore = original_restore.apply(this);
				script = {'operation': 'call', 'symbol': 'CanvasRenderingContext2D.restore', 'value': null, 'arguments': null, 'url': document.URL};
				window.scripts.push(script);
				console.log('Overriden method: restore');
				// return restore;
			}
			const original_event_listener1 = HTMLCanvasElement.prototype.addEventListener;
			HTMLCanvasElement.prototype.addEventListener = function(type, listener, options ='capture'){
				let res = original_event_listener1.apply(this, [type, listener, options]);
				script = {'operation': 'call', 'symbol': 'HTMLCanvasElement.addEventListener', 'value': null, 'arguments': JSON.stringify([type, listener, options]), 'url': document.URL};
				window.scripts.push(script);
				console.log('Overriden method: addEventListener');
				// return res;
			}
			const original_event_listener2 = HTMLCanvasElement.prototype.addEventListener;
			HTMLCanvasElement.prototype.addEventListener = function(type, listener, useCapture = false){
				let res = original_event_listener2.apply(this, [type, listener, useCapture]);
				script = {'operation': 'call', 'symbol': 'HTMLCanvasElement.addEventListener', 'value': null, 'arguments': JSON.stringify([type, listener, useCapture]), 'url': document.URL};
				window.scripts.push(script);
				console.log('Overriden method: addEventListener');
				// return res;
			}
			const original_toData = HTMLCanvasElement.prototype.toDataURL;
			HTMLCanvasElement.prototype.toDataURL = function(type = 'image/png', encoderOptions = 0.92){
				let res = original_toData.apply(this, [type, encoderOptions]);
				var l = res.length;
				var x = getRandomInt(l);
				res = setCharAt(res, 22, getRandomInt(100));
				res = setCharAt(res, x, getRandomInt(100));
				res = setCharAt(res, l-1, getRandomInt(100));
				script = {'operation': 'call', 'symbol': 'HTMLCanvasElement.toDataURL', 'value': "image/png", 'arguments': JSON.stringify([type, encoderOptions]), 'url': document.URL};
				window.scripts.push(script);
				console.log('Overriden method: toDataURL');
				return res;
			}
			const original_getImage = CanvasRenderingContext2D.prototype.getImageData;
			CanvasRenderingContext2D.prototype.getImageData = function(sx, sy, sw, sh){
				let res = original_getImage.apply(this, [sx, sy, sw, sh]);
				var l = res['data'].length
				var x = getRandomInt(l);
				res['data'] = setCharAt(res['data'], 0, getRandomInt(100));
				res['data'] = setCharAt(res['data'], x, getRandomInt(100));
				res['data'] = setCharAt(res['data'], l-1, getRandomInt(100));
				script = {'operation': 'call', 'symbol': 'CanvasRenderingContext2D.getImageData', 'value': "image/png", 'arguments': JSON.stringify([sx,sy, sw, sh]), 'url': document.URL};
				window.scripts.push(script);
				console.log('Overriden method: getImageData');
				return res;
			}
		}
	+ ')();';

	var script = document.createElement('script');
	script.type = 'text/javascript'
	script.setAttribute("id", "FP");
	// script.defer = true;
	// script.async = true;
	script.textContent = actualCode;
	(document.head||document.documentElement).appendChild(script);