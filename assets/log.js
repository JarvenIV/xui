;(function(w){
	var doc = document;
	var UPLOAD_URL = 'https://xumeng.site/';
	// w.onerror = function(message, source, lineNo, colNo, error){
	//     const errorInfo = {
	//     	message: message,
	//     	source: source,
	//     	lineNumber: lineNo,
	//     	colNumber: colNo,
	//     	error: error,
	//     	type: 'Uncaught'
	// 	};
	// 	console.log(error);
	//     sendError(errorInfo);
	// };

	w.addEventListener('error', function(event){
		var e = event;
		console.log(e.target);
		const tar = {
			id: e.target.id,
			class: e.target.classList && [...e.target.classList].join(),
			text: e.target.innerHTML,
			node: e.target.nodeName
		};
		const errorInfo = {
	    	message: e.message,
	    	fileName: e.filename,
	    	lineNumber: e.colno,
	    	colNumber: e.lineno,
			stack: e.error && e.error.stack,
			target:(tar),
	    	type: e.type
		};
	    sendError(errorInfo);
	    // e.preventDefault();
	},true);

	w.addEventListener('unhandledrejection', function(event){
		var e = event;
		const errorInfo = {
	    	type: e.type,
	    	reason: e.reason.toString()
	    };
	    sendError(errorInfo);
	    // e.preventDefault();
	});

	function isFunction(fn){
		return typeof fn === 'function';
	};

	w.addEventListener('rejectionhandled', function(event){
		console.log(event);
	});

	Promise.prototype['catch'] = function(onRejected){
		const reject = function (error) {
	        var errorInfo = {
	            message: 'Promise Catch',
	            error: error
	        };
	        sendError(errorInfo);
	        if (isFunction(onRejected)) {
	            return onRejected(error);
	        };
	    };
	    return this.then(null, reject);
	};

	function getUserInfo(){
		var n = navigator;
		const userInfo = {
			cookieEnabled: n.cookieEnabled,
			data: new Date(),
			language: n.language || n.userLanguage,
			location: location.href,
			platform: n.platform,
			product: n.product,
			referrer: doc.referrer,
			screen: w.screen.width + 'px',
			userAgent: n.userAgent
		};
		return userInfo;
	};

	function jsonS(data){
		return typeof json === 'string' ? JSON.parse(data) : JSON.stringify(data);
	};

	function sendError(info){
		var mes = new Image();
		var isQuesMark = UPLOAD_URL.indexOf('?') > -1 ? '&data=' : '?data=';
		var useInfo = getUserInfo();

		var sendObj = Object.assign({}, info, useInfo);
		console.log(jsonS(sendObj).length);
		mes.src = isQuesMark + jsonS(sendObj);
	};
})(window);