chrome.runtime.onInstalled.addListener(function() {
	console.log("started");

	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {hostEquals: 'www.fonbet.ru'},
			})],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
});