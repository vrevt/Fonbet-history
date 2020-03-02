document.addEventListener('DOMContentLoaded', () => {
	chrome.tabs.getSelected(null, function(tab) {
		// Now inject a script onto the page
  		chrome.tabs.executeScript(tab.id, {
      		 code: "chrome.runtime.sendMessage({content: document.body.innerHTML}, function(response) { console.log('success'); });"
     	}, function() { console.log('done'); });
	});

	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			let dom = new DOMParser().parseFromString(request.content, "text/html");

			if (dom.getElementsByClassName('account-history-bets__main').length){
				let wasfalse = 0;
				if (wasfalse) return;
				let flag = confirm("Do you want save history?");
				if (!flag) {
					wasfalse = 1;
					return;
				}
			} else {
				alert("wrong page");
				return;
			}
			let column = [];
			for (let i = 2; i < 6; i++) {
				column.push(dom.getElementsByClassName('column column-' + i.toString()));
			}
			let table = [];
			for (let i = 0; i < 4; i++){
				table.push([]);
				for (let j = 0; j < column[i].length; j++) table[i].push(column[i][j].innerText);
			}

			table.push([]);
			table.push([]);
			let col = dom.getElementsByClassName('column column-6');
			table[4].push(col[0].innerText);
			table[5].push('');

			for (let i = 1; i < col.length; i++){
				let x = col[i].getElementsByClassName('bets-list__sticker-value');
				if (x.length > 0){
					table[4].push(col[i].getElementsByTagName('span')[0].innerText);
					table[5].push(x[0].innerText);
				} else {
					table[4].push(col[i].getElementsByTagName('span')[0].innerText);
					table[5].push('');
				}
			}

			let csvContent = "data:text/csv;charset=utf-8,";

			for (let i = 0; i < table[0].length; i++){
				for (let j = 0; j < 6; j++) {
					csvContent += table[j][i] + ',';
				}
				csvContent += "\r\n";
			}

			let encodedUri = encodeURI(csvContent);
			window.open(encodedUri);
		});
});