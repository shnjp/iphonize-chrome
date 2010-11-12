(function() {
	function enumerate(array, callback) {
		for(var idx=0;idx<array.length;++idx)
			callback.call(array[idx], idx, array[idx]);
	}
/*
	function enumCSSRules(sheets, callback) {
		for(var sheetIdx = 0;sheetIdx < sheets.length;++sheetIdx) {
			var sheet = sheets[sheetIdx];
			var cssRules = sheet.cssRules;
			for(var idx=0;idx < cssRules.length;++idx) {
				callback(sheet, cssRules[idx]);
			}
		}
	}*/

	function createCSSStyleSheet(styles) {
		var element = document.createElement('style');
		element.appendChild(document.createTextNode(styles));
		document.getElementsByTagName('head')[0].appendChild(element);
		return element.sheet;
	}

	
	var currentSheets = [];
	
	for(var idx = 0;idx < document.styleSheets.length;++idx) {
		currentSheets.push(document.styleSheets[idx]);
	}
	

	var newStyles = [];
//	var newSheet = createCSSStyleSheet();
//	console.log(newSheet);

	enumerate(currentSheets, function(idx, styleSheet) {
		console.log(styleSheet);
		
		enumerate(styleSheet.cssRules, function(idx, ruleOrMedia) {
			//console.log(ruleOrMedia, typeof ruleOrMedia, ruleOrMedia.constructor.__name);
			if(ruleOrMedia.media) {
				// is CSSMediaRule
				var media = ruleOrMedia.media[0];
				
				if(media == "screen and (max-device-width: 320px)") {
					// is iphone media
					enumerate(ruleOrMedia.cssRules, function(idx, rule) {
						newStyles.push(rule.cssText);
					});
				}
				
			} else {
				// is CSSRule
			}
		});
	
		this.disabled = true;
	});
	
	newStyles.push('html { width: 320px !important; border-right: 1px solid black !important; }');
	createCSSStyleSheet(newStyles.join('\n'));
/*

	enumCSSRules(currentSheets, function(styleSheet, rule) {
		styleSheet.disabled = true;
		console.log(rule);
		
		//newSheet.cssRules.push(rule);
		console.log(rule.cssText);
		
		newStyles.push(rule.cssText);
	});
*/
})();