window.onload = function()
{  
    var canvas = document.getElementById('mon_canvas');
    if(!canvas)
    {
        alert("Impossible de récupérer le canvas");
        return;
    }
    var context = canvas.getContext('2d');
    if(!context)
    {
        alert("Impossible de récupérer le context du canvas");
        return;
    }
//variable pour définir les dimensions du canvas
    canvas.width = 800;
    canvas.height = 400;

//variable pour dessiner cercle
    var rayon = 10;
    var xPos = 100;
    var yPos = 100;

//variable pour modier la position
    var xSpeed = 1;
    var ySpeed = 1;

//variable pour inverser la taille d'une balle
    var inverseSize = 1;
    
//pour les rebonds
    var nbBound = document.getElementById('nb');
    var nb = 0;

//--------------------------------------------------------------------------
/*
    var xPosMouse, yPosMouse;
    document.addEventListener('mousemove', function(e) { 
      xPosMouse =  e.clientX;
      yPosMouse =  e.clientY;
      var x = document.getElementById('s_x');
      var y = document.getElementById('s_y');
      x.innerHTML = "Position X : " + xPosMouse;
      y.innerHTML = "Position Y : " + yPosMouse;
    });
*/
//--------------------------------------------------------------------------

//pour les couleurs
    var i_color = 0;
    var color = ["Black","Green","Yellow","Blue","White","Red","Orange","#00aaff"];
 
//variable pour récupérer les éléments 'couleur', 'rayon' et 'valid'   
    var getSpeed = document.getElementById('valid');
    var getColor = document.getElementById('couleur');
    var getRadius = document.getElementById('rayon');
 
 //executer la fonction animate en continu
    setInterval(animate, 1);

    function animate()
    {



//modifie la vitesse
      getSpeed.onclick  = function()
      {
        var newSpeed = parseFloat(document.getElementById('speed').value);
        if (isNaN(newSpeed)) 
        {
          return;
        }
        xSpeed *= newSpeed;
        ySpeed *= newSpeed;
      };


//modifie le rayon
      getRadius.onclick = function()
      {
        if (rayon > 60 || rayon < 10) inverseSize *= -1;
        rayon = rayon + inverseSize*2;
      }


//modifie la couleur
      getColor.onclick = function() {
        i_color++;
        if (i_color > 7) i_color =0;
      }



//dessin dans le canvas
//    	context.clearRect(0,0,canvas.width, canvas.height);
      context.beginPath();
      context.strokeStyle = 'Black';
      context.fillStyle = color[i_color];
      context.strokeRect(10,10,canvas.width - 20, canvas.height - 20);
      context.arc(xPos,yPos, rayon,0,Math.PI*2);
      context.fill();
      context.closePath();



//rebonds
    if (xPos >= canvas.width - rayon - 10 || xPos <= rayon + 10) 
		{
			xSpeed *= -1;
			nb++;

		}
		if (yPos >= canvas.height - rayon - 10 || yPos <= rayon + 10)
      
		{
			ySpeed *= -1;
			nb++;
		}

//fait bouger la balle
		xPos += xSpeed;
		yPos += ySpeed;

//affiche le nombre de rebonds
		nbBound.innerHTML = "Nombre de rebonds : " + nb;
    }
}
