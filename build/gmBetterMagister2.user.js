// ==UserScript==
// @name 	BetterMagister2
// @namespace 	betterSgaMagisterNet2
// @description Verbeter de normale Magister 6
// @include 	https://sga.magister.net/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @require https://rawgit.com/apeklets/BetterMagister/gh-pages/build/js/info.js
// @require https://rawgit.com/lightswitch05/table-to-json/master/lib/jquery.tabletojson.min.js
// @author 	Wouter Damen
// @version 	v1.11build6
// @grant 	GM_addStyle
// @grant	GM_setValue
// @grant	GM_getValue
// ==/UserScript==
var bmVersion = "v1.11";
var metroVersion = BetterMagisterInfo.metroVersion;
var darkmodeVersion = BetterMagisterInfo.darkmodeVersion;
var zesjesVersion = 'v1.1';

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

var zesjescultuurCalc = function(vak, cijfers) {
	//Init widget
	var zesjescultuurWidget = $('<div id="zesjescultuurWidget"><div class="block"><h3>Mutaties</h3><div class="content"><p id="vak"></p><p id="tot"></p><p id="weg"></p><p id="gem"></p></div><footer class="endlink"><a>Sluiten</a></footer></div></div>')
	GM_addStyle('#zesjescultuurWidget { height: 100%; width: 100%; background-color: rgba(0, 0, 0, 0.67); position: absolute; z-index: 999999;  } ')
	GM_addStyle('#zesjescultuurWidget .block { width: 500px; margin: auto; background-color: #FFF; margin-top: 100px; border: 1px solid #111; }')	
	GM_addStyle('#zesjescultuurWidget .block h3 { padding-top: 5px !important; }')
	GM_addStyle('#vak::before { content: "Vak: "; } #tot::before { content: "Som Cijfers: "; } #weg::before { content: "Som Weging: "; } #gem::before { content: "Gemiddelde: "; }');
	GM_addStyle('#zesjescultuurWidget .content { height: auto !important; }')
	zesjescultuurWidget.prependTo('body');
	$('#vak').text(vak)
	//Parsing, Calculations
	jQuery.each(cijfers, function(i, e) {
		e.Cijfer = Number(e.Cijfer.split(',')[0]) + (Number(e.Cijfer.split(',')[1])) / 10
		e.Weging = Number(e.Weging);
	});
	var tot = 0;
	var weg = 0;
	jQuery.each(cijfers, function(i, e) {
		tot += e.Cijfer * e.Weging;
		weg += e.Weging;
	});
	var gem = tot / weg;
	//Printing calculations
	$('#tot').text(tot)
	$('#weg').text(weg)
	$('#gem').text(gem)
	$('#zesjescultuurWidget .endlink a').click(function() {
		zesjescultuurWidget.remove()
	})
	//Form
	GM_addStyle('#nieuwCijfer { width: 90%; margin: auto; } ')
	GM_addStyle('#nieuwCijfer p { width: 8%; float: left; padding: 4px 0 0 0; }')
	GM_addStyle('#nieuwCijfer input::-moz-placeholder { color: #000; }')
	GM_addStyle('#weging { margin-bottom: 2px; } #gemiddelde { width: 46%; float: left; } #cijfer { width: 46%; float: right; }')
	$('<div id="nieuwCijfer"><form><input id="weging" type="text" placeholder="Weging (bv. 4)"><input id="gemiddelde" type="text" placeholder="Doel gemiddelde (bv. 7.5)"><p>of</p><input id="cijfer" type="text" placeholder="Cijfer (bv. 8.9)"></form></div>').appendTo('#zesjescultuurWidget .content')
	GM_addStyle('#bereken { margin: 4px 4px 4px 4px; }')
	$('<button id="bereken">Bereken</button>').appendTo('#zesjescultuurWidget .content');
	$('#gemiddelde').change(function() {$('#cijfer').val('')})
	$('#cijfer').change(function() {$('#gemiddelde').val('')})
	//Reading form
	$('#bereken').click(function() {
		if($('#weging').val() == '' || ($('#gemiddelde').val() == '' && $('#cijfer').val() == '' )) {
			return;
		} else {
			if(Number($('#weging').val()).toString() == 'NaN') {
				$('<p style="color: red">Error: "Weging" is geen nummer (hint: Gebruik voor een comma een .; "4.1" ipv "4,1")</p>').appendTo('#zesjescultuurWidget .content');
			} else if($('#gemiddelde').val() != '' && Number($('#gemiddelde').val()).toString() == 'NaN') {
				$('<p style="color: red">Error: "Gemiddelde" is geen nummer (hint: Gebruik voor een comma een .; "4.1" ipv "4,1")</p>').appendTo('#zesjescultuurWidget .content');
			} else if($('#cijfer').val() != '' && Number($('#cijfer').val()).toString() == 'NaN') {
				$('<p style="color: red">Error: "Cijfer" is geen nummer (hint: Gebruik voor een comma een .; "4.1" ipv "4,1")</p>').appendTo('#zesjescultuurWidget .content');
			} else {
				if($('#gemiddelde').val() != '') {
					var newGem = Number($('#gemiddelde').val());
					var newWeg = Number($('#weging').val());
					var newCijfer = ((newGem * (weg + newWeg)) - tot) / newWeg;
					$('<p>Cijfer dat je moet halen om ' + newGem + ' te staan: ' + newCijfer + '</p>').appendTo('#zesjescultuurWidget .content');
				} else if($('#cijfer').val() != '') {
					var newCijfer = Number($('#cijfer').val());
					var newWeg = Number($('#weging').val());
					var newGem = (tot + (newCijfer * newWeg)) / (weg + newWeg);
					$('<p>Nieuw gemiddelde: ' + newGem + '</p>').appendTo('#zesjescultuurWidget .content');
				}
			}
		}
	});
};

var zesjescultuur = function() {
	//Loading
	var lazyLoad = setInterval(function() {
		if (!$('#cijferoverzichtgrid').length) {
			return;
		} else {
			clearInterval(lazyLoad)
			var wait = setTimeout(function() {
				$('.k-selectable tr > td:nth-child(8)').bind('click', function() {
					$('<footer class="endlink"><a id="zesjescultuurLink">Mutaties berekenen</a></footer>').appendTo('#idBerekening .block'); 
					$('.k-selectable tr > td:nth-child(8)').unbind();
					var vakUID = $('td.k-state-selected').parent().attr('data-uid')
					var vakNaam = $('tr[data-uid=' + '"' + vakUID + '"] > td:nth-child(2) > span:nth-child(1)').text()
					$('#idBerekening footer a').click(function() {
						zesjescultuurCalc(vakNaam, $('.cijfer-berekend').tableToJSON())
					});
				});
			}, 1000);
		};
	}, 1000);
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
	if(window.location.hash == '#/cijfers') {
		zesjescultuur();
	} else {
		window.addEventListener("hashchange", function() {
			if(window.location.hash == '#/cijfers') {
				zesjescultuur();
			}
		}, false)
	};
};

$(document).ready(main);