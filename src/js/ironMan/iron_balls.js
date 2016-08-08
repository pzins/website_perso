/**
 * Created by pierre on 28/01/15.
 */
var COEFF_X = 30;
var COEFF_Y = 17;
var COEFF_Z = 30;
var NB = 10;
var RADIUS = 1;

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

var xPos, yPos;
var sphere = [];
for (var i = 0; i < NB; ++i)
{
    sphere[i] = initialize();
}
