import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Color, MathUtils, MeshPhongMaterial, SphereGeometry } from 'three';

enum ce { //celestial entities
	spawn,
	blackHole,
	twitter,
	torus,
	moon
}

let mainScene: THREE.Scene;
// let planetScene: THREE.Scene;
let scene: THREE.Scene;
let camera: THREE.Camera;
let renderer: THREE.WebGLRenderer;

let twitter: THREE.Group //For twitter.obj model
let twitterCloseUp: THREE.Mesh
let systemStar: THREE.Group

var zoomOutAudio = new Audio('src/assets/zoomout.wav');
zoomOutAudio.volume = 0.9
var backgroundAudio = new Audio('src/assets/background.mp3')
backgroundAudio.volume = 0.65

//Used by adjustCamera, persisting across calls to know if we are close in the z, x, or y coord, and the second three tell if we were already close
var xIsClose = false
var yIsClose = false
var zIsClose = false
var reachedTargetFirstTime = false //Prevents accidental fading when still close to a target

//Set up mouse clicking functionality
var raycaster = new THREE.Raycaster(); 
var mouse = new THREE.Vector2(); //2D representation of where a mouse click occurs
const CAM_START = {
	x: 0,
	y: 0,//-27.5, //For some reason the grid and black hole seemed to be centered here instead of at 0...
	z: 290
}
type cameraLockType = {
	isLocked: boolean,
	target: any
	name: ce
}
let cameraLock:cameraLockType = {isLocked: false, target: null, name: ce.spawn} //Instantiate a cameraLock struct

class App extends Component {

	//Adds a star in a random spot, if negZOnly is passed in as true, it won't put any stars in pos z, helping to "background" the stars better
	addStar(negZOnly=false){
		const starGeo = new THREE.SphereGeometry(THREE.MathUtils.randFloat(0.25, 0.75), 24, 24)
		const starMat = new THREE.MeshBasicMaterial({color: new Color("white")}) //MeshBasicMaterials do not cast shadows, good for tiny star balls
		const star = new THREE.Mesh(starGeo, starMat)

		let x,y,z;
		let xIsNeg, yIsNeg, zIsNeg
		xIsNeg = (THREE.MathUtils.randInt(0, 1) == 0) ? -1:1
		yIsNeg = (THREE.MathUtils.randInt(0, 1) == 0) ? -1:1
		if(!negZOnly) zIsNeg = (THREE.MathUtils.randInt(0, 1) == 0) ? -1:1
		else zIsNeg = -1

		//Set the closest and farthest stars can be
		const innerBound = 250
		const outerBound = 700

		x = THREE.MathUtils.randFloat(0, xIsNeg * outerBound)
		z = THREE.MathUtils.randFloat(0, zIsNeg * outerBound)
		if(Math.abs(z) > innerBound || Math.abs(x) > innerBound) //Ignore bounding rules, if x or z accidentally abide by them
			y = THREE.MathUtils.randFloat(0, yIsNeg * outerBound)
		else //This way, we get a nice box in the center of our system devoid of star clutter and they stick to the edges of the world only
			y = THREE.MathUtils.randFloat(yIsNeg * innerBound, yIsNeg * outerBound) 
		star.position.set(x, y, z);
		star.name = "star"
		mainScene.add(star)
	}

	addCelestialEntity(pos: THREE.Vector3, size: number, texture: any, norMap: any, metalness: number, color=new Color("black")){

		const celestialEntity = new THREE.Mesh(
			new THREE.SphereGeometry(size, 128, 128),
			new THREE.MeshStandardMaterial({color: color, map: texture, metalness: metalness, normalMap: norMap})
		)
		celestialEntity.position.set(pos.x, pos.y, pos.z)
		return celestialEntity
	}

