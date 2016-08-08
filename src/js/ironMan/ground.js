/**
 * Created by pierre on 28/01/15.
 */
var grassTex = THREE.ImageUtils.loadTexture('img/grass.png');
grassTex.wrapS = THREE.RepeatWrapping;
grassTex.wrapT = THREE.RepeatWrapping;
grassTex.repeat.x = 256;
grassTex.repeat.y = 256;
var groundMat = new THREE.MeshBasicMaterial({map:grassTex});
var groundGeo = new THREE.PlaneGeometry(400,400);
var ground = new THREE.Mesh(groundGeo,groundMat);
ground.position.y = -1.9; //lower it
ground.rotation.x = -Math.PI/2;
ground.doubleSided = true;
scene.add(ground);