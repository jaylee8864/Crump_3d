import * as THREE from '/build/three.module.js';
import Stats from './jsm/libs/stats.module.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { DragControls } from './jsm/controls/DragControls.js'

const renderer = new THREE.WebGLRenderer();

console.log(window.innerWidth);
console.log(window.innerHeight);
var canvas_height;
if(window.innerHeight > 700)
{
    if(window.innerHeight > window.innerWidth )
    {
        renderer.setSize(window.innerWidth*0.8, window.innerWidth*0.8);
        canvas_height = window.innerWidth*0.8;
        // renderer.setSize(700, 700);
        // canvas_height = 700;
    }
    else{
        renderer.setSize(window.innerHeight*0.8, window.innerHeight*0.8);
        canvas_height = window.innerHeight*0.8;
        
        // console.log("!");
        // renderer.setSize(300, 300);
        // canvas_height = 300;
    }
}
else{
    if(window.innerHeight >window.innerWidth )
    {
        renderer.setSize(window.innerWidth*1, window.innerWidth*1);
        canvas_height = window.innerWidth*1
    }
    else{

        renderer.setSize(window.innerHeight*1, window.innerHeight*1);
        canvas_height = window.innerHeight*1
    }

}
//window.innerWidth, window.innerHeight
//gltf load
const gltfUrl = new URL('../models/untitled.gltf', import.meta.url);
const loader = new GLTFLoader();

// const Imageloader = new THREE.ImageLoader();

// document.body.appendChild(renderer.domElement);
var container = document.getElementById('canvas');
container.appendChild( renderer.domElement );

const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera( );
let light = new THREE.DirectionalLight(0xffffff,1); //조명 
scene.add(light);

var camera_y = 0.75;
camera.position.set(0,camera_y,2);

camera.zoom = 1.15;
camera.updateProjectionMatrix();

const image0_url = new URL('../images/noimage.png', import.meta.url);
const image1_url = new URL('../images/exex.png', import.meta.url);
const image2_url = new URL('../images/123.png', import.meta.url);
const image3_url = new URL('../images/logo_ex.png', import.meta.url);
const image4_url = new URL('../images/crump_logo.png', import.meta.url);

// var loader_img = new THREE.ImageLoader();
// var imomg = loader_img.load(image1_url, function ( image ) {
//     console.log(imomg.height);
//     console.log(imomg.width);
//     scene_loading();
// },

// // onProgress callback currently not supported
// undefined,

// // onError callback
// function () {
//     console.error( 'An error happened.' );
// }
// );

var texture;
var geo;
var mat;
var plane;
var texture2;
var outlineMaterial;
var outlineMesh;
var dragControls;
// var dragControls1;
var nav_bar;
var delBt;
var addCrumplogoBt;
var ImageaddBt;
var dif_by_Imagesize;
var CrumpNavbar;
var CrumpNavbar_logo;
var CrumpNavbar_text;
var arrPlane = new Array(10);
var arrTex = new Array(10);
var arrMat = new Array(10);
var countaddedob = 1;
var crumplogocount = 0;
var isexistoutlinemesh = false;

scene_loading();


function scene_loading(){
    
    
    let idxzeroplaneTex = new THREE.TextureLoader().load(image0_url.href );
    let idxzeroplaneGeo = new THREE.PlaneGeometry(1, 1, 20, 1);
    let idxzeroplaneMat = new THREE.MeshBasicMaterial({ map: idxzeroplaneTex  ,transparent: true});
    let idxzeroplane = new THREE.Mesh(idxzeroplaneGeo, idxzeroplaneMat);
    arrPlane[0] = idxzeroplane;
    // texture = new THREE.TextureLoader().load(image1_url.href );
    // var numDigit_width = imomg.width.toString().length;
    // var numDigit_height = imomg.height.toString().length;
    // geo = new THREE.PlaneGeometry(1, 1, 20, 1);
    // mat = new THREE.MeshBasicMaterial({ map: texture });
    // plane = new THREE.Mesh(geo, mat);
    // dif_for_nav = 0.01 - imomg.height/10**numDigit_height;
    // scene.add(plane);
    

    // texture2 = new THREE.TextureLoader().load(image2_url.href );
    // outlineMaterial = new THREE.MeshBasicMaterial({ map: texture2, transparent: true});
    // outlineMesh = new THREE.Mesh( geo, outlineMaterial );
    // outlineMesh.name = "outlineMesh";
    // outlineMesh.scale.multiplyScalar( 1.2 );


    // // dragControls = new DragControls([plane], camera, renderer.domElement);
    // outlineMesh.position.y = 0;
    // outlineMesh.position.z = 1;
    // dragControls1 = new DragControls([outlineMesh], camera, renderer.domElement);
    // scene.add(outlineMesh);
    // plane.position.y= 1;
    // plane.position.z= 1.1;


    // var vertices = plane.geometry.attributes.position.array;
    // plane.geometry.attributes.position.needsUpdate = true;
    // plane.geometry.computeVertexNormals();
    // plane.geometry.attributes.position.needsUpdate = true;
    // for (let i = 0; i < vertices.length; i=i+3) {
    //     //a vertex' position is (vertices[i],vertices[i+1],vertices[i+2])
    //     if(vertices[i] == -0.125){
    //         console.log(i);
    //         console.log("x" + vertices[i] + " y" + vertices[i+1] + " z" +vertices[i+2] );
    //     }
    // }



    // setdragcontrol();
    // setdragcontrol_1();


    setTimeout(function(){
        
        renderer.setClearColor(0x112111,0);
        renderer.render(scene,camera);
        render();
    }, 100);

}