	//Adjust the orbit of an entity, distance specifies how far away and theta is what degree it is with respect to what it orbits
	adjustOrbit(entity: any, distance: number, theta: number, phi: number=0) {
		/*
		(0,r) ends up at x = rsin(Theta), y = rcos(Theta) for a circle

		For a sphere:
		x = ρsin(ϕ)cos(θ)
		y = ρsin(ϕ)sin(θ)
		z = ρcos(ϕ)
		ρ = r/sin(ϕ)
		*/
		//console.log(entity)
		const alpha = 0.1; //Decrease to speed up, a good value is 0.1
		entity.position.x = distance*Math.sin(theta);
		entity.position.y = distance*Math.cos(theta);
		//entity.position.z = distance*Math.sin(theta)
		theta += (1 / (alpha*(distance**2))) //orbiting speed is a function of distance from celestial mass
		if(theta >= 360) theta = 0

		return theta

		// const alpha = 0.005
		// const p = distance/Math.sin(phi)
		// entity.position.x = p * Math.sin(phi) * Math.cos(theta)
		// entity.position.y = p * Math.sin(phi) * Math.sin(theta)
		// entity.position.z = p * Math.cos(phi)

		// phi += (0.0025 / (alpha*distance)) //orbiting speed is a function of distance from celestial mass
		// theta += (0.0025 / (alpha*distance)) //orbiting speed is a function of distance from celestial mass
		// if(phi >= 360) phi = 0
		// if(theta >= 360) theta = 0

		// return new Array(theta, phi)
	}

	adjustCamera(target: THREE.Object3D, fastInc: number = 0.08, slowInc: number = 0.025){
		const xdiff = camera.position.x - target.position.x
		const ydiff = camera.position.y - target.position.y
		const zdiff = camera.position.z - target.position.z
		var xMatched = false
		var yMatched = false
		var zMatched = false
		const medInc = 0.05;
		const nearlyThere = 0.05; //was going to call this slowestInc but its a similar value to medium Increment, which is kind of confusing
		
		//Because target isn't an Object3D when going to spawn, it won't have a name property. You can use below to check if target is a celestial
		//entity, or if we're just going back to spawn
		//console.log(target.hasOwnProperty("name"))
		
		//Handle x
		let absX = Math.abs(xdiff)
		if(absX > 18) camera.position.x -= xdiff * fastInc //Too far away in positive direction
		else if(absX > 5) {
			camera.position.x -= xdiff * medInc //Too far away in positive direction
			xIsClose = true
		}
		else if(absX > 1){
			camera.position.x -= xdiff * slowInc //Too far away in positive direction
			xIsClose = true
		}
		else if(absX > 0.1){
			camera.position.x -=  Math.sign(xdiff) * nearlyThere
			xIsClose = true
		}
		else if(absX >= 0){
			camera.position.x = target.position.x
			xIsClose = true
			xMatched = true
		}

		//Handle y
		let absY = Math.abs(ydiff);
		if(absY > 18) camera.position.y -= ydiff * fastInc //Too far away in positive direction
		else if(absY > 5) {
			camera.position.y -= ydiff * medInc //Too far away in positive direction
			yIsClose = true
		}
		else if(absY > 1) {
			camera.position.y -= ydiff * slowInc //Too far away in positive direction
			yIsClose = true
		}
		else if(absY > 0.1){
			camera.position.y -=  Math.sign(ydiff) * nearlyThere
			yIsClose = true
		}
		else if(absY >= 0) {
			camera.position.y = target.position.y
			yIsClose = true
			yMatched = true
		}
		
		//Handle z
		let absZ = Math.abs(zdiff);
		if(absZ > 18) camera.position.z -= zdiff * fastInc //Too far away in positive direction
		else if(absZ > 5) {
			camera.position.z -= zdiff * medInc //Too far away in positive direction
			zIsClose = true
		}
		else if(absZ > 1) {
			camera.position.z -= zdiff * slowInc //Too far away in positive direction
			zIsClose = true
		}
		else if(absZ > 0.1){
			camera.position.z -= Math.sign(zdiff) * nearlyThere
			zIsClose = true
		}
		else if(absZ >= 0) {
			camera.position.z = target.position.z
			zIsClose = true
			zMatched = true
		}

		//Special case to see if camera is at the original spawn point, disable target lock
		if(camera.position.x == CAM_START.x && camera.position.y == CAM_START.y && camera.position.z == CAM_START.z){
			cameraLock = {isLocked: false, target: null, name: ce.spawn}
			console.log("Matched at spawn: " + camera.position.x + "  " + CAM_START.x)
			xIsClose = false
			yIsClose = false
			zIsClose = false
			reachedTargetFirstTime = false
		} 
		else if(xIsClose && yIsClose && zIsClose) { //We are approaching something that isn't the original spawn point
			if(reachedTargetFirstTime == false){
				fade()
				setTimeout(function(){
					changeWorld(cameraLock.name, false)
					fade(false)
				}, 1000)
			}
			reachedTargetFirstTime = true
		}
		//else if(xMatched && yMatched && zMatched) cameraLock = {isLocked: false, target: null} //This may not be necessary...

	}

