/**
 * 判断浏览器的版本是否符合要求
 * IE11以上，chrome51以上，safari11以上
 */
export let browserView = () =>{
	let osAndBrowserInfo = getOsAndBrowserInfo();
	// console.log(osAndBrowserInfo);
	let osName = osAndBrowserInfo.os; 
	let browserName = osAndBrowserInfo.browser.name;
	let browserVersion = osAndBrowserInfo.browser.version;
	if(browserName ==='IE' && browserVersion >=11){
		return true;
	}else if(browserName ==='Chrome' && browserVersion >= 48){
		return true;
	}else if(browserName ==='Safari' && browserVersion >=9){
		return true;
	}else if(browserName ==='Firefox' && browserVersion >= 48){
		return true;
	}
	renderDownloadBrowserPage(osAndBrowserInfo)
    return false;
} 

let getOsAndBrowserInfo = () => {
	let osName = "unknownOS";
	let bit = 'unknownBit'
	if (navigator.appVersion.indexOf("Win") != -1) {
		osName = "windows";
		if(navigator.userAgent.indexOf("WOW64")>-1){ 
			bit = 64; 
		}else{ 
			bit = 32; 
		} 
	} else if (navigator.appVersion.indexOf("Mac") != -1) {
		osName = "macOS";
	} else if (navigator.appVersion.indexOf("X11") != -1) {
		osName = "unix";
	} else if (navigator.appVersion.indexOf("Linux") != -1) {
		osName = "linux";
	}

	let userAgent = navigator.userAgent, 
		tem, 
		userAgentMatch = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)|| [];
	if (/trident/i.test(userAgentMatch[1])) {
		tem = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
		return {
			os : osName,
			bit: bit,
			browser:{
				name : 'IE',
				version : (tem[1] || '')
			}
		};
	}
	if (userAgentMatch[1] === 'Chrome') {
		tem = userAgent.match(/\bOPR\/(\d+)/)
		if (tem != null) {
			return {
				os : osName,
				bit: bit,
				browser:{
					name : 'Opera',
					version : tem[1]
				}
			};
		}
	}
	userAgentMatch = userAgentMatch[2] ? [ userAgentMatch[1], userAgentMatch[2] ] : [ navigator.appName, navigator.appVersion, '-?' ];
	if ((tem = userAgent.match(/version\/(\d+)/i)) != null) {
		userAgentMatch.splice(1, 1, tem[1]);
	}

	return {
		os : osName,
		bit: bit,
		browser : {
			name : userAgentMatch[0],
			version : userAgentMatch[1]
		}
	};
}

export let renderDownloadBrowserPage = (osAndBrowserInfo) =>{
  
}