// plane 생성된 뒤에 array에 들어가고. 생성될 때마다 darg control 만들어주고 들어가면 

const mouse = new THREE.Vector2();
var dif_x;
var dif_y;
var dif_total =0;
var isNavBarExist = false;
var idx_plane = 1;
var first_click = false;
var btn_2 = document.getElementById("real_file");
var btn_3 = document.getElementById("real_file_2");
var front_bt = document.getElementById("front");
var back_bt = document.getElementById("back");
var submit_bt = document.getElementById("submit");
var newlogo_bt = document.getElementById("newlogo");
var isfront = true;
var del_first = true;
var isdragstart = false;

function getMousePosition(event) {
    // 화면에서 마우스 위치 받아오기
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    // console.log(mouse.x);
    // ! 항상 z 좌표라는 문제와 카메라 앵글이 변하면 x와 y좌표가 정확하지 않음
    var point = new THREE.Vector3(mouse.x, mouse.y, 0);
    point.unproject(camera);
}
document.addEventListener("mousemove", event => {
	getMousePosition(event);
});

window.addEventListener("click", function(event){
    
    setTimeout(function(){
        console.log("Executed after 1 second");
        
        render();
    }, 100);
    //if 줘야함.
    if(!first_click){
        console.log("!@");
        // console.log(first_click);
        if (scene.getObjectByName('outlineMesh'))
            console.log("!@");
            scene.remove(nav_bar);
            scene.remove(delBt);
            scene.remove(addCrumplogoBt);
            scene.remove(ImageaddBt);
            isNavBarExist = false;
            scene.remove(outlineMesh);
            isexistoutlinemesh = false;
    }
    setTimeout(function(){
        console.log("Executed after 1 second");
        render();
    }, 10);
    first_click = false;
});


function make_nav_bar(){
    //onOff
    isNavBarExist = true;

    //nav bar gen
    let navBarTex = new THREE.TextureLoader().load(image1_url.href );
    let navBarGeo = new THREE.PlaneGeometry(0.45, 0.15, 20, 1);
    let navBarMat = new THREE.MeshBasicMaterial({ map: navBarTex ,transparent: true });
    nav_bar = new THREE.Mesh(navBarGeo, navBarMat);
    

    //add navbar to scene
    scene.add(nav_bar);
    
    //set nav bar position
    if(dif_total ==0){
        if(del_first || !isdragstart )
        //dif_for_nav 는 처음 이미지 사이즈가 줄어들었을 때.
            // nav_bar.position.y = arrPlane[idx_plane].position.y - 0.3 - dif_by_Imagesize;
            nav_bar.position.y = arrPlane[idx_plane].position.y - 0.3;
        else{
            nav_bar.position.y = arrPlane[idx_plane].position.y - 0.3 ;
        }
    }
    else{
        if(del_first || !isdragstart )
            nav_bar.position.y = arrPlane[idx_plane].position.y - dif_total - dif_by_Imagesize;
        else{
            nav_bar.position.y = arrPlane[idx_plane].position.y - dif_total;
        }
    }

    

    nav_bar.position.x = arrPlane[idx_plane].position.x;
    nav_bar.position.z = arrPlane[idx_plane].position.z;

    makeDelBt();
    makeImageaddBt();
    makeaddCrumplogoBt();

    //add drag event
    // let navBardragControls = new DragControls([nav_bar], camera, renderer.domElement);
    // navBardragControls.addEventListener('dragstart', (event) => {
    //     btn_2.click();
    //   });
}

