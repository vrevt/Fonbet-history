document.addEventListener('DOMContentLoaded', () => {
	let downloadButton = document.getElementById('download');
	downloadButton.addEventListener('click', function() {
		alert('chpunk');
	});

	//chrome.tabs.executeScript(null, {"code": "document.getElementsByClassName('column column-1')"}, function(data) { })
		
	//const data = document.getElementsByClassName('test');
	//alert(data.innerText);
});