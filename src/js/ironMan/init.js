var BGCOL = 0x000000;
var POS = 25;
var SPEED_MOVE = 0.05;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth /
window.innerHeight, 0.1, 1000 );
//camera.position.z = POS;
camera.position.y = POS;
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );
renderer.setClearColor(BGCOL, 0);


// soft white light
var light = new THREE.AmbientLight( 0x0000ff );
scene.add( light );

var light = new THREE.PointLight(0xffffff);
light.position.set(-100,200,100);
scene.add(light);


var geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
var material = new THREE.MeshBasicMaterial( {color: 0x00ffff});
var cube = new THREE.Mesh(geometry, material);
cube.position.set(0,4.7,0);
scene.add(cube);

