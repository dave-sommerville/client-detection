'use strict';

/*------------------------------------>
    Utility Functions 
<-----------------------------------*/

function select(selector, scope = document) {
    return scope.querySelector(selector);
}

function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

/*------------------------------------>
    DOM Selection 
<-----------------------------------*/

const operatingSystem = select(".opSy");
const browser = select(".browse");
const language = select(".lang");
const width = select(".width");
const height = select(".height");
const orient = select('.orient');
const level = select('.level');
const bStatus = select(".status");

/*------------------------------------>
    Variable Declarations
<-----------------------------------*/

const userAgent = navigator.userAgent;
let userLang = navigator.language;
let pageWidth = window.innerWidth;
let pageHeight = window.innerHeight;

/*------------------------------------>
    Search / Display Switch Cases
<-----------------------------------*/

function getOperatingSystem() {
	if (userAgent.includes("Windows")) {
		operatingSystem.innerText = "Windows";
	} else if (userAgent.includes("Macintosh")) {
		operatingSystem.innerText = "Mac OS";
	} else if (userAgent.includes("iPhone") || userAgent.includes("iPad") || userAgent.includes("iPod")) {
		operatingSystem.innerText = "iOS";
	} else if (userAgent.includes("Android")) {
		operatingSystem.innerText = "Android";
	} else if (userAgent.includes("Linux")) {
		operatingSystem.innerText = "Linux";
	} else {
		operatingSystem.innerText = "Your Operating System isn't recognized.";
	}
}

function getBrowser() {
	if (userAgent.includes("Firefox")) {
			browser.innerText = "Firefox";
	} else if (userAgent.includes("Edge") || userAgent.includes("edg")) {
			browser.innerText = "Edge";
	} else if (userAgent.includes("Chrome") && !userAgent.includes("Chromium")) {
			browser.innerText = "Chrome";
	} else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
			browser.innerText = "Opera";
	} else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
			browser.innerText = "Safari";
	} else {
			browser.innerText = "Your browser isn't recognized.";
	}
}

/*------------------------------------>
    Search / Display Functions
<-----------------------------------*/

function getLanguage() {
    language.innerText = `${userLang}`;
}

function getWidth() {
    width.innerText = `${pageWidth}`;
}

function getHeight() {
    height.innerText = `${pageHeight}`;
}

function getOrientation() {
    if (pageWidth > pageHeight) {
        orient.innerText = "Landscape";
    } else {
        orient.innerText = "Portrait";
    }
}

/*------------------------------------>
    Battery API Conditions 
<-----------------------------------*/
// I wanted to have the battery conditions included in a listener function
// like the other conditions, but I couldn't get the function to operate 
// properply. Using an if statement, with the listeners inside, will update 
// the battery info upon loading the script and then upon any change to the
// battery status or level 

if ('getBattery' in navigator) {
    navigator.getBattery().then(function(battery) {

        const getLevel = () => {
            const batteryLevel = (battery.level * 100).toFixed(0) + '%';
            level.innerText = `${batteryLevel}`;
        };

        const getStatus = () => {
            const chargingStatus = battery.charging ? 'Charging' : 'Not Charging';
            bStatus.innerText = `${chargingStatus}`;
        };

        getLevel();
        getStatus();

        listen('levelchange', battery, getLevel);
        listen('chargingchange', battery, getStatus); 
    });
} else {
    level.innerText = 'Battery information not available on this browser.';
    bStatus.innerText = 'Battery information not available on this browser..';
}

/*------------------------------------>
    Listener functions
<-----------------------------------*/

function load() {
    getOperatingSystem();
    getBrowser(); 
    getLanguage(); 
    getWidth();
    getHeight();
    getOrientation(); 
}

function resize() {
    pageWidth = window.innerWidth;
    pageHeight = window.innerHeight;
    
    getWidth();
    getHeight();
    getOrientation(); 
}

listen('load', window, () => { load()});

listen('resize', window, () => { resize()});