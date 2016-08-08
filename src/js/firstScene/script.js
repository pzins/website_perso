var scene = new THREE.Scene(); 

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth /
				window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight ); 

var coeff = 0.1;
var test = 1;
document.onwheel = function(event){
	console.log(event.wheelDelta);
	sphere.scale.set(test-coeff,test-coeff,test-coeff);
	test = test-coeff;
}



var xPosMouse, yPosMouse;
    document.addEventListener('mousemove', function(e) { 
      xPosMouse =  e.clientX;
      yPosMouse =  e.clientY;

    });

document.onclick = function(event)
{
	ite++;
		console.log(sphere.material.map);

	console.log(ite);
	if (ite > 6) ite = 0;

	sphere.material.map = THREE.ImageUtils.loadTexture( text[ite] );
	sphere.material.needsUpdate = true;
	sphere.lookAt(new THREE.Vector3( 0, 0, 0 ));
	//cube.clone();
	//cube.visible = !cube.visible;

};
 document.addEventListener( 'mousedown', onDocumentMouseDown, false );

var text = ['img/metal.jpg',
			'img/1.jpg',
			'img/2.jpeg',
			'img/3.png',
			'img/4.jpg',
			'img/5.jpg',
			'img/6.jpg',];

var ite = 0;


function onDocumentMouseDown( event ) {                
                                           //z
var coords = new THREE.Vector2();
var raycaster = new THREE.Raycaster();


coords.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
coords.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;

}


document.body.appendChild( renderer.domElement );


var geometry = new THREE.BoxGeometry(1,1,1);
var material = new THREE.MeshBasicMaterial( {color: 0x00ffff});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 25;


var curve = new THREE.EllipseCurve(0,0,10,10,0,Math.PI, false);
var path = new THREE.Path(curve.getPoints(5000));
path.moveTo(-1, 2);
for (var i =0; i <= 100; ++i)
{
	path.curves[i] += 50;
}
var geo = path.createPointsGeometry(5000);
var mat = new THREE.LineBasicMaterial({color: 0xff0000});

var ellipse = new THREE.Line(geo, mat);
scene.add(ellipse);

var curve = new THREE.SplineCurve3( [ 
new THREE.Vector3( -10, 0, 10 ), 
new THREE.Vector3( -5, 5, 5 ), 
new THREE.Vector3( 0, 0, 0 ), 
new THREE.Vector3( 5, -5, 5 ), 
new THREE.Vector3( 10, 0, 10 ) ] ); 
var geometry = new THREE.Geometry(); 																																																	
geometry.vertices = curve.getPoints( 50 ); 


var material = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture(text[ite]), overdraw: true } );
var splineObject = new THREE.Line( geometry, material );
scene.add(splineObject);

																																		
var radius = 5;
var segments = 20;
var rings = 20;
var sphere = new THREE.Mesh(
	new THREE.SphereGeometry(																												
		radius,segments,rings),
		material);
sphere.position.set(0,10,0);
sphere.scale.set(2,2,2);																																								
sphere.matrixAutoUpdate = true
scene.add(sphere);	


var threshold = 10;
var t = 0.1;
sphere.material.needsUpdate = true;


scene.fog = new THREE.FogExp2( 0x2277dd, 0.01 );

var dir = new THREE.Vector3( 0, 0, 0 );
var origin = new THREE.Vector3( -15,0,0);

var length = 10;
var arrow = new THREE.ArrowHelper(dir,origin, length, 0xffffff);
scene.add(arrow);


var map = THREE.ImageUtils.loadTexture( "1.jpg" ); 
var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true } );
var sprite = new THREE.Sprite( material ); 
sprite.position.set(-5,0,0);
scene.add( sprite );





function render() 
{ 
	requestAnimationFrame( render ); 
	

	renderer.render( scene, camera ); 
	cube.rotation.x +=0.1;
	cube.rotation.y +=0.1;
	
	//camera.rotation.y += 0.01;

	//cube.position.set(cube.position.x,cube.position.y,cube.position.z+0.1);
	sphere.rotation.x += 0.01;
	//sphere.rotation.z += 0.01;
	/**console.log('xPos : ', xPosMouse-window.innerWidth/2);
	console.log('yPos : ', yPosMouse-window.innerHeight/2);**/
	sphere.position.set( (xPosMouse / window.innerWidth ) * 2 - 1, -( yPosMouse / window.innerHeight ) * 2 + 1, 0.5);
	//sphere.translateX(t);
	//if (sphere.position.x > 5 || sphere.position.x < -5) t *= -1;

} 
render();