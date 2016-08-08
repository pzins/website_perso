window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function collision(x1, y1, x2, y2, r) {
    if (Math.abs(x1 - x2) <= 2*r && Math.abs(y1 - y2) <= 2*r){
        return true;
    }
    else {
        return false;
    }
}

function Ball(x_, y_, xspeed_, yspeed_){
    this.x = x_;
    this.y = y_;
    this.xspeed = xspeed_;
    this.yspeed = yspeed_;
    

    this.move = function(){
        this.x += this.xspeed;
        this.y += this.yspeed;
    }
}

function Game(speed_, rayon_){
    this.balls = [];
    this.speed = speed_;
    this.rayon = rayon_;
}


function Clock(seconde, minute){
    this.s = seconde;
    this.m = minute;
}


function myTimer(clk) {
    if (inGame)
    {
        ++clk.s;
        if (clk.s == 60)
        {
            clk.s = 0;
            clk.m++;
        }
    document.getElementById("chronometre").innerHTML = clk.m.toString() + " min " + clk.s.toString() + " s."; 
    }
}

            var gameOver = false;
            var counter = 0;
            var inGame = true;
            var xPosMouse, yPosMouse;
            var c = new Clock(0,0);


window.onload = function() {
            var start = document.getElementById('button');
            start.onclick = function() {
            var myVar = setInterval(function(){myTimer(c)}, 1000);
            var game = new Game(5, 17);
            var tempBall = new Ball(40, 40, game.speed * Math.random(), game.speed * Math.random(), game.rayon);
            game.balls.push(tempBall);

            var canvas  = document.getElementById('mon_canvas');
            var context = canvas.getContext('2d');
            canvas.width = 800;
            canvas.height = 500;


            
            canvas.addEventListener("mousemove", function(e) {
                xPosMouse = e.clientX - this.offsetLeft;
                yPosMouse = e.clientY - this.offsetTop;
                if (xPosMouse > canvas.width - game.rayon)
                {
                    xPosMouse = canvas.width - game.rayon;
                }
                if (yPosMouse > canvas.height - game.rayon)
                {
                    yPosMouse = canvas.height - game.rayon;
                } 
                if (xPosMouse < game.rayon)
                {
                    xPosMouse = game.rayon;
                }
                if (yPosMouse < game.rayon)
                {
                    yPosMouse = game.rayon;
               }
            });
                console.log(xPosMouse + "  " + yPosMouse);

                draw(game, game.speed);
            
    }
};
		
	function draw(game_ , speed_) {
            var canvas  = document.getElementById('mon_canvas');
            var context = canvas.getContext('2d');
            if (!gameOver)
            {
                if (counter > 200)
                {
                    var tempBall = new Ball(40, 40, game_.speed * Math.random(), game_.speed * Math.random(), game_.rayon);
                    game_.balls.push(tempBall);  
                    counter = 0;
                }
                counter++;
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.strokeRect(0, 0, canvas.width, canvas.height);
                context.beginPath();
                context.arc(xPosMouse, yPosMouse, game_.rayon, 0, Math.PI*2);
                context.fillStyle = 'Red';      
                context.lineWidth = 4;
                context.strokeStyle = 'Black';
                context.stroke();  
                context.fill();
                context.closePath();
                for (var it = 0; it < game_.balls.length; it++)
                {
                    context.beginPath();
                    context.arc(game_.balls[it].x,game_.balls[it].y, game_.rayon, 0, Math.PI*2);
                    context.fillStyle = 'Yellow';
                    context.lineWidth = 4;
                    context.strokeStyle = 'Black';
                    context.stroke();
                    context.fill();
                    context.closePath();

                    game_.balls[it].move();
                }

                var temp1, temp2;

                for (var i = 0; i < game_.balls.length; ++i)
                {
                    for (var j = i+1; j < game_.balls.length; ++j)
                    {
                        if (collision(game_.balls[i].x, game_.balls[i].y,game_.balls[j].x, game_.balls[j].y, game_.rayon))
                        {

/*                            var deltaX = game_.balls[j].x - game_.balls[i].x;
                            var deltaY = game_.balls[j].y - game_.balls[i].y;
                            var diffAngle = Math.atan(deltaY / deltaX);

                            var deltaSpeedJ = Math.sqrt(game_.balls[j].xspeed * game_.balls[j].xspeed + game_.balls[j].yspeed * game_.balls[j].yspeed);
                            var deltaSpeedI = Math.sqrt(game_.balls[i].xspeed * game_.balls[i].xspeed + game_.balls[i].yspeed * game_.balls[i].yspeed);

                            var delta = (deltaX * game_.balls[j].xspeed + deltaY * game_.balls[j].yspeed) / 
                            (Math.sqrt(deltaY * deltaY + deltaX * deltaX) + deltaSpeedJ);   

                            var delta2 = (deltaX * game_.balls[i].xspeed + deltaY * game_.balls[i].yspeed) / 
                            (Math.sqrt(deltaY * deltaY + deltaX * deltaX) + deltaSpeedI);
                            



                            var newX = deltaSpeedJ * Math.cos(((90 - delta) * Math.PI / 90) - diffAngle);
                            var newY = deltaSpeedJ * Math.sin(((90 - delta) * Math.PI / 90) - diffAngle);

                            var newX2 = deltaSpeedI * Math.cos(((90 - delta2) * Math.PI / 90) - diffAngle);
                            var newY2 = deltaSpeedI * Math.sin(((90 - delta2) * Math.PI / 90) - diffAngle);

                            game_.balls[j].xspeed = newX;
                            game_.balls[j].yspeed = newY;                           
                            game_.balls[i].xspeed = newX2;
                            game_.balls[i].yspeed = newY2;*/
                            








                            temp1 = game_.balls[i].xspeed;
                            temp2 = game_.balls[i].yspeed;

                            game_.balls[i].xspeed = game_.balls[j].xspeed;
                            game_.balls[i].yspeed = game_.balls[j].yspeed;
                            game_.balls[j].xspeed = temp1;
                            game_.balls[j].yspeed = temp2;


                        } 
                    
                    }
                }

                for (var it = 0; it < game_.balls.length; ++it)
                {
                    if (game_.balls[it].x >= canvas.width - game_.rayon || game_.balls[it].x <= game_.rayon)
                    {
                        game_.balls[it].xspeed *= -1;
                    }
                    if (game_.balls[it].y >= canvas.height - game_.rayon || game_.balls[it].y <= game_.rayon)
                    {
                        game_.balls[it].yspeed *= -1;
                    }    
                }             
            }
            for (var ite = 0; ite < game_.balls.length; ++ite)
            {
              if (Math.abs(xPosMouse - game_.balls[ite].x) < game_.rayon * 1.7 && Math.abs(yPosMouse - game_.balls[ite].y) < game_.rayon * 1.7)
                {    
            
                        result.innerHTML = "You Lose";
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        ingame = false;
                        document.getElementById('nb_balls').innerHTML = game_.balls.length.toString() + " balls.";  
                        gameOver = true;
                        var restart = document.getElementById('button');
                        game_.balls = [];
                        restart.onclick = function(){
                            gameOver = false;
                            ingame = true;
                            c.s = -1;
                            c.m = 0;
                            result.innerHTML ="";
                            document.getElementById('nb_balls').innerHTML = "";
                        };
                    
                }
                         
            }

            context.font = "55pt Calibri,Geneva,Arial";
            context.fillStyle = "#ffffff";
            context.fillText(game_.balls.length.toString(), canvas.width - 80, canvas.height - 10);   
            
               
        window.requestAnimationFrame(function() { draw(game_, speed_) });    
        }

