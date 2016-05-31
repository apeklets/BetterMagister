// ==UserScript==
// @name 	BetterMagister2
// @namespace 	betterSgaMagisterNet2
// @description Verbeter de normale Magister 6
// @include 	https://sga.magister.net/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @author 	Wouter Damen
// @version 	v1.9build4
// @grant 	GM_addStyle
// @grant	GM_setValue
// @grant	GM_getValue
// ==/UserScript==
var bmVersion = "v1.9";
var metroVersion = "Metro v1.3";
var darkmodeVersion = "Dark Mode v1.6.5";

var MetroUI = function() {
//v1.0
	//Body background
	GM_addStyle( " body { font-family: \"Segoe UI\", \"Open Sans\", serif !important; background-color: #424242 !important; }" )
	GM_addStyle( " .menu > ul { border-top: 8px solid #424242 !important; }" )
	//Fonts
	GM_addStyle( " h1, h2, h3 { font-family: \"Segoe UI\", \"Open Sans\", serif !important; }" )
	GM_addStyle( " .head-bar h1 { font-size: 16px !important; }" )
	GM_addStyle( " .menu a { color: #F2F2F2 !important; }" )
	GM_addStyle( " p, table, th, td, input, textarea, select { font-family: \"Segoe UI\", \"Open Sans\", serif !important; font-size: 11px !important; }" )
	GM_addStyle( " .widget { font-family: \"Segoe UI\", \"Open Sans\", serif !important; font-size: 11px !important; }" )
	GM_addStyle( " .block .content { font: 11px \"Segoe UI\", \"Open Sans\", serif !important; }" )
	//Blocks
	GM_addStyle( " .block h3 { color: #F2F2F2 !important; height: 35px !important; font: 15px/20px \"Segoe UI\", \"Open Sans\", serif !important; }" )
	GM_addStyle( " .block { border: 1px solid #111 !important; background-color: #333 !important; border-radius: 0px !important; }" )
	GM_addStyle( " .block h3 b { padding-top: 5px !important; }" )
	GM_addStyle( " .endlink { border-top: 1px solid #222 !important; background-color: #333 !important; height: 20px !important; text-transform: unset !important; }" )
	GM_addStyle( " .endlink a { height: 0px !important; line-height: 0px !important; padding: 8px 8px !important; color: #00AFFF !important; }" )
	GM_addStyle( " .block .content { background-color: #444 !important; }" )
	GM_addStyle( " .widget { padding: 3px 3px 0 0 !important; }" )
	//Vandaagscherm agenda
	GM_addStyle( " .agenda-widget li { height: 40px !important; }" )
	GM_addStyle( " .widget li { background-color: #222 !important; border-bottom: 1px solid #3C3C3C !important; }" )
	GM_addStyle( " .alertRed { background-color: #141414 !important; }" )
	GM_addStyle( " .alert { background-color: #222 !important; }" )
	GM_addStyle( " .widget .agenda-list li a { line-height: 20px !important; padding-top: 0px !important; }" )
	GM_addStyle( " .widget .list li a { color: #F2F2F2 !important; }" )
	//Recente Cijfers
	GM_addStyle(  " #vandaag-container .grade-widget ul { background-color: #222 !important; }" )
	GM_addStyle( " #cijfers-leerling .last-grade { border-radius: 1px !important; }" )
	GM_addStyle( " #cijfers-leerling .last-grade span { font-family: \"Segoe UI\", \"Open Sans\", serif !important; font-size: 11px !important; }" )
	GM_addStyle( " #cijfers-leerling .last-grade span.cijfer { font-family: \"Segoe UI\", \"Open Sans\", serif !important; font-size: 35px !important; }" )
	GM_addStyle(".widget .list li.no-data:hover { background-color: #222 !important; }")
	//Container background
	GM_addStyle( " .content-container { background-color: #242424 !important; border: 1px solid #242424 !important; }" )
	//Agenda afsprakenlijst
	GM_addStyle( " .sm-grid.k-grid .k-grid-content tr { background: none repeat scroll 0% 0% #222 !important; }" )
	GM_addStyle( " .sm-grid.k-grid .k-grid-content td { color: #F2F2F2 !important; }" )
	GM_addStyle( " .sm-grid.k-grid .k-grid-content tr.k-state-selected { background: none repeat scroll 0% 0% #131313 !important; }")
	GM_addStyle( " .sm-grid.k-grid .k-grid-content .k-grouping-row .group-header-content { background: #333 !important; color: #F2F2F2 !important; }" )
	GM_addStyle( " .sm-grid.k-grid .k-grid-content { background-color: #333 !important; }" )
	GM_addStyle( " dl.list-dl { background-color: #444 !important; }" )
	GM_addStyle( " dl.list-dl dt { color: #F2F2F2 !important; }" )
	GM_addStyle( " dl.list-dl dd { color: #FFF !important; }" )
	GM_addStyle( " aside .tabs li a { background-color: #333 !important; border: 1px solid #333 !important; color: #FFF !important; }" )
	GM_addStyle( " aside .tabs li.active a { border-color: #333 #333 -moz-use-text-color !important; background-color: #0096DB !important; }" )	
	GM_addStyle( " .block .content .title { color: #F2F2F2 !important; }" )
	GM_addStyle( " .block .content p { color: #FFF !important; }" )
	GM_addStyle( " .k-header { background-color: #333 !important; }" )
	GM_addStyle( " .k-content { background-color: #424242 !important; }" )
	GM_addStyle( " .k-calendar .k-header .k-state-hover { background: #333 !important; }" )
	GM_addStyle( " .k-calendar thead th { background-color: #222 !important; border-top: 1px solid #111 !important; border-right: 1px solid #444 !important; border-bottom: 1px solid #111 !important; color: #F2F2F2 !important; }" )
	GM_addStyle( " .k-calendar td.range-select { background-color: #222 !important; border: 1px solid #F5F5F5 !important; }" )
	GM_addStyle( " .k-calendar td.range-select.last { border-right: 1px solid #F5F5F5 !important; }" )
	GM_addStyle( " .k-calendar td.range-select.last { border-left: 1px solid #F5F5F5 !important; }" )
	GM_addStyle( " .k-calendar .k-link { color: #F0F0F0 !important; }" )
	GM_addStyle( " .k-calendar { border: 1px solid #111 !important; border-radius: 0px !important; }" )
	GM_addStyle( " .block .content form { background-color: #444 !important; }" )
	//Forms
	GM_addStyle( " form label { color: #F2F2F2 !important; }" )
	GM_addStyle( " form .radio input[type=\"radio\"]:checked ~ label, fieldset .radio input[type=\"radio\"]:checked ~ label { color: #101010 !important; }" )
	GM_addStyle( " form .radio input[type=\"radio\"] ~ label, fieldset .radio input[type=\"radio\"] ~ label { color: #101010 !important; }" )
	//Aanwezigheid
	GM_addStyle( " table.table-grid-layout tr { background-color: #222 !important; border-bottom: 1px solid #E5E5E5 !important; }" )
	GM_addStyle( " table.table-grid-layout th { background: #333 !important; color: #F2F2F2 !important; box-shadow: 0px 0px 0px 0px #222 !important; }" )
	GM_addStyle( " .normaal table.table-grid-layout td { color: #F2F2F2 !important; }" )
	GM_addStyle( " fieldset label { color: #F2F2F2 !important; }" )
	//Cijferoverzicht
	GM_addStyle( " #cijfers-container .main div.content-container-cijfers { background-color: #242424 !important; border: 1px solid #242424 !important; }" )
	GM_addStyle( " .cijfers-k-grid.k-grid .k-grid-content tr, .cijfers-k-grid.k-grid .k-grid-content tr.k-alt { background-color: #222 !important; }" )
	GM_addStyle( " .cijfers-k-grid.k-grid .k-grid-header th.k-header { background: #333 !important; }" )
	GM_addStyle( " .cijfers-k-grid.k-grid .double-header { color: #F2F2F2 !important; }" )
	GM_addStyle( " .cijfers-k-grid.k-grid .k-grid-content td span { background-color: #222 !important; color: #F2F2F2 !important; }" )
	GM_addStyle( " .cijfers-k-grid.k-grid .grade.gemiddeldecolumn { background-color: #54AD54 !important; }" )
	GM_addStyle( " .cijfers-k-grid.k-grid .grade.empty { background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAGElEQVQImWO4evXqfwYoQGZjCBCWpJ5RAEVOKenK4yvqAAAAAElFTkSuQmCC\") repeat scroll 0% 0% #444 !important; }" )
	GM_addStyle( " .cijfers-k-grid.k-grid .k-grid-header th.k-header > a.k-link { color: #F2F2F2 !important; }" )
	GM_addStyle( " #cijfers-container aside .widget .cijfer-berekend tr { background-color: #444 !important; color: #FFF !important; }" )
	GM_addStyle( " #cijfers-container aside .widget .cijfer-berekend tr:first-child { box-shadow: 0px 0px 0px 0px #222 !important; background: #333 !important; color: #F2F2F2 !important; }" )
	//Berichten
	GM_addStyle( " .msg-list .unread .from { color: #F2F2F2 !important; }" )
	GM_addStyle( " .column-container h3, .messages h3 { background: #333 !important; }" )
	GM_addStyle( " .first-column { background: #242424 !important; border-right: 1px solid #242424 !important; }" )
	GM_addStyle( " .sources li.selected > a { background-color: #121212 !important; }" )
	GM_addStyle( " .cat-subcolumn { background: #242424 !important; border-right: 1px solid #242424 !important; border-left: 1px solid #242424 !important; }" )
	GM_addStyle( " .cat-detailcolumn { background: #444 !important; color: #F2F2F2 !important; }" )
	GM_addStyle( " .details h3 { line-height: 20px !important; }" )
	GM_addStyle( " div.msg-widget .msg-detail > span.from { color: #F2F2F2 !important; }" )
	//ELO Bronnen
	GM_addStyle( " .rest-column { background: #242424 !important; }" )
	GM_addStyle( " .tile li a { color: #F2F2F2 !important; }" )
	GM_addStyle( " .block .breadcrumb.ng-binding { padding-top: 5px !important; }" )
	//ELO Studiewijzers
	GM_addStyle( " #studiewijzer-container div.studiewijzer-list div.head { background: #333 !important; color: #F2F2F2 !important; box-shadow: 0px 0px 0px 0px #222 !important; }" )
	GM_addStyle( " #studiewijzer-container div.studiewijzer-list > ul > li { background: #222 !important; }" )
	GM_addStyle( " #studiewijzer-container div.studiewijzer-list > ul > li > a { color: #FFF !important; }" )
	GM_addStyle( " #studiewijzer-container div.studiewijzer-list > ul > li:hover { background-color: #121212 !important; }" ) 
	//ELO Opdrachten
	GM_addStyle( " .widget .dualcollumn-list li { color: #F2F2F2 !important; }" )
	GM_addStyle( " .widget .dualcollumn-list li.onecol { color: #F2F2F2 !important; }" )
	GM_addStyle( " .versions li a { color: #F2F2F2 !important; }" )
	GM_addStyle( " .versions li:first-child i { color: #787878 !important; }" )
	GM_addStyle( " .block .content.background-white { color: #FFF !important; }" )
	GM_addStyle( " .uitwerking h3 b { display: flex !important; }" )
	//ELO Inschrijven
	GM_addStyle( " .ngGrid { background-color: #242424 !important; }" )
	GM_addStyle( " .ngHeaderContainer { font-family: \"Segoe UI\", \"Open Sans\", serif !important; color: #F2F2F2 !important; }" )
	GM_addStyle( " div.ngHeaderCell { background: #333 !important; }" )
	//Leermiddelen
	GM_addStyle( " table.table-grid-layout td { color: #F2F2F2 !important; }" )
	GM_addStyle( " table.table-grid-layout td a { color: #0096db !important; }" )
//v1.1
	//Mijn instellingen
	GM_addStyle( " ul.multi-line strong { color: #F2F2F2 !important; }" )
	GM_addStyle( " ul.multi-line li span { color: #ABABAB !important; }" )
	GM_addStyle( " .card { border: 1px solid #111 !important; border-radius: 0px !important; }" )
	GM_addStyle( " .card .content { background: #333 !important; border-radius: 0px !important; color: #FFF !important; }" )
	//Settings Footer
	GM_addStyle( " .endlink p { float: left; line-height: 0px; color: #BBB; padding: 8px 0 0 8px; }" )
//v1.2
	//Sessie verlopen dialog
	GM_addStyle( " .dialog { border: 1px solid #111 !important; border-radius: 0px !important; }" )
	GM_addStyle( " .dialog .title { color: #F2F2F2 !important; height: 35px !important; font: 15px/20px \"Segoe UI\", \"Open Sans\", serif !important; background-color: #333 !important; padding-top: 5px !important; }" )
	GM_addStyle( " .dialog .content { background-color: #444 !important; }" )
	GM_addStyle( " .dialog .footer { background-color: #333 !important; }" )
	GM_addStyle( " .label-input label { color: #F2F2F2 !important; }" )
	GM_addStyle( " .text-input label { color: #F2F2F2 !important; }" )
	//Inlog dialog
	GM_addStyle( " #schoolnaam { padding-top: 5px !important; }" )
	GM_addStyle( " .checkbox-input input[type=\"checkbox\"] + label span { margin: 2px 4px 0 0 !important; }" )
	GM_addStyle( " .account .checkbox-input { width: 175px !important; }" )
	GM_addStyle( " .dialog .content p { color: #F2F2F2 !important; }" )
//v1.3
	//Inschrijven
	GM_addStyle( " .ngHeaderText { color: #F2F2F2 !important; }" )
	//Profiel
	GM_addStyle( " div.profile-content { background: #333 !important; }" )
	GM_addStyle( " div.profile-content div { color: #FFF !important; padding: 25px 6px 6px 6px !important; }" )
	GM_addStyle( " span.datetime-label { background-color: #444 !important; width: 100%; color: #DDD !important; text-align: left !important; padding-left: 5px; }" )
	//Portfoliodocumenten
	GM_addStyle( " .main div.multi-columns .col:last-child { background-color: #444 !important; }" )
	GM_addStyle( " .main div.multi-columns .col { background-color: #222 !important; }" )
	GM_addStyle( " .k-treeview .k-in.k-state-selected > a { background-color: #121212 !important; color: #F2F2F2 !important; }" )
	GM_addStyle( " .k-treeview .k-in > a.single-row { background-color: #333 !important; color: #F2F2F2 !important; }" )
	GM_addStyle( " .sources h3 { background: #444 !important; font-size: 13px !important; border-bottom: 1px solid #222 !important; padding-top: 0px !important; }" )
	GM_addStyle( " #idBronnen .block h3 { padding-top: 5px; }" )
	//Beoordeelde producten
	GM_addStyle( " .sm-grid.k-grid .k-grid-header th.k-header { background: #222 !important; }" )
	GM_addStyle( " .sm-grid.k-grid .k-grid-header th.k-header > a.k-link { color: #F2F2F2 !important; }" )
};

