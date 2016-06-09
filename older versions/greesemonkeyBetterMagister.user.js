// ==UserScript==
// @name 	BetterMagister.net
// @namespace 	betterSgaMagisterNet
// @description Verbeter de normale Magister 6
// @include 	https://sga.magister.net/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @author 	Wouter Damen
// @version 	v1.6.5
// @grant 	GM_addStyle
// ==/UserScript==

//DarkMode CSS
var darkMode = function() {
	GM_addStyle( " .content-container { background-color: #1F1F1F !important; border: 1px solid #1F1F1F !important; }" )
	GM_addStyle( " .block .content { background-color: #444444 !important; }" )
	GM_addStyle( " .block { background-color: #333333 !important; border: 1px solid #424242 !important; }" )
	GM_addStyle( " .block h3 { background-color: #444444 !important; color: #F4F4F4 !important; border-bottom: 1px solid #1F1F1F !important; }" )
	GM_addStyle( " .endlink { background-color: #333333 !important; border-top: 1px solid #1F1F1F !important; }" )
	GM_addStyle( " a { color: #F4F4F4 !important; }" )
	GM_addStyle( " #vandaag-container .grade-widget ul { background-color: #333333 !important; border-bottom: 1px solid #444444 !important; }" )
	GM_addStyle( " .widget li { background-color: #333333 !important; border-bottom: 1px solid #424242 !important; }" )
	GM_addStyle( " .menu > ul { border-top: 8px solid #424242 !important; }" )
	GM_addStyle( " body { background-color: #424242 !important; }" )
	GM_addStyle( " .header { background-color: #1F1F1F !important;}" )
	GM_addStyle( " .menu { background-color: #1F1F1F !important;}" )
	GM_addStyle( " span.nrblock { background-color: #0096DB !important; }")
	GM_addStyle( " .block .content .title { color: #F2F2F2 !important; }" )
	GM_addStyle( " .block .content p { color: #FFFFFF !important; }" )
	GM_addStyle( " aside .tabs li a { background-color: #333333 !important; border: 1px solid #333333 !important; }" )
	GM_addStyle( " aside .tabs li.active a { border-color: #333333 #333333 -moz-use-text-color !important; background-color: #0096DB !important; }" )
	GM_addStyle( " dl.list-dl { background-color: #444444 !important; }" )
	GM_addStyle( " dl.list-dl dt { border-top: 1px solid #333333 !important; color: #F2F2F2 !important; }" )
	GM_addStyle( " dl.list-dl dd { border-top: 1px solid #333333 !important; color: #F2F2F2 !important; }" )
	GM_addStyle( " .sm-grid.k-grid .k-grid-content tr { background: none repeat scroll 0% 0% #444444 !important; }" )
	GM_addStyle( " .sm-grid.k-grid .k-grid-content td { color: #F2F2F2 !important; }" )
	GM_addStyle( " .sm-grid.k-grid .k-grid-content tr.k-state-selected { background: none repeat scroll 0% 0% #212121 !important; }")
	GM_addStyle( " .first-column { background: none repeat scroll 0% 0% #1F1F1F !important; }" )
	GM_addStyle( " .sources li.selected > a { background-color: #212121 !important; }" )
	GM_addStyle( " .column-container h3, .messages h3 { background: linear-gradient(to bottom, #333333 0px, #333333 100%) repeat scroll 0% 0% transparent }" )
	GM_addStyle( " .cat-detailcolumn { background: none repeat scroll 0% 0% #333333 !important; }" )
	GM_addStyle( " .details-info h5 { color: #F2F2F2 !important; }" )
	GM_addStyle( " .details-info dt { color: #F2F2F2 !important; }" )
	GM_addStyle( " .details-info dd { color: #F2F2F2 !important; }" )
	GM_addStyle( " p { color: #F2F2F2 !important; }" )
	GM_addStyle( " .rest-column { background: none repeat scroll 0% 0% #444444 !important; }" )
	GM_addStyle( " .dialog { border: 1px solid #424242 !important; } " )
	GM_addStyle( " #studiewijzer-container div.studiewijzer-list div.head { background: linear-gradient(to bottom, #333333 0px, #444444 100%) repeat scroll 0% 0% transparent !important; box-shadow: 1px 3px 3px 0px #222 !important; }" )
	GM_addStyle( " #studiewijzer-container div.studiewijzer-list div.head span:first-child { color: #F2F2F2 !important; }" )
	GM_addStyle( " #studiewijzer-container div.studiewijzer-list div.head span:last-child { color: #F2F2F2 !important; }" )
	GM_addStyle( " div.opdrachten-list th { color: #F2F2F2 !important; }" )
	GM_addStyle( " table.table-grid-layout tr { background-color: #444444 !important; }" )
	GM_addStyle( " div.opdrachten-list.normaal td { color: #F2F2F2 }" )
	GM_addStyle( " table.table-grid-layout th { box-shadow: 1px 3px 3px 0px #222 !important; background: linear-gradient(to bottom, #333333 0px, #444444 100%) repeat scroll 0% 0% transparent !important; color: #F2F2F2 !important; }" )
	GM_addStyle( " .widget .dualcollumn-list li { color: #F2F2F2 !important; }" )
	GM_addStyle( " .widget .dualcollumn-list li.onecol { color: #F2F2F2 !important; }" )
	GM_addStyle( " table.table-grid-layout td { color: #F2F2F2 !important; }" )
	GM_addStyle( " #studiewijzer-container div.studiewijzer-list.normaal > ul > li > a { background-color: #444444 !important; }" )
	GM_addStyle( " .studiewijzer-onderdeel > div.block > div.content > div { color: #F2F2F2 !important; }" )
	GM_addStyle( " #opdracht-detail div.comment { color: #F2F2F2 !important; }" )
	GM_addStyle( " .sm-grid.k-grid .k-grid-content .k-grouping-row .group-header-content { background: linear-gradient(to bottom, #333333 0px, #444444 100%) repeat scroll 0% 0% transparent !important; color: #F2F2F2 !important; }" )
	GM_addStyle( " .sm-grid.k-grid .k-grid-content { background-color: #333333 !important; }" )
	GM_addStyle( " .cijfers-k-grid.k-grid .k-grid-header th.k-header { background: linear-gradient(to bottom, #333333 0px, #444444 100%) repeat scroll 0% 0% transparent !important; }" )
	GM_addStyle( " .cijfers-k-grid.k-grid .double-header { color: #F2F2F2 !important; }" )
	GM_addStyle( " .cijfers-k-grid.k-grid .k-grid-content td span { background-color: #444444 !important; color: #F2F2F2 !important; }" )
	GM_addStyle( " .cijfers-k-grid.k-grid .grade.gemiddeldecolumn { background-color: #54AD54 !important; }" )
	GM_addStyle( " .cijfers-k-grid.k-grid .grade.empty { background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAGElEQVQImWO4evXqfwYoQGZjCBCWpJ5RAEVOKenK4yvqAAAAAElFTkSuQmCC\") repeat scroll 0% 0% #444444 !important; }" )
	GM_addStyle( " #cijfers-container .main div.content-container-cijfers { background-color: #333333 !important; }" )
	GM_addStyle( " .comment.ng-binding.ng-scope { color: #F2F2F2 !important; }" )
	GM_addStyle( " .ngViewport { background-color: #333333 !important; }" )
	GM_addStyle( " div.ngCell, div.ngCellText, div.ngVerticalBar, div.ngHeaderCell, div.ngHeaderContainer { color: #F2F2F2 !important; }" )
	GM_addStyle( " div.ngCellText { background-color: #444444 !important; }" )
	GM_addStyle( " .ngHeaderText { background-color: #333333 !important; }" )
	GM_addStyle( " #notificatie-widget b { width: 250px !important; }" )
	GM_addStyle( " .grade.eloopdracht { color: #000000 !important; }" )
	//v1.6.1 Fix profielpagina
	GM_addStyle( " .from { color: #F2F2F2 !important; }" )
	GM_addStyle( " .multi-line { color: #F2F2F2 !important; }" )
	GM_addStyle( " fieldset label { color: #F2F2F2 !important; }" )
	GM_addStyle( " .card { border: 1px solid #424242 !important; }" )
	GM_addStyle( " .card .content.content-high { background: linear-gradient(#444444, #333333) !important; color: #F2F2F2 !important; }" )
	//v1.6.2 Fix inlogpagina die niet meer werkte door 1.6.1
	GM_addStyle( " .account-dialog .content-pane { background: #222222 !important; }" )
	GM_addStyle( " .dialog .content { background: #222222 !important; }" )
	//v1.6.3 Fix Weergave ui + wijzigingen h4
	GM_addStyle( " .k-header { background-color: #333333 !important; }" )
	GM_addStyle( " .k-content { background-color: #424242 !important; }" )
	GM_addStyle( " .k-calendar .k-header .k-state-hover { background: #333333 !important; }" )
	GM_addStyle( " .k-calendar thead th { background-color: #222222 !important; border-top: 1px solid #111111 !important; border-right: 1px solid #444444 !important; border-bottom: 1px solid #111111 !important; color: #F2F2F2 !important; }" )
	GM_addStyle( " .k-calendar td.range-select { background-color: #222222 !important; border: 1px solid #F5F5F5 !important; }" )
	GM_addStyle( " .k-calendar td.range-select.last { border-right: 1px solid #F5F5F5 !important; }" )
	GM_addStyle( " .k-calendar td.range-select.last { border-left: 1px solid #F5F5F5 !important; }" )
	GM_addStyle( " .block .content form { background-color: #444444 !important; }" )
	GM_addStyle( " .block .content form label { color: #F2F2F2 !important; }" )
	GM_addStyle( " .block h4 { background: none repeat scroll 0% 0% #444444 !important; border-top: 1px solid #444444 !important; border-bottom: 1px solid #F2F2F2 !important; color: #F2F2F2 !important; }" )
	GM_addStyle( " form .radio input[type=\"radio\"]:checked ~ label, fieldset .radio input[type=\"radio\"]:checked ~ label { color: #101010 !important; }" )
	GM_addStyle( " form .radio input[type=\"radio\"] ~ label, fieldset .radio input[type=\"radio\"] ~ label { color: #101010 !important; }" )
	//v1.6.4 Fix sessie verlopen ui
	GM_addStyle( " .label-input label { color: #F2F2F2 !important; }" )
	GM_addStyle( " .text-input label { color: #F2F2F2 !important; }" )
	GM_addStyle( " .dialog .title { background-color: #333333 !important; }" )
};

var main = function() {
	darkMode();
};

$(document).ready(main);