// ==UserScript==
// @name 	BetterMagister2
// @namespace 	betterSgaMagisterNet2
// @description Verbeter de normale Magister 6
// @include 	https://sga.magister.net/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require https://rawgit.com/apeklets/BetterMagister/gh-pages/build/js/cssinfo.js
// @author 	Wouter Damen
// @version 	v1.10build1
// @grant 	GM_addStyle
// @grant	GM_setValue
// @grant	GM_getValue
// ==/UserScript==
var bmVersion = "v1.10";
var metroVersion = cssinfo.metroVersion;
var darkmodeVersion = cssinfo.darkmodeVersion;
var zesjesVersion = 'dev0.3';

var settingsSetup = function() {
	//Setup widget CSS
	GM_addStyle(' .settings-Setup-widget { height: 100%; width: 100%; background-color: rgba(0, 0, 0, 0.67); position: absolute; z-index: 999999; }')
	GM_addStyle(' .settings-Setup-widget .block { width: 500px; margin: auto; background-color: #FFF; margin-top: 100px; border: 1px solid #111; }')
	GM_addStyle(' .settings-Setup-widget fieldset { color: #FFF; font-size: 15px; }')
	GM_addStyle(' .settings-Setup-form label { font-size: 1rem; font-weight: unset; padding-bottom: 0px !important; padding-left: 0px !important; }')
	GM_addStyle(' .settings-Setup-form select { font-size: 0.8rem !important; padding: 0.2rem; width: 140; margin-bottom: 5px; }')
	GM_addStyle(' .settings-Setup-widget button { margin-top: 0.1rem; margin-bottom: 10px; }')
	GM_addStyle(' #styleVersion { padding: 0 8px 8px 8px !important; }')
	GM_addStyle(' .settings-Setup-widget h3 { padding-top: 5px !important; font-weight: bold !important; }')
	GM_addStyle(' .settings-Setup-widget .content { height: auto !important; }')
	//Setup widget JS
	$('<div class="settings-Setup-widget"><div class="block"><h3>BetterMagister Settings</h3><div class="content"><form class="settings-Setup-form"><label for="stylesheet">Stylesheet</label><p id="styleVersion"></p><select name="stylesheet" id="stylesheet"><option value="metro">Metro UI</option><option value="darkmode">Dark Mode</option><option value="defaultmode">Default</option></select></form><button>Opslaan</button></div><footer class="endlink"><p>BetterMagister ' + bmVersion + '</p><a>sluiten</a></footer></div></div>').prependTo('body');
	$('<label for="settings-Agenda">Agenda weergave</label><p style="padding: 0 8px 8px 8px !important">Verandert de agendaweergave automatisch</p><select name="settings-Agenda" id="settings-Agenda"><option value="lijst">Afsprakenlijst</option><option value="dag">Dagoverzicht</option><option value="week">Weekoverzicht</option><option value="werkweek">Werkweekoverzicht</option></select>').appendTo('.settings-Setup-form');
	if(GM_getValue('settings-darkMode', false)) { //Opgeslagen waardes laden
		$('.settings-Setup-form select#stylesheet').val('darkmode');
		$('#styleVersion').text('Huidige Stylesheet: ' + darkmodeVersion);
	} else if(GM_getValue('settings-MetroUI', false)) {
		$('.settings-Setup-form select#stylesheet').val('metro');
		$('#styleVersion').text('Huidige Stylesheet: ' + metroVersion);
	} else {
		$('.settings-Setup-form select').val('defaultmode');
	};
	$('.settings-Setup-form select#settings-Agenda').val(GM_getValue('settings-Agenda', 'lijst'));
	$('.settings-Setup-widget button').click(function() { //Opslaan
		//Stylesheet
		if($('.settings-Setup-form select#stylesheet').val() == 'metro') {
			GM_setValue('settings-darkMode', false);
			GM_setValue('settings-MetroUI', true);
		} else if ($('.settings-Setup-form select#stylesheet').val() == 'darkmode') {
			GM_setValue('settings-darkMode', true);
			GM_setValue('settings-MetroUI', false);
		} else if ($('.settings-Setup-form select#stylesheet').val() == 'defaultmode') {
			GM_setValue('settings-darkMode', false);
			GM_setValue('settings-MetroUI', false);
		};
		//Agendaweergave
		GM_setValue('settings-Agenda', $('.settings-Setup-form select#settings-Agenda').val());
		
		GM_setValue('settings-Setup', false);
		$('.settings-Setup-widget').remove();
	});
	$('.settings-Setup-widget a').click(function() {
		$('.settings-Setup-widget').remove();
	});
};

