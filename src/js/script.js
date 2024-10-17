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

const opSy = select(".opSy");
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

function getOpSy() {
    switch (true) {
        case userAgent.includes("Windows"):
            opSy.innerText = "Windows";
            break;
        case userAgent.includes("Macintosh"):
            opSy.innerText = "Mac OS";
            break;
        case userAgent.includes("iPhone"):
        case userAgent.includes("iPad"):
        case userAgent.includes("iPod"):
            opSy.innerText = "iOS";
            break;
        case userAgent.includes("Android"):
            opSy.innerText = "Android";
            break;
        case userAgent.includes("Linux"):
            opSy.innerText = "Linux";
            break;
        default:
            opSy.innerText = "Your Operating System isn't recognized.";
            break;
    }
}

function getBrowser() {
    switch (true) {
        case userAgent.includes("Chrome") && !userAgent.includes("Chromium"):
            browser.innerText = "Chrome";
            break;
        case userAgent.includes("Firefox"):
            browser.innerText = "Firefox"; // Fixed typo here
            break;
        case userAgent.includes("Edge") || userAgent.includes("edg"):
            browser.innerText = "Edge";
            break;
        case userAgent.includes("Opera") || userAgent.includes("OPR"):
            browser.innerText = "Opera";
            break;
        case userAgent.includes("Safari") && !userAgent.includes("Chrome"):
            browser.innerText = "Safari";
            break;    
        default:
            browser.innerText = "Your browser isn't recognized.";
            break;
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
    getOpSy();
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