	//Using React's componentDidMount as my init function
	componentDidMount() {

		let debug = false
		let scrollMode = false
		let orbitControlsMode = false

		mainScene = new THREE.Scene(); //Instantiate the scene
		// planetScene = new THREE.Scene();

		document.body.addEventListener("mousemove", function () {
			backgroundAudio.play() //Do not start music until mouse is moved. Chrome does not allow audio to autoplay for spam reasons
		})

		//Set up the scenes
		// let giantsDeep = new THREE.TextureLoader().load('src/assets/giantsdeep.png')
		// planetScene.background = giantsDeep

		//Skybox
		let skybox: THREE.Mesh
		const loadManager = new THREE.LoadingManager();
		const loader = new THREE.TextureLoader(loadManager);
		let skyboxGeom = new THREE.BoxGeometry(1600, 1600, 1600)
		let skyboxMaterials = [
			new THREE.MeshBasicMaterial({map: loader.load('src/assets/skyboxwithsun/right.png', onTextureLoad)}),
			new THREE.MeshBasicMaterial({map: loader.load('src/assets/skyboxwithsun/left.png', onTextureLoad)}),
			new THREE.MeshBasicMaterial({map: loader.load('src/assets/skyboxwithsun/top.png', onTextureLoad)}),
			new THREE.MeshBasicMaterial({map: loader.load('src/assets/skyboxwithsun/bottom.png', onTextureLoad)}),
			new THREE.MeshBasicMaterial({map: loader.load('src/assets/skyboxwithsun/front.png', onTextureLoad)}),
			new THREE.MeshBasicMaterial({map: loader.load('src/assets/skyboxwithsun/back.png', onTextureLoad)})
		];
		skyboxMaterials.forEach(x => x.side = THREE.BackSide)
		loadManager.onLoad = () =>{
			console.log("Loaded skybox")
			skybox = new THREE.Mesh(skyboxGeom, skyboxMaterials)
			skybox.name = "skybox" //Tag it so we can block mouse clicks from acting on it
			mainScene.add(skybox)
			window.onload = (function () {
				const loadingScreen = document.querySelector('#loading-screen');
				console.log(loadingScreen)
			});
		}

		let moonTexture = new THREE.TextureLoader().load('src/assets/moon.jpg')
		let moonNormal = new THREE.TextureLoader().load('src/assets/moonbumpmap.jpg')

		//Instantiate and set up camera
		camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 5000)
		camera.position.z = CAM_START.z //Move camera back so its not in center of scene
		camera.position.y = CAM_START.y //Move camera back so its not in center of scene

		window.addEventListener("mousedown", onMouseClick, false) //If orbit controls are on, they intercept the mouse click and this doesn't work
		window.addEventListener("keydown", onBackOutKey, false)

		//Instantiate and set up renderer
		renderer = new THREE.WebGLRenderer({
			canvas: document.querySelector('#bg') as HTMLCanvasElement,
		})
		renderer.setPixelRatio(window.devicePixelRatio) //
		renderer.setSize(window.innerWidth, window.innerHeight) //Fullscreen
		document.body.appendChild(renderer.domElement); //Add renderer to the dom, which is responsible for drawing camera and scene

