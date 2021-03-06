// set global vars

var data;
var leaf;
var url = window.location.href;

var urlParams = new URLSearchParams(window.location.search);
var myParam = urlParams.get('leaf');
var leaf = myParam || 0;

// check for leaf query string
// if (url.indexOf("leaf") > -1) {
//   leaf = url.substring(url.indexOf("=") + 1);
// }
// else {
//   leaf = 0;
// }

// get and parse json data
(function getData() {

  var request = new XMLHttpRequest();
  request.open('GET', 'json/sizes.json', true);
  console.log("run");

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // success!
      data = JSON.parse(request.responseText);
      // console.log(data.a0.width);
      console.log("success");
      buildIframes();
    } else {
      // error msg from server
      console.log("fail");
    }
  }

  request.onerror = function() {
    // there was a connection error of some sort
  }

  request.send();

}());

// build iframes
function buildIframes() {

	var i = 0;
	var count = Object.keys(data).length;
	var iframe = "<iframe src'=ad.html' width='' height=''></iframe>";

	for (i = 0; i < count; i++) {

		x = "a" + i;
		console.log(data[x].width);
    console.log(i);

		document.querySelector("body").appendChild(document.createElement('iframe'));
		document.querySelectorAll("iframe")[i].setAttribute("src", "ad.html?leaf=" + leaf);
		document.querySelectorAll("iframe")[i].setAttribute("width", data[x].width);
		document.querySelectorAll("iframe")[i].setAttribute("height", data[x].height);
		document.querySelectorAll("iframe")[i].setAttribute("frameborder", 0);
    document.querySelectorAll("iframe")[i].setAttribute("scrolling", "no");
    document.querySelectorAll("iframe")[i].style.transitionDelay = 1.5 + i/6 + "s";
    document.querySelectorAll("iframe")[i].style.opacity = "1";
	}

}
