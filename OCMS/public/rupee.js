var iWords = ['Zero', ' One', ' Two', ' Three', ' Four', ' Five', ' Six', ' Seven', ' Eight', ' Nine'];
var ePlace = ['Ten', ' Eleven', ' Twelve', ' Thirteen', ' Fourteen', ' Fifteen', ' Sixteen', ' Seventeen', ' Eighteen', ' Nineteen'];
var tensPlace = ['', ' Ten', ' Twenty', ' Thirty', ' Forty', ' Fifty', ' Sixty', ' Seventy', ' Eighty', ' Ninety'];
var inWords = [];

var numReversed, inWords, actnumber, i, j;

function tensComplication() {
	if (actnumber[i] == 0) {
		inWords[j] = '';
	} else if (actnumber[i] == 1) {
		inWords[j] = ePlace[actnumber[i - 1]];
	} else {
		inWords[j] = tensPlace[actnumber[i]];
	}
}

	function convertAmount(nValue) {
		//var numericValue = document.getElementById('bdt').value;
		var numValue = parseFloat(nValue).toFixed(2);
		
		var amount = numValue.toString().split('.');
		var taka = amount[0];
		var paisa = amount[1];
		document.getElementById('wamt').innerHTML = "Rupees "+convert(taka) +" and "+ convert(paisa)+" Paisa Only";
		//document.getElementById('wamt').value = "Rupees "+convert(taka) +" and "+ convert(paisa)+" Paisa Only";
	}
function convert(numericValue) {
	inWords = []
	if(numericValue == "00" || numericValue =="0"){
		return 'Zero';
	}
	var obStr = numericValue.toString();
	numReversed = obStr.split('');
	actnumber = numReversed.reverse();

	
	if (Number(numericValue) == 0) {
		document.getElementById('wamt').innerHTML = 'BDT Zero';
		return false;
	}
	
	var iWordsLength = numReversed.length;
	var finalWord = '';
	j = 0;
	for (i = 0; i < iWordsLength; i++) {
		switch (i) {
			case 0:
				if (actnumber[i] == '0' || actnumber[i + 1] == '1') {
					inWords[j] = '';
				} else {
					inWords[j] = iWords[actnumber[i]];
				}
				inWords[j] = inWords[j] + '';
				break;
			case 1:
				tensComplication();
				break;
			case 2:
				if (actnumber[i] == '0') {
					inWords[j] = '';
				} else if (actnumber[i - 1] !== '0' && actnumber[i - 2] !== '0') {
					inWords[j] = iWords[actnumber[i]] + ' Hundred';
				} else {
					inWords[j] = iWords[actnumber[i]] + ' Hundred';
				}
				break;
			case 3:
				if (actnumber[i] == '0' || actnumber[i + 1] == '1') {
					inWords[j] = '';
				} else {
					inWords[j] = iWords[actnumber[i]];
				}
				if (actnumber[i + 1] !== '0' || actnumber[i] > '0') {
					inWords[j] = inWords[j] + ' Thousand';
				}
				break;
			case 4:
				tensComplication();
				break;
			case 5:
				if (actnumber[i] == '0' || actnumber[i + 1] == '1') {
					inWords[j] = '';
				} else {
					inWords[j] = iWords[actnumber[i]];
				}
				if (actnumber[i + 1] !== '0' || actnumber[i] > '0') {
					inWords[j] = inWords[j] + ' Lakh';
				}
				break;
			case 6:
				tensComplication();
				break;
			case 7:
				if (actnumber[i] == '0' || actnumber[i + 1] == '1') {
					inWords[j] = '';
				} else {
					inWords[j] = iWords[actnumber[i]];
				}
				inWords[j] = inWords[j] + ' Crore';
				break;
			case 8:
				tensComplication();
				break;
			default:
				break;
		}
		j++;
	}


	inWords.reverse();
	for (i = 0; i < inWords.length; i++) {
		finalWord += inWords[i];
	}
	return finalWord;
}