		//define some for sample planet torus
		const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
		const material = new THREE.MeshStandardMaterial({color: 0xFF6347, flatShading: false, roughness: 0, wireframe: false});
		const torus = new THREE.Mesh(geometry, material);
		torus.name = "torus"
		mainScene.add(torus)

		//Add some light
		const aL = new THREE.AmbientLight(new Color("white"), 1)
		mainScene.add(aL)
		// const aL2 = new THREE.AmbientLight(new Color("white"))
		// planetScene.add(aL2)

		//GridHelper
		const gH = new THREE.GridHelper(200, 50)
		if(debug) mainScene.add(gH)

		//Move around in the scene with your mouse!
		let controls: OrbitControls
		if(orbitControlsMode) controls = new OrbitControls(camera, renderer.domElement);

		//Populate the universe
		for(let i = 0; i < 600; i++) this.addStar() //with stars

		let blackHole = this.addCelestialEntity(new THREE.Vector3(0, 0, 0), 6, null, null, 0) //with a black hole so massive everything orbits around it
		blackHole.name = "black hole"
		mainScene.add(blackHole)

		//Create star that belongs to solar system and provides light to the system
		let systemStar = new THREE.Group();
		let systemStarTexture = new THREE.TextureLoader().load('src/assets/8k_sun.jpg')
		const pL = new THREE.PointLight(new Color("white"), 2, 0) //light source
		if(debug) {
			const lH = new THREE.PointLightHelper(pL) //debugging tool
			mainScene.add(lH) //Debugging object doesn't need to be part of the group
		}
		systemStar.add(this.addCelestialEntity(new THREE.Vector3(0, 0, 0), 18, systemStarTexture, null, 0, new Color("gold"))) //Create a star that belongs to this solar system
		systemStar.add(pL) //Add our source of light to this group, so it is bound to the system's star and moves with it
		mainScene.add(systemStar)

		//Create the system's star from an .obj model
		// let systemStarMTL = new MTLLoader().load('src/assets/solarsystem.mtl', function(materials){
		// 	materials.preload()

		// 	let systemStarOBJ = new OBJLoader()
		// 	systemStarOBJ.setMaterials(materials)
		// 	systemStarOBJ.load('src/assets/systemstar.obj', function(object){
		// 		systemStar = object
		// 		systemStar.traverse(function(child){
		// 			if(child instanceof THREE.Mesh){
		// 				for(let i = 0; i < 13; i++){
		// 					if(child.material[i].name != "sun") console.log(child.material[i]) //child.material[i] == null
		// 				}
		// 				// child.material.forEach(e: THREE.MeshPhongMaterial => {
		// 				// 	if(e.name != "sun") console.log();
		// 				// });
		// 				//for(let i = 0; i < child.material.length;

		// 				//child.material = new THREE.MeshStandardMaterial({map: 8ksun, roughness: 0, metalness: 0, flatShading: false})
		// 			}
		// 		})
		// 		systemStar.scale.set(0.01, 0.01, 0.01)
		// 		console.log(systemStar)
		// 		systemStar.add(pL) //Add our source of light to this group, so it is bound to the system's star and moves with it
		// 		mainScene.add(systemStar)
		// 	})
		// })


		//Create the twitter planet from an .obj model
		let twitterLoader = new OBJLoader().load('src/assets/twitter.obj', function(object){
			twitter = object
			twitter.traverse(function(child){
				if(child instanceof THREE.Mesh){
					//console.log(child)
					child.material = new THREE.MeshStandardMaterial({ color: 0x3fbcff, roughness: 0, metalness: 0, flatShading: false})
					child.rotation.y += 7.5 //For start up sake I like to start it at this rotation so it looks more presentable, not that important
				}
			})
			//console.log(twitter)
			mainScene.add(twitter)
		})
		twitterCloseUp = this.addCelestialEntity(new THREE.Vector3(0, 0, 0), 9, null, null, 0.0, new Color(0x3fbcff))

