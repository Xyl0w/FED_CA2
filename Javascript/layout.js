// Type writer effect and typing function

// el being the reference to an element
//toRotate boundary case when the words need to be removed/appeneded

//Period for the creation of the text

var TxtType = function(el, toRotate, period) {
	this.toRotate = toRotate; //when the word is fully printed out
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
};

//main logic of program
TxtType.prototype.tick = function() {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];
	// allows for the text to be deleted or formed

	if (this.isDeleting) {
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}


	this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

	var that = this;
	var delta = 200 - Math.random() * 100; //check the tick speed

	if (this.isDeleting) {
		delta /= 2;
	}

	/*flag for when the text needs to be deleted*/
	if (!this.isDeleting && this.txt === fullTxt) {
		delta = this.period;
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		this.loopNum++;
		delta = 500;
	}

	setTimeout(function() {
		that.tick();
	}, delta);
};

//auto start typewrite and spacing period for increment of letters by calling function()
window.onload = function() {
	var elements = document.getElementsByClassName('typewrite');
	for (var i = 0; i < elements.length; i++) {
		var toRotate = elements[i].getAttribute('data-type');
		var period = elements[i].getAttribute('data-period');
		if (toRotate) {
			new TxtType(elements[i], JSON.parse(toRotate), period);
		}
	}
	// INJECT CSS
	var css = document.createElement("style");
	css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}"; //for the l at the end 
	document.body.appendChild(css);
};


//function to do pop up 
function display_knowledge(ID) {
	var x = document.getElementById(ID);
	if (x.style.display == "block") {
		x.style.display = "none";
	} else {
		x.style.display = "block";
	}
}

//for the pictures to appear with button presses, filter function
filterSelection("all"); // Execute the function and show all columns
function filterSelection(c) {
	var x, i;
	x = document.getElementsByClassName("column");
	if (c == "all") c = "";
	// Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
	for (i = 0; i < x.length; i++) {
		RemoveClass(x[i], "shown");
		if (x[i].className.indexOf(c) > -1) AddClass(x[i], "shown");
	}
}

// Show filtered elements
function AddClass(element, name) {
	var i, arr1, arr2;
	arr1 = element.className.split(" ");
	arr2 = name.split(" ");
	for (i = 0; i < arr2.length; i++) {
		if (arr1.indexOf(arr2[i]) == -1) {
			element.className += " " + arr2[i];
		}
	}
}

// Hide elements that are not selected
function RemoveClass(element, name) {
	var i, arr1, arr2;
	arr1 = element.className.split(" ");
	arr2 = name.split(" ");
	for (i = 0; i < arr2.length; i++) {
		while (arr1.indexOf(arr2[i]) > -1) {
			arr1.splice(arr1.indexOf(arr2[i]), 1);
		}
	}
	element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = document.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function() {
		var current = document.getElementsByClassName("active");
		current[0].className = current[0].className.replace("active", "");
		this.className += " active";
	});
}


function myFunction(dot, text, btext) {
	var dots = document.getElementById(dot);
	var moreText = document.getElementById(text);
	var btnText = document.getElementById(btext);

	if (dots.style.display === "none") {
		dots.style.display = "inline";
		btnText.innerHTML = "Read more";
		moreText.style.display = "none";

	} else {
		dots.style.display = "none";
		btnText.innerHTML = "Read less";
		moreText.style.display = "inline";
	}
}


function Success() {
	alert("Success! Form Delivered.");
}	

function flag(validate) {	
	// Get the value of the input field with id="numb"
	let x = document.getElementById(validate).value;
	// If x is Not a Number or less than one or greater than 10
	let text;
	if (isNaN(x)) {
	  text = "Input not valid";
	} else {
	  text = "Input OK";
	}
	document.getElementById("recommend").innerHTML = text;
  }