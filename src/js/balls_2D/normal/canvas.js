window.onload = function()
{
	var canvas = document.getElementById('mon_canvas');
	if(!canvas)
	{
		alert("Imossible de récup le canvas");
		return;
	}
	var context = canvas.getContext('2d');
	if(!context)
	{
		alert("Impossible de récupérer le context");
		return;
	}

	var rayon = 10;
	var inverse = 1;

	canvas.width = 800;
	canvas.height = 400;

	var xPos = 100;
	var yPos = 100;

	var xSpeed = 1;
	var ySpeed = 1;
	var nbBound = 0;

  var rebond = document.getElementById('nb');

  var tab = ["Blue","White","Red","Black"];
  var i = 0;
  var getColor = document.getElementById('couleur');
  var getRadius = document.getElementById('rayon');
  var getSpeed = document.getElementById('valid');

	setInterval(animate, 1);

	function animate() {


		getSpeed.onclick = function() {
			var newSpeed = parseFloat(document.getElementById('speed').value);
			if (isNaN(newSpeed)) return;
			xSpeed *= newSpeed;
			ySpeed *= newSpeed;
		}



		getRadius.onclick = function() {

			if (rayon > 60 || rayon < 10) inverse *= -1;
			rayon += 2 * inverse;
		}



	getColor.onclick = function() {
		i++;
		if (i > 3) i = 0;
	}




	context.clearRect(0,0,canvas.width,canvas.height);
	context.beginPath();
	context.strokeStyle = 'Black';
	context.fillStyle = tab[i];
	context.strokeRect(10,10,canvas.width - 20, canvas.height - 20);
	context.arc(xPos, yPos, rayon, 0,Math.PI * 2);
	context.fill();
	context.closePath();


	if (xPos >= canvas.width - rayon - 10 || xPos <= rayon + 10)
	{
		xSpeed *= -1;
		nbBound++;
	}

	if (yPos >= canvas.height - rayon - 10 || yPos <= rayon + 10)
	{
		nbBound++;
		ySpeed *= -1;
	}

	xPos += xSpeed;
	yPos += ySpeed;


	rebond.innerHTML = "Rebonds : " + nbBound;

}







}