function makeCrumpNavbar()
{
    let CrumpNavbarTex = new THREE.TextureLoader().load(image1_url.href );
    let CrumpNavbarGeo = new THREE.PlaneGeometry(1, 0.5, 20, 1);
    let CrumpNavbarMat = new THREE.MeshBasicMaterial({ map: CrumpNavbarTex ,transparent: true});
    CrumpNavbar = new THREE.Mesh(CrumpNavbarGeo, CrumpNavbarMat);
    CrumpNavbar.position.y = 0;
    CrumpNavbar.position.z = nav_bar.position.z +0.01;

    //text
    let CrumpNavbar_textTex = new THREE.TextureLoader().load(image4_url.href );
    let CrumpNavbar_textGeo = new THREE.PlaneGeometry(0.1, 0.1, 20, 1);
    let CrumpNavbar_textMat = new THREE.MeshBasicMaterial({ map: CrumpNavbar_textTex,transparent: true });
    CrumpNavbar_text = new THREE.Mesh(CrumpNavbar_textGeo, CrumpNavbar_textMat);
    CrumpNavbar_text.position.x = -0.45;
    CrumpNavbar_text.position.y = 0.2;
    CrumpNavbar_text.position.z = nav_bar.position.z +0.01;

    //logo
    let CrumpNavbar_logoTex = new THREE.TextureLoader().load(image4_url.href );
    let CrumpNavbar_logoGeo = new THREE.PlaneGeometry(0.3, 0.3, 20, 1);
    let CrumpNavbar_logoMat = new THREE.MeshBasicMaterial({ map: CrumpNavbar_logoTex,transparent: true });
    CrumpNavbar_logo = new THREE.Mesh(CrumpNavbar_logoGeo, CrumpNavbar_logoMat);
    CrumpNavbar_logo.position.y = 0
    CrumpNavbar_logo.position.z = nav_bar.position.z +0.01;
    
    scene.add(CrumpNavbar);
    scene.add(CrumpNavbar_text);
    scene.add(CrumpNavbar_logo);
    
    let CrumpNavbar_logodragControls = new DragControls([CrumpNavbar_logo], camera, renderer.domElement);
    CrumpNavbar_logodragControls.addEventListener('dragstart', (event) => {
        //여기 새로이 생성되는 것

        crumplogocount += 1;
        arrPlane[idx_plane].material = CrumpNavbar_logoMat;
        arrTex[idx_plane].needsUpdate = true;
        scene.remove(CrumpNavbar);
        scene.remove(CrumpNavbar_text);
        scene.remove(CrumpNavbar_logo);
      });




}
function makeDelBt(){
    let delBtTex = new THREE.TextureLoader().load(image3_url.href );
    let delBtGeo = new THREE.PlaneGeometry(0.1, 0.1, 20, 1);
    let delBtMat = new THREE.MeshBasicMaterial({ map: delBtTex,transparent: true });
    delBt = new THREE.Mesh(delBtGeo, delBtMat);
    scene.add(delBt);
    
    
    if(del_first)
        delBt.position.x += 0.15;
        del_first = false;
    delBt.position.y = nav_bar.position.y;
    delBt.position.z = nav_bar.position.z;

    let delBtdragControls = new DragControls([delBt], camera, renderer.domElement);
    delBtdragControls.addEventListener('dragstart', (event) => {
        arrPlane[idx_plane].material = arrPlane[0].material;
        arrTex[idx_plane].needsUpdate = true;
        if(arrPlane[idx_plane].name == "crump"){
            crumplogocount -=1;
        }
      });
}
function makeaddCrumplogoBt(){
    let addCrumplogoBTTex = new THREE.TextureLoader().load(image3_url.href );
    let addCrumplogoBtGeo = new THREE.PlaneGeometry(0.1, 0.1, 20, 1);
    let addCrumplogoBtMat = new THREE.MeshBasicMaterial({ map: addCrumplogoBTTex  ,transparent: true});
    addCrumplogoBt = new THREE.Mesh(addCrumplogoBtGeo, addCrumplogoBtMat);
    scene.add(addCrumplogoBt);
    
    addCrumplogoBt.position.y = nav_bar.position.y;
    addCrumplogoBt.position.z = nav_bar.position.z;

    let addCrumplogoBtdragControls = new DragControls([addCrumplogoBt], camera, renderer.domElement);
    addCrumplogoBtdragControls.addEventListener('dragstart', (event) => {
        makeCrumpNavbar();
      });
}
function makeImageaddBt(){
    let ImageaddBtTex = new THREE.TextureLoader().load(image3_url.href );
    let ImageaddBtGeo = new THREE.PlaneGeometry(0.1, 0.1, 20, 1);
    let ImageaddBtMat = new THREE.MeshBasicMaterial({ map: ImageaddBtTex ,transparent: true });
    ImageaddBt = new THREE.Mesh(ImageaddBtGeo, ImageaddBtMat);
    scene.add(ImageaddBt);
    
    
    if(del_first)
        ImageaddBt.position.x -= 0.15;
        del_first = false;
    ImageaddBt.position.y = nav_bar.position.y;
    ImageaddBt.position.z = nav_bar.position.z;

    let ImageaddBtdragControls = new DragControls([ImageaddBt], camera, renderer.domElement);
    ImageaddBtdragControls.addEventListener('dragstart', (event) => {
            var btn_2 = document.getElementById("real_file");
            btn_2.click();
      });
}

    // dragControls.addEventListener('dragstart', (event) => {
    
    //     if(!isNavBarExist){
    //         make_nav_bar();
    //     }
    
    //     dify_plane_nav = plane.position.y  - nav_bar.position.y;
    
    //     dragControls1.deactivate();
    
    //     // console.log("!");
    //     // console.log(first_click);
    //     scene.add( outlineMesh );
    //     first_click = true;
    //     outlineMesh.position.x = plane.position.x;
    //     outlineMesh.position.y = plane.position.y;
    //     outlineMesh.position.z = plane.position.z -0.2;
    
        
    //     delBt.position.y = nav_bar.position.y;
    //     delBt.position.x = nav_bar.position.x +0.15;
    //     addCrumplogoBt.position.y = nav_bar.position.y;
    //     addCrumplogoBt.position.x = nav_bar.position.x;
    //     ImageaddBt.position.y = nav_bar.position.y;
    //     ImageaddBt.position.x = nav_bar.position.x -0.15;
    
    //     //add button
    //     // var btn = document.createElement("BUTTON");
    //     // var t = document.createTextNode("CLICK ME");
    //     // btn.appendChild(t);
    //     // btn.id = "content";
    //     // document.body.appendChild(btn);
    //     // var btn_2 = document.getElementById("real_file");
    //     // btn.addEventListener("click", function(){
    //     //     btn_2.click();
    //     // })
    //     // btn_2.addEventListener("change", function(){
    //     //     var file = btn_2.files[0];
    //     //     var texture2 = new THREE.TextureLoader().load(b );
    //     // })
        
    //     render();
    //   });
    
    // dragControls.addEventListener('drag', (e) => {
        
    
    //     // raycaster.setFromCamera(mouse, camera);
    //     // const objects = plane;
    //     // var intersects = raycaster.intersectObjects(scene.children);
        
    //     first_click = false;
    //     // console.log("Drag");
    //     console.log(first_click);
    //     // console.log(plane.position.x);
    //     if(plane.position.x>0.2 || plane.position.x <-0.2 ){
    //         if(plane.position.x >0){
    //             plane.position.x = 0.2;
    //         }
    //         else if(plane.position.x < 0){
    //             plane.position.x = -0.2;
    //         }
    //     }
    //     console.log("Z" + plane.position.z);
    //     outlineMesh.position.x = plane.position.x;
    //     outlineMesh.position.y = plane.position.y;
    //     outlineMesh.position.z = plane.position.z -0.1;
    //     plane.position.z = 1.1;
        
    //     //nav bar position update 
    //     if(isNavBarExist)
    //     {
    //         let x_dif_del_to_nav = nav_bar.position.x - delBt.position.x;
    
    //         nav_bar.position.x = plane.position.x;
    //         nav_bar.position.y = plane.position.y - dify_plane_nav;
    //         delBt.position.y = nav_bar.position.y;
    //         delBt.position.x = nav_bar.position.x +0.15;
    //         addCrumplogoBt.position.y = nav_bar.position.y;
    //         addCrumplogoBt.position.x = nav_bar.position.x;
    //         ImageaddBt.position.y = nav_bar.position.y;
    //         ImageaddBt.position.x = nav_bar.position.x -0.15;
    //         renderer.render(scene, camera);
    //     }
    
    //     renderer.render(scene, camera);
    //   });
    //   dragControls.addEventListener('dragend', (event) => {
    //     // scene.remove(outlineMesh);
    //     // render();
        
    //     dragControls1.activate();
    //   });