var zesjescultuurCalc = function() {
	//Widget
	var zesjescultuurWidget = $('<div id="zesjescultuur"><div class="block"><h3>Cijfers berekenen</h3><div class="content"><p>Test</p></div><footer class="endlink"><p>' + zesjesVersion + '</p><a>sluiten</a></footer></div></div>');
	$('#zesjescultuur .endlink a').click(function() {
		$('#zesjescultuur').remove();
		$('<footer class="endlink" id="zesjescultuurEndlink"><a id="zesjescultuurLink">Mutaties berekenen</a></footer>').appendTo('#cijferoverzichtgrid');
	});
	GM_addStyle('#zesjescultuur { width: 33%; margin: 5px; }')
	GM_addStyle('#cijferoverzichtgrid { background-color: #242424; }')
	zesjescultuurWidget.appendTo('#cijferoverzichtgrid');
};

var zesjescultuurLoad = function() {
	//Link CSS
	GM_addStyle(' #zesjescultuurLink { float: left !important; }');
	GM_addStyle(' #zesjescultuurLinkx { float: left !important; }');
	//Loading
	var lazyLoad = setInterval(function() {
		if (!$('#cijferoverzichtgrid').length) {
			return;
		} else {
			clearInterval(lazyLoad)
			$('<footer class="endlink" id="zesjescultuurEndlink"><a id="zesjescultuurLink">Mutaties berekenen</a></footer>').appendTo('#cijferoverzichtgrid');
			$('#zesjescultuurLink').click(function() {
				$('#zesjescultuurLinkx').remove();
				zesjescultuurCalc();
				$('#zesjescultuurLink').remove();
				$('<a id="zesjescultuurLinkx">Mutaties berekenen</a>').appendTo('#zesjescultuurEndlink');
			});
		};
	}, 2000);
};

var autoAgendaWeergave = function(x) {
	var lazyLoad = setInterval(function() {
		if(!$('#menuKnopAgenda').length) {
			return;
		} else {
			if(x == 'lijst') {
				$('#menuKnopAgenda').attr('href', '#/agenda?trk=main-menu');
			} else if(x == 'dag') {
				$('#menuKnopAgenda').attr('href', '#/agenda/dag');
			} else if(x == 'week') {
				$('#menuKnopAgenda').attr('href', '#/agenda/week');
			} else if(x == 'werkweek') {
				$('#menuKnopAgenda').attr('href', '#/agenda/werkweek');
			}
			clearInterval(lazyLoad);
		};
	}, 100);
};

var main = function() {
	GM_addStyle(' .settings-Settings { border-left: 1px solid #666; position: relative; cursor: pointer; }')
	GM_addStyle(' .settings-Settings:hover { background-color: #000 !important; }');
	GM_addStyle(' .account .settings-Settings { display: none !important; }')
	$('<div class="settings-Settings"><span class="icon-settings" style="color: red !important">::before</span></div>').appendTo('.header');
	if(GM_getValue('settings-darkMode', false)) {
		$('<link rel="stylesheet" href="https://rawgit.com/apeklets/BetterMagister/gh-pages/build/css/darkmode.min.css">').appendTo('head');
	};
	if(GM_getValue('settings-MetroUI', false)) {
		$('<link rel="stylesheet" href="https://rawgit.com/apeklets/BetterMagister/gh-pages/build/css/metro.min.css">').appendTo('head');
	};
	if($('body').attr('class') == 'account') {
		$('.version span').text($('.version span').attr('data-ng-bind-template') + ', BetterMagister v' + bmVersion);
	};
	$('.settings-Settings').click(function() {
		settingsSetup();
	});
	autoAgendaWeergave(GM_getValue('settings-Agenda', 'lijst'));
	/*if(window.location.href == 'https://sga.magister.net/magister/#/cijfers') {
		zesjescultuurLoad();
	}; 
	$('#menuKnopCijferoverzicht').click(function() {
		zesjescultuurLoad();
	}); Zesjescultuur, not complete*/
};

$(document).ready(main);