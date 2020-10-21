function alphaOnly(event) {
  var key = event.keyCode;
  return ((key >= 65 && key <= 90) || key == 8);
};

//Update keyword
document.querySelector('#updateKeyword')
    .addEventListener('click', function () {
        setKeyword();
    });
	
var keyword;
var len;
var current = 0;

//Bold the current char to shift index
function setKeyword()
{	
	document.getElementById("keyword_container").innerHTML = "";

	keyword = document.getElementById("keyword").value.toUpperCase();
	len = keyword.length;
	
	for(var i=0;i<len;i++){
		var node = document.createElement("LI");
		var textnode = document.createTextNode(keyword.charAt(i) + " = " + (keyword.charCodeAt(i) - 65));
		node.appendChild(textnode);
		
		if(current == i){
			var bold = document.createElement('strong');
			document.getElementById("keyword_container").appendChild(bold);
			bold.appendChild(node);
		}else{
			document.getElementById("keyword_container").appendChild(node);
		}
	}
	
	setSourceText(current);
};

//Update key -> source
function setSourceText(current)
{
	document.getElementById("source_container").innerHTML = "";
	
	for(var i=0;i<25;i++){
		
		var cipherInt = (i + 65) + (keyword.charCodeAt(current) - 65);
		if(cipherInt>90)
			cipherInt = cipherInt - 90 + 64;

		var node = document.createElement("LI");
		var textnode = document.createTextNode(String.fromCharCode(i+65) + " = " + String.fromCharCode(cipherInt));
		node.appendChild(textnode);
		document.getElementById("source_container").appendChild(node);
	}
};

//User input for 
document.getElementById('otext').addEventListener('keypress', function(e){

	charCurr = String.fromCharCode(e.which).toUpperCase();
		
	var cipherInt = charCurr.charCodeAt(0) + (keyword.charCodeAt(current)-65);
	if(cipherInt>90)
		cipherInt = cipherInt - 90 + 64;
	
	document.getElementById('ctext').value += String.fromCharCode(cipherInt);
	
	setKeyword();
	
	if(current >= len-1)
		current = 0;
	else
		current++;
	
	setSourceText(current);
	
});