var dify_plane_nav =0;

function setdragcontrol_1(x){
    
    x.addEventListener('dragstart', (e) => {
    console.log("start");
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    inital_position.x = mouse.x;
    inital_position.y = mouse.y;
    
    fixed_position_x = outlineMesh.position.x;
    fixed_position_y = outlineMesh.position.y;
    fixed_position_z = outlineMesh.position.z;

    // console.log(plane.position.x);
    renderer.render(scene, camera);
  });
  
  x.addEventListener('dragend', (event) => {
    // scene.remove(outlineMesh);
    // render();
  });
  x.addEventListener('drag', (e) => {
    
    isdragstart = true;
    position_fix();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    dif_x = inital_position.x - mouse.x;
    dif_y = (inital_position.y - mouse.y);
    if(mouse.x > arrPlane[idx_plane].position.x){dif_x = -dif_x;}
    if(mouse.y +0.78< arrPlane[idx_plane].position.y){dif_y = -dif_y;}

    let amount = 6;
    outlineMesh.scale.x = outlineMesh.scale.x * (1-dif_y*amount) ;
    arrPlane[idx_plane].scale.x = arrPlane[idx_plane].scale.x * (1-dif_y*amount) ;
    outlineMesh.scale.y = outlineMesh.scale.y * (1-dif_y*amount) ;
    arrPlane[idx_plane].scale.y = arrPlane[idx_plane].scale.y * (1-dif_y*amount) ;
    inital_position.x = mouse.x;
    inital_position.y = mouse.y;

    //nav bar position update
    nav_bar.position.y += dif_y;
    delBt.position.y =  nav_bar.position.y;
    addCrumplogoBt.position.y = nav_bar.position.y;
    ImageaddBt.position.y = nav_bar.position.y;

    position_fix();
    // ! 항상 z 좌표라는 문제와 카메라 앵글이 변하면 x와 y좌표가 정확하지 않음
    var point = new THREE.Vector3(mouse.x, mouse.y, 0);
    point.unproject(camera);
    
    first_click = false;
    // console.log("Drag");
    console.log(first_click);
    // console.log(plane.position.x);
    renderer.render(scene, camera);
  });

}

  var inital_position = new THREE.Vector2();
  var fixed_position_x;
  var fixed_position_y;
  var fixed_position_z;
