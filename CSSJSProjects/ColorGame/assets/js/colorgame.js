
squares=document.querySelectorAll(".square");
scolor=document.querySelector("#scolor");

tof=document.querySelector("#tof");

init();

function init()
{
colors=makeColors(6);
pickedColor=pickColor();
scolor.textContent=pickedColor;
tof.textContent=""
//Setting colors to the squares
for (var i = 0;i<squares.length; i++) {
	squares[i].style.background=colors[i];
	squares[i].style.display="block";
}

}


for (var i = 0;i<squares.length; i++) {
	squares[i].addEventListener("click",function(){
		clickedColor=this.style.backgroundColor;
		check(clickedColor);
		this.style.display="none";
	});
}
//Make a random Color
function CreateColor()
{
	r=Math.floor((Math.random() * 256) + 0);
	g=Math.floor((Math.random() * 256) + 0);
	b=Math.floor((Math.random() * 256) + 0);
	return "rgb("+r+", "+g+", "+b+")"
}

//Make a list of random Colors
function makeColors(n){
	a=[]
	for (var i =0;i<n;i++) {
		a.push(CreateColor());
			}
	return a;
}

//Pick Color from randomized colors
function pickColor(){
	return colors[Math.floor((Math.random() *6) + 0)];
}

//Check if picked color is correct
function check(c){
	(c===pickedColor)?tof.textContent="CORRECT":tof.textContent="TRY AGAIN";
}