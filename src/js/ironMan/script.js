/**
 * Created by pierre on 28/01/15.
 */


controls = new THREE.OrbitControls( camera );

//JSON loader
//var animate;
//var loader = new THREE.JSONLoader();
//loader.load('js/ironMan/iron.js', function (geometry, materials) {
//    var mesh, material;
//    material = new THREE.MeshFaceMaterial(materials);
//    mesh = new THREE.Mesh(geometry, material);
//
//    mesh.scale.set(1, 1, 1);
//    mesh.receiveShadow = true;
//    mesh.castShadow = true;
//    mesh.position.y += 1.5;
//    scene.add(mesh);
//    animate(mesh);
//});


var loader = new THREE.ColladaLoader();
loader.options.convertUpAxis = true;
loader.load( 'js/ironMan/iron.dae', function ( collada ) {
    var dae = collada.scene;
    var skin = collada.skins[ 0 ];
    dae.position.set(0,0,0);
    dae.scale.set(1,1,1);
    dae.position.y += 1.3;
    scene.add(dae);
    animate(dae);

});
camera.rotation.x -= Math.PI / 2;


var geo = new THREE.SphereGeometry(RADIUS, 20, 20);
var mat = new THREE.MeshBasicMaterial({color: 0xaa0000});
var sphere = new THREE.Mesh(geo, mat);
sphere.position.set(0.1,10,0);
scene.add(sphere);




function animate(m)
{
    document.addEventListener('keydown', function(e){
        switch (e.keyCode) {
            case 97:
                m.position.x += 1;
                break;
            case 98:
                m.position.z -= 1;
                break;
            case 99:
                m.position.x -= 1;
                break;
            case 101:
                m.position.z += 1;
                break;
        }

    });


var speed = -0.1;
var threshold = sphere.position.y;
var ini = speed;
var base = 5.2 + RADIUS / 2;

var dec_x = 0;

function rebond() {
    if (threshold > 1) {
        sphere.position.y += speed;
        speed -= 0.002;
        if (sphere.position.y <= base) {
            speed = ini * (-1);
            threshold -= 1.5;
        }
        if (sphere.position.y >= threshold) {
            speed = ini;
        }
    }
}


function rebond2()
{
    var x_ = sphere.position.x;
    var z_ = sphere.position.z;
    sphere.position.y += speed;
    if (dec_x == 1) sphere.position.x += 0.01;
    else if (dec_x == 2) sphere.position.x -= 0.01;
    if (sphere.position.y <= base)
    {
        console.log(x_ - m.position.x);
        if ((x_ - m.position.x) < 2 && (x_ - m.position.x) > 0) dec_x = 1;
        else if ((x_ - m.position.x) > -2 && (x_ - m.position.x) < 0) dec_x = 2;
        speed = speed * (-1);
    }
    if (sphere.position.y >= threshold) {
        speed *= -1;
    }

}






function render()
{
    rebond2();
    camera.lookAt(m.position);
    //controls.update(SPEED_MOVE);
    requestAnimationFrame( render );
    renderer.render( scene, camera );
}
render();


}