function position_fix(){
    
    outlineMesh.position.x = fixed_position_x;
    outlineMesh.position.y = fixed_position_y;
    arrPlane[idx_plane].position.x = outlineMesh.position.x;
    arrPlane[idx_plane].position.y = outlineMesh.position.y;
    outlineMesh.position.z = arrPlane[idx_plane].position.z -0.1;
    arrPlane[idx_plane].position.z = 1.1;
}

    
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//   console.log(mouse.x);
//   // ! 항상 z 좌표라는 문제와 카메라 앵글이 변하면 x와 y좌표가 정확하지 않음
//   var point = new THREE.Vector3(mouse.x, mouse.y, 0);
//   point.unproject(camera);



loader.load(gltfUrl.href,function(gltf){
    console.log(gltf);
    scene.add(gltf.scene);
    gltf.scene.scale.set(0.01,0.01,0.01);
    const obj = gltf.scene.children[0];
    obj.position.set(0,0,0);
    
    renderer.render(scene, camera);
    takeScreenshot();

},	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

function render(){
    renderer.render(scene,camera);
}
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
}

// const box = new THREE.Mesh(boxGeometry, boxMaterial);
// scene.add(box);

// var btn = document.createElement("DIV");

// var t = document.createTextNode("CLICK ME");
// var bt = document.createTextNode("BUTTON");
// btn.appendChild(t);
// btn.appendChild(bt);
// document.body.appendChild(btn);


