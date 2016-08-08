/**
 * Created by pierre on 24/01/15.
 */

var NB = 1000;
var RADIUS = 1;
var POS = 50;
var BGCOL = 0x000000;
var SPEED_ROT = 0.05;
var SPEED_Z = 0.5;

//ball creation area
var COEFF_X = 30;
var COEFF_Y = 17;
var COEFF_Z = 30;
var BOX_TEXTURE = "img/space.jpg";

var SENSIBILITY_MOUSE_ROT = 30;
var SP_MOUSE_ROT = 0.05;

//Speed move with First Person Controls; Change the update
var SPEED_MOVE = 0.05;


/**
 * random colors generator
 * @returns {string}
 */
function generateColor() {
    var green = Math.floor(Math.random()*255);
    var red = Math.floor(Math.random()*255);
    var blue = Math.floor(Math.random()*255);
    return color = '0x'+red.toString(16)+green.toString(16)+blue.toString(16);
}

/**
 * scene & camera
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth /
window.innerHeight, 0.1, 1000 );
camera.position.z = POS;
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth-15, window.innerHeight -17);
renderer.setClearColor(BGCOL, 0);

//add to the document
document.body.appendChild( renderer.domElement );

function initBox()
{
    var urls = [BOX_TEXTURE,BOX_TEXTURE,BOX_TEXTURE,BOX_TEXTURE,BOX_TEXTURE,BOX_TEXTURE,];
    var textureCube = THREE.ImageUtils.loadTextureCube( urls, THREE.CubeRefractionMapping );
    var shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].value = textureCube;
    var material = new THREE.ShaderMaterial( {

        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        depthWrite: false,
        side: THREE.BackSide

    } );
    var mesh = new THREE.Mesh( new THREE.BoxGeometry( 1000,1000, 1000 ), material );
    scene.add( mesh );
}

/**
 * create a ball with random color
 * @returns {THREE.Mesh}
 */
function initialize() {
    var mat = new THREE.MeshBasicMaterial( {color: parseInt(generateColor())});

    mat.opacity = 0.8;
    mat.transparent = true;

    mat.alphaTest = 0.5;
    mat.shading = 10;
    var rings = 10;
    var segments = 10;
    var geo = new THREE.SphereGeometry(RADIUS, segments, rings);
    var sphere = new THREE.Mesh(geo, mat);
    var nb = [];
    for(var i = 0; i < 3; ++i)
    {
        var tmp = Math.random();
        var signe = 1;
        if (tmp > 0.5) signe *= -1;
        var coeff;
        switch (i)
        {
            case 0 : coeff = COEFF_X;break;
            case 1 : coeff = COEFF_Y;break;
            case 2 : coeff = COEFF_Z;break;
        }
        nb[i] = Math.random()*coeff*signe;
    }
    sphere.position.set(nb[0], nb[1], nb[2]);
    sphere.scale.set(1, 1, 1);
    scene.add(sphere);
    return sphere;
}




/**
 * mousemove handler
 */
document.addEventListener('mousemove', function(e){
    //xPos = e.clientX - 0.5* window.innerWidth;
    //yPos = 0.5 * window.innerHeight - e.clientY;
    //xPos = e.clientX;
   // yPos = e.clientY;
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = -( e.clientY / window.innerHeight ) * 2 + 1;
    collisionMouse();
});

document.addEventListener('mousedown', function(e){
    sphere[NB++] = initialize();
})

function collisionMouse(){
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children );
    if ( intersects.length > 0 ) {
        //intersects[ 0 ].object.material.color = new THREE.Color( 0xff0000 );
        intersects[0].object.material.opacity = 0;
        //intersects[0].object.position.y  += 0.1;
    }
}







/**
 * my keyboard function
 */
/*
document.addEventListener('keypress', function(e){
    switch (e.key) {
        case "Down":
            rayon *= 1.05;
            camera.position.set(rayon*Math.sin(angle), camera.position.y,rayon*Math.cos(angle) );
            break;
        case "Up":
            rayon *= 0.95;
            camera.position.set(rayon*Math.sin(angle), camera.position.y, rayon*Math.cos(angle));
            break;
        case "Left":
            checkRotation(-SPEED_ROT);
            break;
        case "Right":
            checkRotation(SPEED_ROT);
            break;
        case "Enter":
            // Do something for "enter" or "return" key press.
            break;
        case "Esc":
            // Do something for "esc" key press.
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }

});
*/

/**
 * camera rotation called with keyboard
 */
/*
 function checkRotation(rotSpeed){
 var x = camera.position.x,
 y = camera.position.y,
 z = camera.position.z;
 angle += rotSpeed;
 camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
 camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
 camera.lookAt(scene.position);
 }
 */

/**
 * my rotation camera function with mouse
 */
/*
 function rotationCamera(){
 if (yPos < SENSIBILITY_MOUSE_ROT) camera.rotation.x += SP_MOUSE_ROT
 else if (yPos > window.innerHeight - SENSIBILITY_MOUSE_ROT){
 camera.rotation.x -= SP_MOUSE_ROT;
 camera.rotation.z -= SP_MOUSE_ROT;
 }
 if (xPos < SENSIBILITY_MOUSE_ROT) camera.rotation.y += SP_MOUSE_ROT;
 else if (xPos > window.innerWidth - SENSIBILITY_MOUSE_ROT) camera.rotation.y -= SP_MOUSE_ROT;
 }*/



/**
 * global variables
 */
var xPos, yPos;
var sphere = [];
for (var i = 0; i < NB; ++i)
{
    sphere[i] = initialize();
}
initBox();

//Cube OL
var geometry = new THREE.BoxGeometry(1,1,1);
var material = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('img/ol.jpg'), overdraw: true } );
var cube = new THREE.Mesh(geometry, material);
cube.position.set(0,0,0);
scene.add(cube);

//For intersections
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

//move angle + radius
var angle = 0;
var rayon = POS;


// soft white light
var light = new THREE.AmbientLight( 0x404040 );
scene.add( light );

//Orbit controls
//controls = new THREE.OrbitControls( camera, renderer.domElement );

//First Person Controls
controls = new THREE.FirstPersonControls( camera );
controls.movementSpeed = 20; //with keyboard
controls.lookSpeed = 0.1;   //with mouse

/**
 * main loop
 */
function render()
{
    controls.update(SPEED_MOVE);
    /*
    for (var i =0; i < sphere.length; ++i)
    {
        sphere[i].rotation.x += 0.01;
        sphere[i].rotation.y += 0.01;
    }*/
    //rotationCamera();
    requestAnimationFrame( render );
    renderer.render( scene, camera );
    //checkRotation();

}
render();