		let moon = this.addCelestialEntity(new THREE.Vector3(0, 0, 0), 6, moonTexture, moonNormal, 0.0, new Color("white")) //with a moon!
		moon.name = "moon"
		mainScene.add(moon)

		let thetaDonut: number = 0 //degrees
		let thetaMoon: number = 90
		let thetaTwitter: number = 0
		let thetaSystemStar: number = 0

		if(scrollMode) window.onscroll = moveCamera

		scene = mainScene; //Set active scene to main universe at start up

		//Weird glitches? Can't get stuff to display? Just debug enable and make everything BasicMaterial to guarantee you're doing it right
		//if(debug) scene.overrideMaterial = new MeshBasicMaterial({ color: 'green'})


		// //Demonstration of planet switching
		// setTimeout(() => {
		// 	changeWorld(ce.twitter, false)
		// 	cameraLock.name = ce.twitter
		// }, 1000)
		// setTimeout(() => {
		// 	changeWorld(ce.twitter, true)
		// 	cameraLock = {
		// 		isLocked: false,
		// 		target: { CAM_START },
		// 		name: ce.spawn
		// 	}
		// }, 5000)
		
		//three.js "game" loop
		const animate = () =>{
			requestAnimationFrame(animate)

			//TODO: Look into constantly resizing canvas/adaptible canvas resizing such that you can resize your screen and it won't become white space

			//camera.rotation.y += 0.001
			
			//Adjust orbits
			thetaDonut = this.adjustOrbit(torus, 190, thetaDonut)
			thetaMoon = this.adjustOrbit(moon, 240, thetaMoon)
			thetaTwitter = (cameraLock.name != ce.twitter) ? this.adjustOrbit(twitter, 140, thetaTwitter):this.adjustOrbit(twitterCloseUp, 140, thetaTwitter)
			thetaSystemStar = this.adjustOrbit(systemStar, 80, thetaSystemStar)

			//Adjust rotations
			torus.rotation.z += 0.001
			torus.rotation.x += 0.01
			torus.rotation.y += 0.005
			//moon.rotation.z += 0.001
			moon.rotation.x += 0.001
			moon.rotation.y += 0.001
			twitter.rotation.z += 0.002

			if(orbitControlsMode) controls.update()

			if(cameraLock.isLocked) this.adjustCamera(cameraLock.target)
			renderer.render(scene, camera);
		}
		animate()
	}

	render() {
		return (
			<>
				<section id="loading-screen">
					<div id="loader"></div>
				</section>
				<canvas id="bg"></canvas>
				<main>
					{/* <span id="fader"></span> */}
					<div id="text">
						Here's some text
					</div>
				</main>
			</>
		)
	}
}

function onMouseClick(event: THREE.Event) { 
	// calculate mouse position in normalized device coordinates 
	// (-1 to +1) for both components
	//Potential Issue: window resizes seem to confuse three.js and it doesn't know where things are anymore. If you open up console when it wasn't 
	//opened, that resizes the window and shifts the black hole over, but where it was originally located is where three js reports an object intersection
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1; //I believe these convert to centered normalized coordinates x,y at 0,0 is exact center of screen
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; // height 100, click at 5, -5/100 = -0.05*2 is -slowInc + 1 means click was registered at y = 0.9

	raycaster.setFromCamera(mouse, camera); // update the picking ray with the camera and mouse position
	raycaster.intersectObjects(scene.children); // calculate objects intersecting the picking ray
	if(raycaster.ray.intersectsBox(new THREE.Box3().setFromObject(twitter))){
		//We intersected on our twitter.obj model which is a THREE.Group and so can't be detected the normal way below
		cameraLock = {
			isLocked: true,
			target: twitter,
			name: ce.twitter
		}
		return
	}
	//This is busted for some reason, Cannot read property 'updateWorldMatrix' of undefined' did not look into it yet
	// if(raycaster.ray.intersectsBox(new THREE.Box3().setFromObject(systemStar))){
	// 	cameraLock.isLocked = true;
	// 	cameraLock.target = systemStar;
	// 	return
	// }
	//Check for intersections on any mesh
	var intersects = raycaster.intersectObjects(scene.children);
	for(var i = 0; i < intersects.length; i++){
		if(intersects[i].object.name != "star" && intersects[i].object.name != "skybox") {
			cameraLock.isLocked = true;
			cameraLock.target = intersects[i].object;
			if(intersects[i].object.name == "moon") cameraLock.name = ce.moon
			else if(intersects[i].object.name == "black hole") cameraLock.name = ce.blackHole
			else if(intersects[i].object.name == "torus") cameraLock.name = ce.torus
			//(obj as any).material.color.set(0xff0000); //Unfortunately TS doesn't like Object3Ds
			return
		}
	}
}

