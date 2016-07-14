var BetterMagisterInfo = {
	metroVersion: "Metro v1.5.1",
	darkmodeVersion: "Dark Mode 1.7.1",
	bmVersion: "v1.11.6",
};

var updateAlert = function() {
	var updateNotification = $('<div id="updateMsg" class="toast ng-scope info-toast info-msg" style="z-index: 999999;" data-ng-repeat="toast in activeToasts"><span class="glyph" id="updateGlyph"><a href="#"></a></span><span class="ng-binding" data-ng-bind="toast.toast.title">UPDATE!</span><em class="ng-binding" data-ng-bind-html="toast.toast.trustedMessage">Update voor BetterMagister beschikbaar!</em><a href="https://apeklets.github.io/BetterMagister/#installatie" target="_blank">Install</a> <a href="https://apeklets.github.io/BetterMagister/#changelog" target="_blank">Changelog</a> <a>Sluiten</a><i></i></div>')
	updateNotification.appendTo('.toasts');
	$('#updateMsg a').click(function() {
		$('#updateMsg').remove();
	})
};
