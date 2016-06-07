var bmVersion = "v1.9.1";
var metroVersion = "Metro v1.4";
var darkmodeVersion = "Dark Mode v1.6.5";
var zesjesVersion = 'dev0.3';

var MetroUI = function() {
	$('<link rel="stylesheet" href="https://raw.githubusercontent.com/apeklets/BetterMagister/gh-pages/build/css/metro.min.css">').appendTo('head');
};

var darkMode = function() {
	$('<link rel="stylesheet" href="https://raw.githubusercontent.com/apeklets/BetterMagister/gh-pages/build/css/darkmode.min.css">').appendTo('head');
};

var settingsSetup = function(settings) {
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
	
main = function(settings) {
	//Load Settings
	var settings-Stylesheet = settings.Stylesheet;
	var settings-Agenda = settings.Agenda;
	//Settings-setup button
	$('<link rel="stylesheet" href="https://raw.githubusercontent.com/apeklets/BetterMagister/gh-pages/build/css/settings-Setup.css">').appendTo('head');
	$('<div class="settings-Settings"><span class="icon-settings" style="color: red !important">::before</span></div>').appendTo('.header');
	//Stylesheet
	if(settings-Stylesheet == 'metro') {
		MetroUI();
	};
	if(settings-Stylesheet == 'darkmode') {
		darkMode();
	};
};

$(document).ready(main(BetterMagister.getSettings()));