//Register listener for and set up callback for space and esc key
function onBackOutKey(event: any){
	if(cameraLock.name == ce.spawn) return //Do nothing if cameraLock was last locked onto spawn
	var keyCode = event.which
	if(keyCode == 32 || keyCode == 27){ //Space and Esc respectively
		fade(false); //Ask fade function to fade us again
		changeWorld(cameraLock.name, true)
		cameraLock = {
			isLocked: true,
			target: { position: CAM_START },
			name: ce.spawn
		}
		zoomOutAudio.play();
	}
}

//Tell the DOM to move our camera whenever the user scrolls
function moveCamera() {
	cameraLock.isLocked = false //turn off camera lock on
	console.log(cameraLock.isLocked)

	const top = document.body.getBoundingClientRect().top //Find out the top of the user's viewport (screen basically)
	camera.position.z = (top * 0.05) + CAM_START.z
	//camera.position.x = top * -0.002
	camera.position.y = (top * -0.05) + CAM_START.y
	console.log("Top is now equal to " + top)
	console.log("Camera x: " + camera.position.x)
	console.log("Camera y: " + camera.position.y)
	console.log("Camera z: " + camera.position.z)
}

function onTextureLoad(){
	console.log("Texture is loaded now")
}

function changeWorld(celestialEntity: ce, leaving: boolean){
	switch(celestialEntity){
		case ce.blackHole:
			//TODO: Idk what to even do if you enter a black hole, should just disable this honestly
			break;
		case ce.moon:
			//TODO: Figure something out for moon maybe
			break;
		case ce.twitter:
			if(leaving) {
				scene.add(twitter)
				camera.rotation.y = 0 //radians
				scene.remove(twitterCloseUp)
			}
			else {
				scene.remove(twitter)
				cameraLock.target = twitterCloseUp //switch to the new target
				camera.rotation.y = 1.57 //radians, this is effectively a 90 degree rotation left
				scene.add(twitterCloseUp)
			}
			break;
		default:
			console.log("DEFAULT TRIGGERED!?!?!?!?")
	}
}

//Fades out screen.
function fade(out:boolean=true, speed: string="730ms"){
	var canvas = document.getElementById("bg")!;
	//var computedStyle = getComputedStyle(canvas)

	//Set the speed of fade
	canvas.style.transitionDuration = speed

	//Begin fade
	//var oldOpacity = computedStyle.opacity
	if(out) canvas.style.opacity = "0"
	else canvas.style.opacity = "1"

	return false
}


// function fade(){
// 	var element = document.getElementById("fader")
// 	if(element == null) return true

// 	//Find what alpha was, increment
// 	const style = getComputedStyle(element)
// 	var rgb = style.backgroundColor
// 	var vals = rgb.split(',')
// 	var oldAlpha = vals[vals.length-1].replace(')', '')
// 	const newAlpha = (0.03 + parseFloat(oldAlpha)).toString()

// 	//Set new alpha
// 	var newRGB = rgb.replace(/[^,]+(?=\))/, newAlpha)
// 	//console.log(newRGB)
// 	element.style.backgroundColor = newRGB
// 	if(parseFloat(newAlpha) >= 1) return true
// 	return false //false if not done
// }

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root') //Inject the above App Component into our root div in index.html
)