btn_2.addEventListener("change", function(e){
    console.log("change");
        var file = btn_2.files[0];
        console.log(btn_2.files[0]);
        const reader = new FileReader();
        var exTex ;
        var exGeo;
        var exMat ;
        let ex;
        reader.readAsDataURL(btn_2.files[0]);
        // 이미지가 로드가 된 경우
        reader.onload = e => {
            var img = e.target.result;
            console.log("chan1ge");
            
            exTex = new THREE.TextureLoader().load(img);
            // exGeo = new THREE.PlaneGeometry(0.1, 0.1, 20, 1);
            exMat = new THREE.MeshBasicMaterial({ map: exTex,transparent: true });
            console.log(plane);
            plane.material = exMat;
            texture.needsUpdate= true;
            // plane = new THREE.Mesh(geo, exMat);
            
            // scene.add(plane);
            setTimeout(function(){
                console.log("Executed after 1 second");
                
                render();
            }, 100);
            // const previewImage = document.getElementById("preview-image")
            // previewImage.src = e.target.result
        }
        
        console.log("chan13e");
        
})

function plane_gen(iscrump){
    console.log("change");
    var file = btn_3.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(btn_3.files[0]);
    // 이미지가 로드가 된 경우
    reader.onload = e => {
        var img = new Image();
        img.src = e.target.result;
        img.onload = function () {
            idx_plane = countaddedob;
            arrTex[countaddedob] = new THREE.TextureLoader().load(img.src);
            console.log("width"+this.width);
            console.log("height"+this.height);
            console.log(this.width.toString().length);
            console.log(this.height.toString().length);
            let numDigit_width = this.width.toString().length;
            let numDigit_height = this.height.toString().length;
            let digit = (numDigit_height > numDigit_width) ? numDigit_height : numDigit_width;

            let geo = new THREE.PlaneGeometry(this.width/8**digit, this.height/8**digit, 20, 1);
            
            dif_by_Imagesize = 0.01 - this.height/10**numDigit_height;
            arrTex[countaddedob] = new THREE.TextureLoader().load(img.src);
            // exGeo = new THREE.PlaneGeometry(0.1, 0.1, 20, 1);
            arrMat[countaddedob] = new THREE.MeshBasicMaterial({ map: arrTex[countaddedob] ,transparent: true});
            arrPlane[countaddedob] = new THREE.Mesh(geo, arrMat[countaddedob]);
            arrPlane[countaddedob].material.side = THREE.DoubleSide;
            if(iscrump){
                arrPlane[countaddedob].name ="crump";
            }
            scene.add(arrPlane[countaddedob]);

            arrPlane[countaddedob].position.y = 0.71;
            if(isfront){
                arrPlane[countaddedob].position.z = 1;
            }
            else{
                arrPlane[countaddedob].rotateY(Math.PI);
                arrPlane[countaddedob].position.z = -1;
            }


            outlineMesh = new THREE.Mesh( geo, outlineMaterial );

            var drag_outline;

            let dragcontrol_forplane = new DragControls([arrPlane[countaddedob]], camera, renderer.domElement);
            dragcontrol_forplane.addEventListener('dragstart', (event) => {
                console.log("DRAGAGAGAGA");

                if(!isNavBarExist){
                    make_nav_bar();
                }
            
                dify_plane_nav = arrPlane[idx_plane].position.y  - nav_bar.position.y;
            
                if(!isexistoutlinemesh)
                {
                    texture2 = new THREE.TextureLoader().load(image2_url.href );
                    outlineMaterial = new THREE.MeshBasicMaterial({ map: texture2, transparent: true});
                    outlineMesh = new THREE.Mesh( geo, outlineMaterial );
                    outlineMesh.name = "outlineMesh";
                    outlineMesh.scale.multiplyScalar( 1.2 );
                    outlineMesh.position.y = arrPlane[idx_plane].position.y;
                    outlineMesh.position.x = arrPlane[idx_plane].position.x;
                    outlineMesh.position.z = arrPlane[idx_plane].position.z + 0.4;
                    drag_outline = new DragControls([outlineMesh], camera, renderer.domElement);
                    
                    scene.add(outlineMesh);
                    setdragcontrol_1(drag_outline);

                    isexistoutlinemesh = true;

                }

                drag_outline.deactivate();

                // dragControls1.deactivate();
            
                // console.log("!");
                // console.log(first_click);

                // texture2 = new THREE.TextureLoader().load(image2_url.href );
                // outlineMaterial = new THREE.MeshBasicMaterial({ map: texture2, transparent: true});
                // outlineMesh = new THREE.Mesh( geo, outlineMaterial );
                // outlineMesh.name = "outlineMesh";
                // outlineMesh.scale.multiplyScalar( 1.2 );
                // let dragControls1 = new DragControls([outlineMesh], camera, renderer.domElement);
                // scene.add( outlineMesh );


                first_click = true;
                outlineMesh.position.x = arrPlane[idx_plane].position.x;
                outlineMesh.position.y = arrPlane[idx_plane].position.y;
                outlineMesh.position.z = arrPlane[idx_plane].position.z -0.2;
            
                
                delBt.position.y = nav_bar.position.y;
                delBt.position.x = nav_bar.position.x +0.15;
                addCrumplogoBt.position.y = nav_bar.position.y;
                addCrumplogoBt.position.x = nav_bar.position.x;
                ImageaddBt.position.y = nav_bar.position.y;
                ImageaddBt.position.x = nav_bar.position.x -0.15;
            
                //add button
                // var btn = document.createElement("BUTTON");
                // var t = document.createTextNode("CLICK ME");
                // btn.appendChild(t);
                // btn.id = "content";
                // document.body.appendChild(btn);
                // var btn_2 = document.getElementById("real_file");
                // btn.addEventListener("click", function(){
                //     btn_2.click();
                // })
                // btn_2.addEventListener("change", function(){
                //     var file = btn_2.files[0];
                //     var texture2 = new THREE.TextureLoader().load(b );
                // })
                
                render();
              });
              dragcontrol_forplane.addEventListener('drag', (e) => {
    

                // raycaster.setFromCamera(mouse, camera);
                // const objects = plane;
                // var intersects = raycaster.intersectObjects(scene.children);
                
                first_click = false;
                // console.log("Drag");
                console.log(first_click);
                // console.log(plane.position.x);
                if(arrPlane[idx_plane].position.x>0.2 || arrPlane[idx_plane].position.x <-0.2 ){
                    if(arrPlane[idx_plane].position.x >0){
                        console.log("!");
                        arrPlane[idx_plane].position.x = 0.2;
                    }
                    else if(arrPlane[idx_plane].position.x < 0){
                        arrPlane[idx_plane].position.x = -0.2;
                    }
                }
                console.log("Z" + arrPlane[idx_plane].position.z);
                outlineMesh.position.x = arrPlane[idx_plane].position.x;
                outlineMesh.position.y = arrPlane[idx_plane].position.y;
                outlineMesh.position.z = arrPlane[idx_plane].position.z -0.1;
                arrPlane[idx_plane].position.z = 1.1;
                
                //nav bar position update 
                if(isNavBarExist)
                {
                    let x_dif_del_to_nav = nav_bar.position.x - delBt.position.x;
            
                    nav_bar.position.x = arrPlane[idx_plane].position.x;
                    nav_bar.position.y = arrPlane[idx_plane].position.y - dify_plane_nav;
                    delBt.position.y = nav_bar.position.y;
                    delBt.position.x = nav_bar.position.x +0.15;
                    addCrumplogoBt.position.y = nav_bar.position.y;
                    addCrumplogoBt.position.x = nav_bar.position.x;
                    ImageaddBt.position.y = nav_bar.position.y;
                    ImageaddBt.position.x = nav_bar.position.x -0.15;
                    renderer.render(scene, camera);
                }
            
                renderer.render(scene, camera);
              });
              dragcontrol_forplane.addEventListener('dragend', (event) => {
                console.log("Dragend");
                // scene.remove(outlineMesh);
                // render();
                
                drag_outline.activate();
              });
            setTimeout(function(){
                console.log("Executed after 1 second");
                render();
                countaddedob += 1;






            }, 100);
        };
        // const previewImage = document.getElementById("preview-image")
        // previewImage.src = e.target.result
    }
    
    console.log("chan13e");
}

