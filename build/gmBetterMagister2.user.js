// ==UserScript==
// @name 	BetterMagister2
// @namespace 	betterSgaMagisterNet2
// @description Verbeter de normale Magister 6
// @include 	https://*.magister.net/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @require https://rawgit.com/lightswitch05/table-to-json/master/lib/jquery.tabletojson.min.js
// @author 	Wouter Damen
// @version 	v1.13
// @grant 	GM_addStyle
// @grant	GM_setValue
// @grant	GM_getValue
// ==/UserScript==
var bmVersion = "v1.13";
var metroVersion = "v1.5.5";
var darkmodeVersion = "v1.7.3";
var zesjesVersion = 'v1.1';

var settingsSetup = function() {
	//Setup widget CSS
	GM_addStyle(' .settings-Setup-widget { height: 100%; width: 100%; background-color: rgba(0, 0, 0, 0.67); position: absolute; z-index: 999999; }')
	GM_addStyle(' .settings-Setup-widget .block { width: 500px; margin: auto; background-color: #FFF; margin-top: 100px; border: 1px solid #111; }')
	GM_addStyle(' .settings-Setup-widget .endlink { text-transform: none; }')
	GM_addStyle(' .settings-Setup-widget .endlink p { float: left; padding-left: 5px; }')
	GM_addStyle(' .settings-Setup-widget fieldset { color: #FFF; font-size: 15px; }')
	GM_addStyle(' .settings-Setup-form label { font-size: 1rem; font-weight: unset; padding-bottom: 0px !important; padding-left: 0px !important; }')
	GM_addStyle(' .settings-Setup-form select { font-size: 0.8rem !important; padding: 0.2rem; width: 140; margin-bottom: 5px; }')
	GM_addStyle(' .settings-Setup-widget button { margin-top: 0.1rem; margin-bottom: 10px; }')
	GM_addStyle(' #styleVersion { padding: 0 8px 8px 8px !important; }')
	GM_addStyle(' .settings-Setup-widget h3 { padding-top: 5px !important; font-weight: bold !important; }')
	GM_addStyle(' .settings-Setup-widget .content { height: auto !important; }')
	GM_addStyle(' .settings-Setup-form .checkbox-input label { font-size: 0.8rem; padding-left: 10px !important; }')
	GM_addStyle(' .settings-Setup-form h5 { color: #FFF; font-size: 1rem; }')
	GM_addStyle(' .settings-Setup-form .checkbox-input input[type="checkbox"]:checked + label span::after { position: relative !important; }')
	//Setup widget JS
	$('<div class="settings-Setup-widget"><div class="block"><h3>BetterMagister Settings</h3><div class="content"><form class="settings-Setup-form"><label for="stylesheet">Stylesheet</label><p id="styleVersion"></p><select name="stylesheet" id="stylesheet"><option value="metro">Metro UI</option><option value="darkmode">Dark Mode</option><option value="defaultmode">Default</option></select></form><button>Opslaan</button></div><footer class="endlink"><p>BetterMagister ' + bmVersion + '</p><a>sluiten</a></footer></div></div>').prependTo('body');
	$('<label for="settings-Agenda">Agenda weergave</label><p style="padding: 0 8px 8px 8px !important">Verandert de agendaweergave automatisch</p><select name="settings-Agenda" id="settings-Agenda"><option value="lijst">Afsprakenlijst</option><option value="dag">Dagoverzicht</option><option value="week">Weekoverzicht</option><option value="werkweek">Werkweekoverzicht</option></select>').appendTo('.settings-Setup-form');
	$('<label for="settings-Cijfers">Cijfer weergave</label><p style="padding: 0 8px 8px 8px !important">Wisselt automatisch tussen actieve cijferperiode of alle cijferperiodes.</p><select name="settings-Cijfers" id="settings-Cijfers"><option value="huidig">Huidige cijferperiode</option><option value="alle">Alle cijferperiodes</option></select>').appendTo('.settings-Setup-form')
	$('<h5>Inloggen</h5><p style="padding: 0 8px 8px 8px !important">Alle wachtwoorden worden locaal en versleuteld opgeslagen.</p><div class="checkbox-input" id="login"><input class="ng-pristine ng-untouched ng-valid" name="rememberpw" data-ng-model="rememberUsername" id="rememberpw" tabindex="3" type="checkbox"><label for="rememberpw"><span></span>Wachtwoord onthouden</label><input class="ng-pristine ng-untouched ng-valid" name="autologin" data-ng-model="rememberUsername" id="autologin" tabindex="3" type="checkbox"><label for="autologin"><span></span>Automatisch Inloggen</label></div>').appendTo('.settings-Setup-form');
	$('.settings-Setup-form select#stylesheet').val(GM_getValue('settings-Stylesheet', 'defaultmode'));
	$('.settings-Setup-form select#settings-Agenda').val(GM_getValue('settings-Agenda', 'lijst'));
	$('.settings-Setup-form select#settings-Cijfers').val(GM_getValue('settings-Cijfers', 'huidig'))
	$('#login > label:nth-child(2) > span:nth-child(1)').click(function() {
		$('#rememberpw').toggleClass('checked')
	});
	$('#login > label:nth-child(4) > span:nth-child(1)').click(function() {
		$('#autologin').toggleClass('checked')
	});
	if(GM_getValue('settings-Savepw', false)) {
		$('#login > label:nth-child(2) > span:nth-child(1)').click()
	}
	if(GM_getValue('settings-autoLogin', false)) {
		$('#login > label:nth-child(4) > span:nth-child(1)').click()
	}
	
	$('.settings-Setup-widget button').click(function() { //Opslaan
		//Stylesheet
		GM_setValue('settings-Stylesheet', $('.settings-Setup-form select#stylesheet').val());
		//Agendaweergave
		GM_setValue('settings-Agenda', $('.settings-Setup-form select#settings-Agenda').val());
		//Cijferweergave
		GM_setValue('settings-Cijfers', $('.settings-Setup-form select#settings-Cijfers').val())
		//Inloggen
		if($('#rememberpw').hasClass('checked')) {
			GM_setValue('settings-Savepw', true);
		} else {
			GM_setValue('settings-Savepw', false);
		};
		if($('#autologin').hasClass('checked')) {
			GM_setValue('settings-autoLogin', true);
			GM_setValue('settings-Savepw', true);
		} else {
			GM_setValue('settings-autoLogin', false);
		};
		GM_setValue('settings-Setup', false);
		$('.settings-Setup-widget').remove();
		var h = window.location.hash.split('?')[0]
		if(h == "#/agenda" || h == "#/agenda/week" || h == "#/agenda/werkweek" || h == "#/agenda/dag") {
			var x = GM_getValue('settings-Agenda', 'lijst')
			if(x == 'lijst') {
				window.location.hash = "#/agenda"
			} else if(x == 'dag') {
				window.location.hash = "#/agenda/dag"
			} else if(x == 'week') {
				window.location.hash = "#/agenda/week"
			} else if(x == 'werkweek') {
				window.location.hash = "#/agenda/werkweek"
			}
		} else {
			window.location.reload();
		}
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
	$('#tot').text(tot.toPrecision(4))
	$('#weg').text(weg)
	$('#gem').text(gem.toPrecision(3))
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
	$('<p id="error" style="color: red"></p>').appendTo('#zesjescultuurWidget .content')
	$('#gemiddelde').change(function() {$('#cijfer').val('')})
	$('#cijfer').change(function() {$('#gemiddelde').val('')})
	//Reading form
	$('#bereken').click(function() {
		if($('#weging').val() == '' || ($('#gemiddelde').val() == '' && $('#cijfer').val() == '' )) {
			return;
		} else {
			if(Number($('#weging').val()).toString() == 'NaN') {
				$('#error').text('Error: "Cijfer" is geen nummer (hint: Gebruik voor een komma een .; "4.1" ipv "4,1")')
			} else if($('#gemiddelde').val() != '' && Number($('#gemiddelde').val()).toString() == 'NaN') {
				$('#error').text('Error: "Cijfer" is geen nummer (hint: Gebruik voor een komma een .; "4.1" ipv "4,1")')
			} else if($('#cijfer').val() != '' && Number($('#cijfer').val()).toString() == 'NaN') {
				$('#error').text('Error: "Cijfer" is geen nummer (hint: Gebruik voor een komma een .; "4.1" ipv "4,1")')
			} else {
				$('#error').text('')
				if($('#gemiddelde').val() != '') {
					var newGem = Number($('#gemiddelde').val());
					var newWeg = Number($('#weging').val());
					var newCijfer = (((newGem * (weg + newWeg)) - tot) / newWeg);
					$('<p>Cijfer dat je moet halen om ' + newGem + ' te staan: ' + newCijfer.toPrecision(2) + '</p>').appendTo('#zesjescultuurWidget .content');
				} else if($('#cijfer').val() != '') {
					var newCijfer = Number($('#cijfer').val());
					var newWeg = Number($('#weging').val());
					var newGem = ((tot + (newCijfer * newWeg)) / (weg + newWeg));
					$('<p>Nieuw gemiddelde: ' + newGem.toPrecision(3) + '</p>').appendTo('#zesjescultuurWidget .content');
				}
			}
		}
	});
};

var cijfergrafieken = function() {
	//Gemiddelde
		$('.grade-gemiddelde').hide()
		var GRindex = 0;
		$('.gradeHeader').each(function(i) {
			if($(this).text().split('G-R').length > 1) {
				GRindex = i
			}
		});
		var gemiddeldeTot = 0
		var gemiddeldeLength = $('.k-selectable > tbody:nth-child(2) > tr > td:nth-child(' + (GRindex + 3).toString() + ') > span:nth-child(1)').length
		$('.k-selectable > tbody:nth-child(2) > tr > td:nth-child(' + (GRindex + 3).toString() + ') > span:nth-child(1)').each(function(i) {
			var e = $(this).text();
			if(e == "\xA0") {
				gemiddeldeLength -= 1;
				return;
			} else {
				gemiddeldeTot += Number(e.split(',')[0]) + (Number(e.split(',')[1])) / 100;
			}
		});
		var gemiddelde = gemiddeldeTot / gemiddeldeLength;
		gemiddeldePrec = gemiddelde.toPrecision(3)
		$('.grade-gemiddelde .cijfer.gemiddelde').text(gemiddeldePrec.toString())
	//Voldoendepercentage
		var voldoendes = 0
		var onvoldoendes = 0
		$('.grade').each(function(i) {
			if($(this).hasClass('gemiddeldecolumn')) {
				return;
			} else if($(this).hasClass('insufficient')) {
				onvoldoendes++
				return;
			} else if(!$(this).hasClass('empty')) {
				voldoendes++
				return;
			}
		})
		var voldoendePercentage = ((voldoendes / (voldoendes + onvoldoendes)) * 100).toPrecision(3);
		$('.grade-gemiddelde .cijfer.percentage').text(voldoendePercentage)
		var periodes = $('#periodeSelect').val()
		jQuery.each(periodes, function(i, e) {
			periodes[i] = " P" + periodes[i]
		});
		$('.grade-gemiddelde .subtitle').text("in" + periodes.toString())
	//Compensatiepunten
		var teCompenseren = 0
		var compensatie = 0
		$('.k-selectable > tbody:nth-child(2) > tr > td:nth-child(' + (GRindex + 4).toString() + ') > span:nth-child(1)').each(function(i) {
			var e = $(this).text();
			if(e == "\xA0") {
				return;
			} else {
				var eN = Number(e)
				if(eN > 6) {
					compensatie += (eN - 6)
				} else if(eN < 6) {
					teCompenseren += (6 - eN)
				}
			}
		})
		if(compensatie > teCompenseren) {
			teCompenseren = 0;
		} else if(teCompenseren > compensatie) {
			teCompenseren -= compensatie;
			$('.cijfer.compensatie').addClass('insufficient')
		}
		$('.grade-gemiddelde .cijfer.compensatie').text(teCompenseren.toString())
	$('.grade-gemiddelde').show(400)
}

var zesjescultuur = function() {
	//Loading
	var lazyLoad = setInterval(function() {
		if (!$('#cijferoverzichtgrid').length) {
			return;
		} else {
			clearInterval(lazyLoad);
			if(GM_getValue('settings-Cijfers', 'huidig') == 'alle') {
				var wait = setTimeout(function() {
					$('#periodeSelect_taglist .k-button:last-child span:last-child').click();
				}, 1000)
			}
			var wait = setTimeout(function() {
				if(!$('.k-selectable tbody').children().length) {
					$('<div id="bmGeenCijfers" class="loading-overlay ng-isolate-scope"><div class="icon-no-data"><p class="no-items">Geen gegevens in de huidige selectie.</p></div></div>').prependTo('.content-container-cijfers');
					var d = setInterval(function() {
						if(!(!$('.k-selectable tbody').children().length)) {
							$('#bmGeenCijfers').hide();
							clearInterval(d)
						} else {
							$('#bmGeenCijfers').show();
							clearInterval(d)
						}
					}, 1000)
				}
				$('.gemiddeldecolumn').bind('click', function() {
					$('<footer class="endlink"><a id="zesjescultuurLink">Mutaties berekenen</a></footer>').appendTo('#idBerekening .block'); 
					$('.gemiddeldecolumn').unbind();
					$('#idBerekening footer a').click(function() {
						var vakUID = $('td.k-state-selected').parent().attr('data-uid');
						var vakNaam = $('tr[data-uid=' + '"' + vakUID + '"] > td:nth-child(2) > span:nth-child(1)').text();
						zesjescultuurCalc(vakNaam, $('.cijfer-berekend').tableToJSON());
					});
				});
				$('<div class="grade-gemiddelde"><span class="cijfer gemiddelde"></span><span class="omschrijving">Gemiddelde</span></div>').appendTo('.content-container-cijfers');
				$('<div class="grade-gemiddelde"><span class="cijfer percentage"></span><span class="omschrijving">Voldoendes</span><span class="subtitle"></span></div>').appendTo('.content-container-cijfers');
				$('<div class="grade-gemiddelde"><span class="cijfer compensatie"></span><span class="omschrijving">Te Compenseren</span></div>').appendTo('.content-container-cijfers');
				cijfergrafieken();
				$('.k-multiselect .k-button span:last-child, #aanmeldingenSelect_listbox .k-item').click(function() {
					wait = setTimeout(function() {
						cijfergrafieken();
					}, 2000);
				})
			}, 2000);
		}
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

var updateAlert = function() {
	var updateNotification = $('<div id="updateMsg" class="toast ng-scope info-toast info-msg" style="z-index: 999999;" data-ng-repeat="toast in activeToasts"><span class="glyph" id="updateGlyph"><a href="#"></a></span><span class="ng-binding" data-ng-bind="toast.toast.title">UPDATE!</span><em class="ng-binding" data-ng-bind-html="toast.toast.trustedMessage">Update voor BetterMagister beschikbaar!</em><a href="https://github.com/apeklets/BetterMagister/raw/gh-pages/build/gmBetterMagister2.user.js">Install</a> <a href="">Changelog</a> <a>Sluiten</a><i></i></div>')
	updateNotification.appendTo('.toasts');
	$('#updateMsg a').click(function() {
		$('#updateMsg').remove();
	})
};

var updateCheck = function() {
	$('<script type="text/javascript" src="https://rawgit.com/apeklets/BetterMagister/gh-pages/build/js/updateChecker.js"></script>').appendTo('head');
	var updateLoad = setInterval(function() {
		if(!$('.toasts').length) {
			return;
		} else {
			clearInterval(updateLoad);
			$('<script id="updateCheck" type="text/javascript">var bmVersion = "' + bmVersion + '"; if(bmVersion != BetterMagisterInfo.bmVersion) {updateAlert();}</script>').appendTo('head');
		};
	}, 1000);
};

var savePassword = function() {
	var lazyLoad = setInterval(function() {
		if(!$('.text-input #password').length) {
			return;
		} else {
			GM_addStyle('#checkbox-rememberpw { margin-top: 35px; }') //Adding in checkbox
			GM_addStyle('.account .checkbox-input { height: 0px !important; }')
			$('<div class="checkbox-input" id="checkbox-rememberpw"><input class="ng-pristine ng-untouched ng-valid" name="rememberpw" data-ng-model="rememberUsername" id="rememberpw" tabindex="3" type="checkbox"><label for="rememberpw"><span></span>Wachtwoord onthouden</label></div>').appendTo('.content fieldset');
			if(GM_getValue('saved-Password', false) !== false && (GM_getValue('settings-Savepw', false) || GM_getValue('settings-autoLogin', false))) { //Loading saved password, if any
				$('#password').val(GM_getValue('saved-Password', ""));
				 //Trigger change event directly from DOM.
				if(GM_getValue('settings-autoLogin', false)) {
					$('<script type="text/javascript">$(\'#password\').change(); $(\'.btn-primary3\').click()</script>').appendTo('head');
				} else {
					$('<script type="text/javascript">$(\'#password\').change()</script>').appendTo('head');
				};
			};
			if(GM_getValue('settings-Savepw', false) || GM_getValue('settings-autoLogin', false)) {
				$('#checkbox-rememberpw input[type="checkbox"]').attr('checked', 'checked');
			};
			$('.btn-primary3').click(function() { //Saving new password
				if($('#checkbox-rememberpw input[type="checkbox"]:checked').length == 1) {
					GM_setValue('saved-Password', $('.text-input #password').val());
					GM_setValue('settings-Savepw', true);
				} else {
					GM_setValue('settings-Savepw', false);
				}
			});
			clearInterval(lazyLoad)
		}
	}, 100);
};

var setupTour = function() {
	var lazyLoad = setInterval(function() {
		if(!$('.content-container').length) {
			return;
		} else {
			clearInterval(lazyLoad)
			//Setup Tour CSS
			GM_addStyle('.setup-Tour-widget { height: 100%; width: 100%; background-color: rgba(0, 0, 0, 0.67); position: absolute; z-index: 999999; }')
			GM_addStyle('.setup-Tour-widget .block { width: 67%; height: auto; margin: auto; margin-top: 20px; overflow: hidden; }')
			GM_addStyle('.setup-Tour-widget .block h3 { text-align: left; font-size: 18px !important; }')
			GM_addStyle('.setup-Tour-widget .block .content { height: 600px; }')
			GM_addStyle('.setup-Tour-widget .block .endlink { text-transform: none; }')
			GM_addStyle('.setup-Tour-widget .block .endlink p {  }')
			GM_addStyle('.setup-Tour-widget .block .endlink #stap { width: 100px; display: inline-block; }')
			GM_addStyle('#welcome { padding-top: 250px;} #welcome h1 { opacity: 0; } #welcome p { opacity: 0; } #welcome .k-button { opacity: 0; margin: 2px; padding: 1px 11px 1px; } #welcome .k-button p { font-size: 18px; }')
			GM_addStyle(' .endlink .k-button { margin: 2px; padding: 4px 11px 4px; display: inline-block; background-color: #0096db; border: 1px solid #0076db; width: 80px; color: #F2F2F2; }')
			GM_addStyle('.setup-Tour-widget .content h1 { font-size: 3rem; font-weight: 600; }')
			GM_addStyle('.setup-Tour-widget .content p { font-size: 1rem; line-height: 1; }')
			GM_addStyle('.setup-Tour-widget .content .thumbnail { display: inline-block; padding: 4px; margin-left: 10px; margin-bottom: 20px; line-height: 1.42; background-color: #FFF; border: 1px solid #DDD; border-radius: 4px; }') //Credit to Bootstrap for the thumbnail CSS
			GM_addStyle('.setup-Tour-widget .content .thumbnail > img { margin-left: auto; margin-right: auto; display: block; height: auto; }')
			GM_addStyle('.setup-Tour-widget .content .thumbnail .caption { padding: 9px; color: #333; }')
			GM_addStyle('.setup-Tour-widget .content form { background-color: unset; }')
			GM_addStyle('.setup-Tour-widget .content form select { font-size: 14px; }')
			GM_addStyle('.setup-Page { opacity: 0 }')
			GM_addStyle('#page1 .thumbnail > img, #page3 .thumbnail > img, #page4 .thumbnail > img, #page5 .thumbnail > img { width: 500px; }')
			GM_addStyle('#page2 .thumbnail > img{ width: 350px; }')
			//Setup Tour JS
			$('<div class="setup-Tour-widget"><div class="block"><h3>BetterMagister Setup Tour</h3><div class="content"></div></div></div>').prependTo('body');
			$('<div id="welcome"><h1 id="1">BetterMagister</h1><p id="1">Verbeter Magister 6</p><h1 id="2">Welkom</h1><p id="2">Deze tour zal je de features van BetterMagister laten zien.</p><div class="k-button"><p>Start</p></div></div>').appendTo('.setup-Tour-widget .block .content');
			$('#welcome h1#1').animate({'opacity': 1}, {queue: false, duration: 500});
			$('#welcome').animate({'padding-top': '200px'}, {queue: false, duration: 1000});
			$('#welcome p#1').animate({'opacity': 1}, 500);
			var wait = setTimeout(function() {
				$('#welcome h1#1, #welcome p#1').animate({'opacity': 0}, {queue: false, duration: 400}).promise().then(function() {
					$('#welcome h1#1, #welcome p#1').remove()
					$('#welcome h1#2, #welcome p#2').animate({'opacity': 1}, 500);
					$('#welcome .k-button, #welcome .k-button p').animate({'opacity': 1}, 600);
					$('#welcome div.k-button').click(function() {
						$('#welcome').remove();
						$('<footer class="endlink"><div id="prev" class="k-button"><p>Vorige</p></div><div id="stap"><p>Stap 1/5</p></div><div id="next" class="k-button"><p>Volgende</p></div></footer>').appendTo('.setup-Tour-widget .block')
						var page1 = {
							end: function() {
								input.Stylesheet = $('#setup-Stylesheet').val()
								//GM_setValue('settings-Stylesheet', $('#setup-Stylesheet').val());
							},
							html: $('<div id="page1" class="setup-Page"><h1>Betere Layout</h1><p>Magister wordt veel overzichtelijker met een nieuwe look. BetterMagister biedt twee nieuwe stylesheets: \'Metro\', gebaseerd op Metro UI, de design filosofie van Windows 8 en 10, en \'Dark Mode\'. De twee stylesheets zijn erg vergelijkbaar maar de grijstinten zijn een beetje donkerder en meeste hoeken zijn niet afgerond bij Metro.</p><div class="thumbnail"><img src="https://rawgit.com/apeklets/BetterMagister/gh-pages/bin/img/darkmode-agenda.png"></img><div class="caption"><p>Agenda met de Darkmode stylesheet</p></div></div><div class="thumbnail"><img src="https://rawgit.com/apeklets/BetterMagister/gh-pages/bin/img/metro-agenda.png"></img><div class="caption"><p>Agenda met de Metro stylesheet</div></div><p>Je kunt nu een stylesheet kiezen, maar je kunt dit ook later nog doen of aanpassen.</p><form id="setup-Tour-stylesheet-form"><select id="setup-Stylesheet"><option value="defaultmode">Default</option><option value="darkmode">DarkMode</option><option value="metro">Metro UI</option></select></form><p>Klik op volgende om verder te gaan</p></div>'),
							id: '#page1'
						}
						var page2 = {
							end: function() {
								
							},
							html: $('<div id="page2" class="setup-Page"><h1>Zesjescultuur</h1><p>BetterMagister heeft een ingebouwde zesjescultuur functie, die automatisch veranderingen in je gemiddelde berekent. Hieronder een korte uitleg over het gebruik.</p><div class="thumbnail"><img src="https://rawgit.com/apeklets/BetterMagister/gh-pages/bin/img/zesjes-1.png"></img><div class="caption"><p>Klik op een van de berekende kolommen.</p></div></div><div class="thumbnail"><img src="https://rawgit.com/apeklets/BetterMagister/gh-pages/bin/img/zesjes-2.png"></img><div class="caption"><p>Klik in de sidebar op \'Mutaties Berekenen\'.</p></div></div><div class="thumbnail"><img src="https://rawgit.com/apeklets/BetterMagister/gh-pages/bin/img/zesjes-3.png"></img><div class="caption"><p>Hier kun je de gegevens invullen.</p></div></div></div>'),
							id: '#page2'
						}
						var page3 = {
							end: function() {
								input.Agenda = $('#setup-Agenda').val()
							},
							html: $('<div id="page3" class="setup-Page"><h1>Agendaweergave</h1><p>BetterMagister laat je de agendaweergave opslaan. Wat je normaal elke keer bij de \'Weergave\' tab moet veranderen.</p><div class="thumbnail"><img src="https://rawgit.com/apeklets/BetterMagister/gh-pages/bin/img/metro-agenda.png"></img><div class="caption"><p>Screenshot van de afsprakenlijst weergave</p></div></div><div class="thumbnail"><img src="https://rawgit.com/apeklets/BetterMagister/gh-pages/bin/img/metro-werkweek.png"></img><div class="caption"><p>Screenshot van de werkweekoverzicht weergave</p></div></div><p>Je kunt nu een weergave kiezen, maar je kunt dit ook later nog doen of aanpassen.</p><form><select id="#setup-Agenda"><option value="lijst">Afsprakenlijst</option><option value="dag">Dagoverzicht</option><option value="week">Weekoverzicht</option><option value="werkweek">Werkweekoverzicht</option></select></form></div>'),
							id: '#page3'
						}
						var page4 = {
							end: function() {
								$('#next p').text('Afronden')
							},
							html: $('<div id="page4" class="setup-Page"><h1>Wachtwoord onthouden</h1><p>BetterMagister laat je op de inlogpagina je wachtwoord onthouden, en kan je zelfs automatisch inloggen. Je wachtwoord wordt alleen versleuteld op je computer opgeslagen, en nergens anders.</p><div class="thumbnail"><img src="https://rawgit.com/apeklets/BetterMagister/gh-pages/bin/img/metro-loginscherm.png"></img><div class="caption"><p>Wachtwoord onthouden optie op de loginpagina.</p></div></div></div>'),
							id: '#page4'
						}
						var page5 = {
							end: function() {
							
							},
							html: $('<div id="page5" class="setup-Page"><h1>Instellingen opslaan</h1><p>Alle instellingen die in deze tour aan bot gekomen zijn, kun je aanpassen. De instellingenknop kun je naast je gebruikersnaam en profielfoto vinden, rechtsbovenin het scherm.</p><div class="thumbnail"><img src="https://rawgit.com/apeklets/BetterMagister/gh-pages/bin/img/metro-settingsbutton.png"></img><div class="caption"><p>De settings knop</p></div></div><div class="thumbnail"><img src="https://rawgit.com/apeklets/BetterMagister/gh-pages/bin/img/metro-settings.png"></img><div class="caption"><p>De settings pagina</p></div></div><p>Klik op Afronden om de tour te be&eumlindigen.</p></div>'),
							id: '#page5'
						}
						var input = {};
						var pages = [page1, page2, page3, page4, page5];
						var currentPage = 0;
						var nextPage = function() {
							if(currentPage == 4) {
								//Afronden
								GM_setValue('settings-Stylesheet', input.Stylesheet);
								GM_setValue('settings-Agenda', input.Agenda);
								GM_setValue('setup-Tour', false);
								$('.setup-Tour-widget').remove();
								return;
							} else {
								pages[currentPage].end();
								$('.setup-Tour-widget .content').children().remove();
								currentPage++;
								pages[currentPage].html.appendTo('.setup-Tour-widget .content');
								$(pages[currentPage].id).animate({'opacity': 1}, 500);
								$('#stap p').text('Stap ' + (currentPage + 1).toString() + '/5');
							}
						};
						var prevPage = function() {
							if(currentPage == 4) {
								$('#next p').text('Volgende')
							}
							if(currentPage == 0) {
								return;
							} else {
								$('.setup-Tour-widget .content').children().remove();
								currentPage = currentPage - 1;
								pages[currentPage].html.appendTo('.setup-Tour-widget .content');
								$(pages[currentPage].id).animate({'opacity': 1}, 500);
								$('#stap p').text('Stap ' + (currentPage + 1).toString() + '/5');
							}
						};
						page1.html.appendTo('.setup-Tour-widget .content');
						$('.setup-Page#page1').animate({'opacity': 1}, 500);
						$('.setup-Tour-widget .endlink #next').click(function() {nextPage()});
						$('.setup-Tour-widget .endlink #prev').click(function() {prevPage()});
					});
				});
			}, 2000)
		}
	}, 500);
}

var main = function() {
	GM_addStyle(' .settings-Settings { border-left: 1px solid #666; position: relative; cursor: pointer; }')
	GM_addStyle(' .settings-Settings:hover { background-color: #000 !important; }');
	GM_addStyle(' .account .settings-Settings { display: none !important; }')
	$('<div class="settings-Settings"><span class="icon-settings" style="color: red !important"></span></div>').appendTo('.header');
	if(GM_getValue('setup-Tour', true) && window.location.href != '#/inloggen') {
		setupTour();
	};
	if(GM_getValue('settings-Stylesheet', false) == 'darkmode') {
		$('<link rel="stylesheet" href="https://rawgit.com/apeklets/BetterMagister/gh-pages/build/css/darkmode.min.css">').appendTo('head');
	};
	if(GM_getValue('settings-Stylesheet', false) == 'metro') {
		$('<link rel="stylesheet" href="https://rawgit.com/apeklets/BetterMagister/gh-pages/build/css/metro.min.css">').appendTo('head');
	};
	if($('body').attr('class') == 'account') {
		savePassword();
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
		})
	};
	if(window.location.hash != '#/inloggen') {
		updateCheck();
	};
};

$(document).ready(main);