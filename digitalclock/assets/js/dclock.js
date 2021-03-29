alert("Welcome to our 24 hour digital clock");
time=prompt("Enter time in hh:mm:ss format(24hour clock)");

hr=document.querySelector('#hr')
min=document.querySelector('#min')
sec=document.querySelector('#sec')
hr.textContent=time[0]+time[1];
min.textContent=time[3]+time[4];
sec.textContent=time[6]+time[7]
startClock();

//Function to update seconds
function startClock(){
	setInterval(function(){
		val=parseInt(sec.textContent);
		val=val+1;
		sec.textContent=checkSeconds(val);
		console.log(val);

	},1000);
}

//Function to update minutes
function updateMinutes(){
	val=parseInt(min.textContent);
	val=val+1;
	min.textContent=checkMinutes(val);
	return ;
}

//Function to update hours
function updateHours(){
	val=parseInt(hr.textContent);
	val=val+1;
	hr.textContent=checkHours(val);
	return ;
}

//Function to check hours limit and stringing
function checkHours(val){
		if(val<10){
			return "0"+val;
		}
		else if(val==24){
			return "00";
		}
		else{
			return val;
		}
}

//Function to check minutes limit and stringing
function checkMinutes(val){
		if(val<10){
			return "0"+val;
		}
		else if(val==60){
			updateHours();
			return "00";
		}
		else{
			return val;
		}
}


//Function to check seconds limit and stringing
function checkSeconds(val){
		if(val<10){
			return "0"+val;
		}
		else if(val==60){
			updateMinutes();
			return "00";
		}
		else{
			return val;
		}
}