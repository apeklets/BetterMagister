var BetterMagister = BetterMagister || (function(){
	var _args = {};
	
	return {
		init: function(Args) {
			_args = Args;
		}
		getSettings: function() {
			return _args;
		}
	};
}());