btn_3.addEventListener("change", function(e){
    plane_gen(false);
   
        
})
newlogo_bt.onclick = function(){

    btn_3.click();
    renderer.render(scene,camera)
}

front_bt.onclick = function(){
    // scene.remove(box);
    //back
    if(!isfront)
    {
        camera.position.set(0,camera_y,2);
        camera.rotateY(Math.PI);
        isfront = true;
    }
    renderer.render(scene,camera)
}
back_bt.onclick = function(){
    // scene.remove(box);
    //back
    if(isfront)
    {
        camera.position.set(0,camera_y,-2);
        camera.rotateY(Math.PI);
        isfront = false;
    }
    renderer.render(scene,camera)
}
function takeScreenshot() {

    // open in new window like this
    //
    // var w = window.open('', '');
    // w.document.title = "Screenshot";
    //w.document.body.style.backgroundColor = "red";
    // var img = new Image();
    // // Without 'preserveDrawingBuffer' set to true, we must render now
    // renderer.render(scene, camera);
    // img.src = renderer.domElement.toDataURL();
    // w.document.body.appendChild(img);  

    
    // var formdata = new FormData();
    // console.log(w.document.images[0].src);
    // formdata.append('img', w.document.images[0].src);
    // const xhr = new XMLHttpRequest();
    // xhr.open("POST", "/12");
    // // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    // xhr.send(formdata);


    

/*
    // download file like this.
    //
    var a = document.createElement('a');
    // Without 'preserveDrawingBuffer' set to true, we must render now
    renderer.render(scene, camera);
    a.href = renderer.domElement.toDataURL().replace("image/png", "image/octet-stream");
    a.download = 'canvas.png'
    a.click();
*/
    
/*
    // New version of file download using toBlob.
    // toBlob should be faster than toDataUrl.
    // But maybe not because also calling createOjectURL.
    //
    renderer.render(scene, camera);
    renderer.domElement.toBlob(function(blob){
    	var a = document.createElement('a');
      var url = URL.createObjectURL(blob);
      a.href = url;
      a.download = 'canvas.png';
      a.click();
    }, 'image/png', 1.0);
*/
    
}

