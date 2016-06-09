// ==UserScript==
// @name 	BetterMagister
// @namespace 	betterSgaMagisterNet2.0
// @description Verbeter de normale Magister 6
// @include 	https://sga.magister.net/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @author 	Wouter Damen
// @version 	v2.0
// @grant	GM_setValue
// @grant	GM_getValue
// ==/UserScript==
var getSettings = function() {
	return '{Stylesheet: ' + GM_getValue('settings-Stylesheet', 'defaultmode') + ', Agenda: ' + GM_getValue('settings-Agenda', 'lijst') + '}';
};

var main = function() {
	$('<script type="text/javascript" src="https://rawgit.com/apeklets/BetterMagister/gh-pages/build/js/init.js"></script>').appendTo('head');
	$('<script type="text/javascript">BetterMagister.init(' + getSettings() + ')</script>').appendTo('head');
	$('<script type="text/javascript" src="https://rawgit.com/apeklets/BetterMagister/gh-pages/build/js/main.js"></script>').appendTo('head');
};

$(document).ready(main);