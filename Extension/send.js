setTimeout(function(){
	console.log("send script");
		var actualCode = '(' + function() {

			var uniq = function(arr){
				if(!arr){
					return arr;
				}
				var arr = Object.values(arr);
				// console.log(arr);
				var obj = {};

				arr.forEach(function (item, index) {
					obj[item['symbol']] = item;
				});
			   
				res = new Array();
				for (var key in obj){
			    	res.push(obj[key]);
				}
				console.log(res);
				return res;
			}
		var xhr = new XMLHttpRequest();
		var url = 'https://canvas-fp-api.appspot.com/check';
		xhr.open('POST', url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onreadystatechange = function () {
		    if (xhr.readyState === 4 && xhr.status === 200) {
		        var json = JSON.parse(xhr.responseText);
		        window.postMessage(json, "*");
		    }
		}
		var data = JSON.stringify(uniq(window.scripts));
		console.log(data);
		xhr.send(data);
	}+ ')();';
	var script = document.createElement('script');
	script.type = 'text/javascript'
	script.defer = true;
	script.async = true;
	script.textContent = actualCode;
	(document.head||document.documentElement).appendChild(script);
	window.addEventListener("message", function(event) {
		chrome.runtime.sendMessage({"fingerprinting": event.data}, function(response) {});
		return true;
	});
}, 2000);