submit_bt.onclick = function(){

    var checkcrump = true;
    var checkteam = true;
    
    let team_name = document.getElementById("itemname");

    //check teamname and crumplogo
    if(team_name.value == ""){
        alert("팀이름을 입력해주세요");
        checkteam = false;
        return;
    }
    if(crumplogocount ==0){
        alert("Crump 로고를 적어도 1개 사용해주세요");
        checkcrump = false;
        return;
    }



    //if it's back turn front
    if(!isfront)
    {
        camera.position.set(0,0.5,2);
        camera.rotateY(Math.PI);
        isfront = true;
    }
    renderer.render(scene,camera)


    console.log(team_name.value);

    //make screenshot
    // var w = window.open('', '');
    // w.document.title = "Screenshot";
    var img = new Image();
    renderer.render(scene, camera);
    img = renderer.domElement.toDataURL('image/png');
    // img = img.replace("data:image/png;base64,", "");

    var formdata = new FormData();

    var bstr = atob(img.split(",")[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    
    while(n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    var file = new File([u8arr], "front.png", {type:"mime"});
    // var blobBin = atob(img.split(',')[1]);	// base64 데이터 디코딩


    if(isfront)
    {
        camera.position.set(0,camera_y,-2);
        camera.rotateY(Math.PI);
        isfront = false;
    }
    renderer.render(scene,camera)


    var img2 = new Image();
    img2 = renderer.domElement.toDataURL('image/png');
    
    bstr = atob(img2.split(",")[1]);
    n = bstr.length;
    u8arr = new Uint8Array(n);
    
    while(n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    var file2 = new File([u8arr], "back.png", {type:"mime"});



    
    if(!isfront)
    {
        camera.position.set(0,camera_y,2);
        camera.rotateY(Math.PI);
        isfront = true;
    }
    renderer.render(scene,camera)


    

    formdata.append('sese', "sese");
    formdata.append('img', file);
    formdata.append('img', file2);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/12");
    xhr.onload = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // const result = JSON.parse(xhr.responseText);
            renderMessage(success, upload_success_msg)
        }
    };
    xhr.onerror = function (e) {
        renderMessage(errors, upload_error_msg)
    };
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.send(formdata);
    // xhr.responseType = "json";
    // xhr.onload = () => {
    //     if (xhr.readyState == 4 && xhr.status == 200) {
    //         const data = xhr.response;
    //         console.log(data);
    //     } else {
    //         console.log(`Error: ${xhr.status}`);
    //     }
    // };

    
}



//해상도 조정
var submit_div = document.getElementById("submit_div");
submit_div.style.height = canvas_height.toString() +"px";

var bt_wrapper = document.getElementById("bt_wrapper");
bt_wrapper.style.width = canvas_height.toString() +"px";
console.log("!"+bt_wrapper.style.width);

// Resizing window to make responsive
const windowResize = ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

window.addEventListener('resize', windowResize, false);