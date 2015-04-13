function capitalize(usertext){
  return usertext.toUpperCase();
}

function main(){
	var userTxt = document.getElementById("input");
	var capText = capitalize(userTxt.value);
	document.getElementById("output").innerHTML = capText;
}

var reference = document.getElementById("input");
reference.onchange = main;