var darkMode = function() {
	GM_addStyle( " .content-container { background-color: #1F1F1F !important; border: 1px solid #1F1F1F !important; }" )
	GM_addStyle( " .block .content { background-color: #444 !important; }" )
	GM_addStyle( " .block { background-color: #333 !important; border: 1px solid #424242 !important; }" )
	GM_addStyle( " .block h3 { background-color: #444 !important; color: #F4F4F4 !important; border-bottom: 1px solid #1F1F1F !important; }" )
	GM_addStyle( " .endlink { background-color: #333 !important; border-top: 1px solid #1F1F1F !important; }" )
	GM_addStyle( " a { color: #F4F4F4 !important; }" )
	GM_addStyle( " #vandaag-container .grade-widget ul { background-color: #333 !important; border-bottom: 1px solid #444 !important; }" )
	GM_addStyle( " .widget li { background-color: #333 !important; border-bottom: 1px solid #424242 !important; }" )
	GM_addStyle( " .menu > ul { border-top: 8px solid #424242 !important; }" )
	GM_addStyle( " body { background-color: #424242 !important; }" )
	GM_addStyle( " .header { background-color: #1F1F1F !important;}" )
	GM_addStyle( " .menu { background-color: #1F1F1F !important;}" )
	GM_addStyle( " span.nrblock { background-color: #0096DB !important; }")
	GM_addStyle( " .block .content .title { color: #F2F2F2 !important; }" )
	GM_addStyle( " .block .content p { color: #FFF !important; }" )
	GM_addStyle( " aside .tabs li a { background-color: #333 !important; border: 1px solid #333 !important; }" )
	GM_addStyle( " aside .tabs li.active a { border-color: #333 #333 -moz-use-text-color !important; background-color: #0096DB !important; }" )
	GM_addStyle( " dl.list-dl { background-color: #444 !important; }" )
	GM_addStyle( " dl.list-dl dt { border-top: 1px solid #333 !important; color: #F2F2F2 !important; }" )
	GM_addStyle( " dl.list-dl dd { border-top: 1px solid #333 !important; color: #F2F2F2 !important; }" )
	GM_addStyle( " .sm-grid.k-grid .k-grid-content tr { background: none repeat scroll 0% 0% #444 !important; }" )
	GM_addStyle( " .sm-grid.k-grid .k-grid-content td { color: #F2F2F2 !important; }" )
	GM_addStyle( " .sm-grid.k-grid .k-grid-content tr.k-state-selected { background: none repeat scroll 0% 0% #212121 !important; }")
	GM_addStyle( " .first-column { background: none repeat scroll 0% 0% #1F1F1F !important; }" )
	GM_addStyle( " .sources li.selected > a { background-color: #212121 !important; }" )
	GM_addStyle( " .column-container h3, .messages h3 { background: linear-gradient(to bottom, #333 0px, #333 100%) repeat scroll 0% 0% transparent }" )
	GM_addStyle( " .cat-detailcolumn { background: none repeat scroll 0% 0% #333 !important; }" )
	GM_addStyle( " .details-info h5 { color: #F2F2F2 !important; }" )
	GM_addStyle( " .details-info dt { color: #F2F2F2 !important; }" )
	GM_addStyle( " .details-info dd { color: #F2F2F2 !important; }" )
	GM_addStyle( " p { color: #F2F2F2 !important; }" )
	GM_addStyle( " .rest-column { background: none repeat scroll 0% 0% #444 !important; }" )
	GM_addStyle( " .dialog { border: 1px solid #424242 !important; } " )
	GM_addStyle( " #studiewijzer-container div.studiewijzer-list div.head { background: linear-gradient(to bottom, #333 0px, #444 100%) repeat scroll 0% 0% transparent !important; box-shadow: 1px 3px 3px 0px #222 !important; }" )
	GM_addStyle( " #studiewijzer-container div.studiewijzer-list div.head span:first-child { color: #F2F2F2 !important; }" )
	GM_addStyle( " #studiewijzer-container div.studiewijzer-list div.head span:last-child { color: #F2F2F2 !important; }" )
	GM_addStyle( " div.opdrachten-list th { color: #F2F2F2 !important; }" )
	GM_addStyle( " table.table-grid-layout tr { background-color: #444 !important; }" )
	GM_addStyle( " div.opdrachten-list.normaal td { color: #F2F2F2 }" )
	GM_addStyle( " table.table-grid-layout th { box-shadow: 1px 3px 3px 0px #222 !important; background: linear-gradient(to bottom, #333 0px, #444 100%) repeat scroll 0% 0% transparent !important; color: #F2F2F2 !important; }" )
	GM_addStyle( " .widget .dualcollumn-list li { color: #F2F2F2 !important; }" )
	GM_addStyle( " .widget .dualcollumn-list li.onecol { color: #F2F2F2 !important; }" )
	GM_addStyle( " table.table-grid-layout td { color: #F2F2F2 !important; }" )
	GM_addStyle( " #studiewijzer-container div.studiewijzer-list.normaal > ul > li > a { background-color: #444 !important; }" )
	GM_addStyle( " .studiewijzer-onderdeel > div.block > div.content > div { color: #F2F2F2 !important; }" )
	GM_addStyle( " #opdracht-detail div.comment { color: #F2F2F2 !important; }" )
	GM_addStyle( " .sm-grid.k-grid .k-grid-content .k-grouping-row .group-header-content { background: linear-gradient(to bottom, #333 0px, #444 100%) repeat scroll 0% 0% transparent !important; color: #F2F2F2 !important; }" )
	GM_addStyle( " .sm-grid.k-grid .k-grid-content { background-color: #333 !important; }" )
	GM_addStyle( " .cijfers-k-grid.k-grid .k-grid-header th.k-header { background: linear-gradient(to bottom, #333 0px, #444 100%) repeat scroll 0% 0% transparent !important; }" )
	GM_addStyle( " .cijfers-k-grid.k-grid .double-header { color: #F2F2F2 !important; }" )
	GM_addStyle( " .cijfers-k-grid.k-grid .k-grid-content td span { background-color: #444 !important; color: #F2F2F2 !important; }" )
	GM_addStyle( " .cijfers-k-grid.k-grid .grade.gemiddeldecolumn { background-color: #54AD54 !important; }" )
	GM_addStyle( " .cijfers-k-grid.k-grid .grade.empty { background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAGElEQVQImWO4evXqfwYoQGZjCBCWpJ5RAEVOKenK4yvqAAAAAElFTkSuQmCC\") repeat scroll 0% 0% #444 !important; }" )
	GM_addStyle( " #cijfers-container .main div.content-container-cijfers { background-color: #333 !important; }" )
	GM_addStyle( " .comment.ng-binding.ng-scope { color: #F2F2F2 !important; }" )
	GM_addStyle( " .ngViewport { background-color: #333 !important; }" )
	GM_addStyle( " div.ngCell, div.ngCellText, div.ngVerticalBar, div.ngHeaderCell, div.ngHeaderContainer { color: #F2F2F2 !important; }" )
	GM_addStyle( " div.ngCellText { background-color: #444 !important; }" )
	GM_addStyle( " .ngHeaderText { background-color: #333 !important; }" )
	GM_addStyle( " #notificatie-widget b { width: 250px !important; }" )
	GM_addStyle( " .grade.eloopdracht { color: #000 !important; }" )
//v1.6.1 Fix profielpagina
	GM_addStyle( " .from { color: #F2F2F2 !important; }" )
	GM_addStyle( " .multi-line { color: #F2F2F2 !important; }" )
	GM_addStyle( " fieldset label { color: #F2F2F2 !important; }" )
	GM_addStyle( " .card { border: 1px solid #424242 !important; }" )
	GM_addStyle( " .card .content.content-high { background: linear-gradient(#444, #333) !important; color: #F2F2F2 !important; }" )
//v1.6.2 Fix inlogpagina die niet meer werkte door 1.6.1
	GM_addStyle( " .account-dialog .content-pane { background: #222 !important; }" )
	GM_addStyle( " .dialog .content { background: #222 !important; }" )
//v1.6.3 Fix Weergave ui + wijzigingen h4
	GM_addStyle( " .k-header { background-color: #333 !important; }" )
	GM_addStyle( " .k-content { background-color: #424242 !important; }" )
	GM_addStyle( " .k-calendar .k-header .k-state-hover { background: #333 !important; }" )
	GM_addStyle( " .k-calendar thead th { background-color: #222 !important; border-top: 1px solid #111 !important; border-right: 1px solid #444 !important; border-bottom: 1px solid #111 !important; color: #F2F2F2 !important; }" )
	GM_addStyle( " .k-calendar td.range-select { background-color: #222 !important; border: 1px solid #F5F5F5 !important; }" )
	GM_addStyle( " .k-calendar td.range-select.last { border-right: 1px solid #F5F5F5 !important; }" )
	GM_addStyle( " .k-calendar td.range-select.last { border-left: 1px solid #F5F5F5 !important; }" )
	GM_addStyle( " .block .content form { background-color: #444 !important; }" )
	GM_addStyle( " .block .content form label { color: #F2F2F2 !important; }" )
	GM_addStyle( " .block h4 { background: none repeat scroll 0% 0% #444 !important; border-top: 1px solid #444 !important; border-bottom: 1px solid #F2F2F2 !important; color: #F2F2F2 !important; }" )
	GM_addStyle( " form .radio input[type=\"radio\"]:checked ~ label, fieldset .radio input[type=\"radio\"]:checked ~ label { color: #101010 !important; }" )
	GM_addStyle( " form .radio input[type=\"radio\"] ~ label, fieldset .radio input[type=\"radio\"] ~ label { color: #101010 !important; }" )
//v1.6.4 Fix sessie verlopen ui
	GM_addStyle( " .label-input label { color: #F2F2F2 !important; }" )
	GM_addStyle( " .text-input label { color: #F2F2F2 !important; }" )
	GM_addStyle( " .dialog .title { background-color: #333 !important; }" )
//v1.6.5 Settings footer
	GM_addStyle( " .endlink { text-transform: unset !important; }" )
	GM_addStyle( " .endlink p { float: left; padding-left: 8px; }" )
};

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

var zesjescultuur = function() {
	var zesjescultuurVersion = 'dev0.1';
	var zesjescultuurWidget = $('<div id="zesjescultuur"><p>Test</p></div>');
	GM_addStyle(' #zesjescultuurLink { float: left !important; }');
	var lazyLoad = setInterval(function() {
		if (!$('#cijferoverzichtgrid').length) {
			return;
		} else {
			clearInterval(lazyLoad)
			$('<footer class="endlink"><a id="zesjescultuurLink">Mutaties berekenen</a></footer>').appendTo('#cijferoverzichtgrid');
			$('#zesjescultuurLink').click(function() {
				zesjescultuurWidget.appendTo('#cijferoverzichtgrid');
				
			});
		};
	}, 2000);
}

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
		darkMode();
	};
	if(GM_getValue('settings-MetroUI', false)) {
		MetroUI();
	};
	$('.settings-Settings').click(function() {
		settingsSetup();
	});
	autoAgendaWeergave(GM_getValue('settings-Agenda', 'lijst'));
	if(window.location.href == 'https://sga.magister.net/magister/#/cijfers') {
		zesjescultuur();
	};
	$('#menuKnopCijferoverzicht').click(function() {
		zesjescultuur();
	});
};

$(document).ready(main);