import * as THREE from 'three';

import {FBXLoader} from 'three/addons/loaders/FBXLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { Vector3 } from 'three';
import Stats from 'three/addons/libs/stats.module.js';


class BasicCharacterControllerProxy {
  constructor(animations) {
    this._animations = animations;
  }

  get animations() {
    return this._animations;
  }
};


class BasicCharacterController {
  constructor(params) {
    this._Init(params);
  }

  _Init(params) {
    this._params = params;
    this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
    this._acceleration = new THREE.Vector3(1, 0.25, 50.0);
    this._velocity = new THREE.Vector3(0, 0, 0);

    this._animations = {};
    this._input = new BasicCharacterControllerInput();
    this._stateMachine = new CharacterFSM(
        new BasicCharacterControllerProxy(this._animations));

    this._LoadModels();

 

  }

  _LoadModels() {
    this._manager = new THREE.LoadingManager();
    
    var textureLoader = new THREE.TextureLoader(this._manager);
    var skirt = textureLoader.load('/assets/glb/textures/skirt.png');
    var head = textureLoader.load('/assets/glb/textures/Std_Skin_Head_Diffuse.jpg');
    var body = textureLoader.load('/assets/glb/textures/Std_Skin_Body_Diffuse.jpg');
    var arm = textureLoader.load('/assets/glb/textures/Std_Skin_Arm_Diffuse.jpg');
    var leg = textureLoader.load('/assets/glb/textures/Std_Skin_Leg_Diffuse.jpg');
    var nails = textureLoader.load('/assets/glb/textures/Std_Nails_Diffuse.jpg');
    var eyelash = textureLoader.load('/assets/glb/textures/Std_Eyelash_Diffuse.jpg');
    var hair = textureLoader.load('/assets/glb/textures/Hair_Diffuse.png');
    var tearR = textureLoader.load('/assets/glb/textures/Std_Tearline_R_Diffuse.jpg');
    var tearL = textureLoader.load('/assets/glb/textures/Std_Tearline_L_Diffuse.jpg');
    var tongue = textureLoader.load('/assets/glb/textures/Std_Tongue_Diffuse.png');
    var upper = textureLoader.load('/assets/glb/textures/Std_Upper_Teeth_Diffuse.png');
    var lower = textureLoader.load('/assets/glb/textures/Std_Lower_Teeth_Diffuse.png');
    var hair01 = textureLoader.load('/assets/glb/textures/Hair_Diffuse_0001.png');
    var corneaL = textureLoader.load('/assets/glb/textures/Std_Cornea_L_Diffuse.png');
    var eyeL = textureLoader.load('/assets/glb/textures/Std_Eye_L_Diffuse.png');
    var corneaR = textureLoader.load('/assets/glb/textures/Std_Cornea_R_Diffuse.png');
    var eyeR = textureLoader.load('/assets/glb/textures/Std_Eye_R_Diffuse.png');
    var eyeRO = textureLoader.load('/assets/glb/textures/Std_Eye_Occlusion_R_Diffuse.jpg');
    var eyeLO = textureLoader.load('/assets/glb/textures/Std_Eye_Occlusion_L_Diffuse.jpg');
    var hair02 = textureLoader.load('/assets/glb/textures/Hair_Transparency_Diffuse.png');
    var scalp = textureLoader.load('/assets/glb/textures/Scalp_Transparency_Diffuse.jpg');
    var hair02Material = new THREE.MeshPhongMaterial({map:hair02});
    var eyeLOMaterial = new THREE.MeshPhongMaterial({map:eyeLO});
    var eyeROMaterial = new THREE.MeshPhongMaterial({map:eyeRO});
    var eyeLMaterial = new THREE.MeshPhongMaterial({map:eyeL});
    var corneaLMaterial = new THREE.MeshPhongMaterial({map: corneaL});
    var eyeRMaterial = new THREE.MeshPhongMaterial({map:eyeR});
    var corneaRMaterial = new THREE.MeshPhongMaterial({map: corneaR});
    var lowerMaterial = new THREE.MeshPhongMaterial({map: lower});
    var upperMaterial = new THREE.MeshPhongMaterial({map: upper});
    var tongueMaterial = new THREE.MeshPhongMaterial({map: tongue});
    var skirtMaterial = new THREE.MeshPhongMaterial({map: skirt});
    var tearLMaterial = new THREE.MeshPhongMaterial({map: tearL});
    var tearRMaterial = new THREE.MeshPhongMaterial({map: tearR});
    var bodyMaterial = new THREE.MeshPhongMaterial({map: body});
    var headMaterial = new THREE.MeshPhongMaterial({map: head});
    var armMaterial = new THREE.MeshPhongMaterial({map: arm});
    var legMaterial = new THREE.MeshPhongMaterial({map: leg});
    var nailMaterial = new THREE.MeshPhongMaterial({map: nails});
    var eyelashMaterial = new THREE.MeshPhongMaterial({map: eyelash});
    var hairMaterial = new THREE.MeshPhongMaterial({map: hair});
    var hair01Material = new THREE.MeshPhongMaterial({map: hair01});
    var scalpMaterial = new THREE.MeshPhongMaterial({map: scalp});

    const loader = new FBXLoader(this._manager);
    loader.setPath('/assets/glb/');
    loader.load('dude45g.fbx', (fbx) => {
      fbx.scale.setScalar(0.1);
      fbx.traverse(c => {
        c.castShadow = true;

        if ( c.isMesh ) {
          if ( c.name == "CC_Base_Body"){
           c.material[0] = skirtMaterial;
           c.material[1] = scalpMaterial;
           c.material[2] = hair02Material;
           c.material[3] = eyeROMaterial;
           c.material[4] = eyeLOMaterial;
           c.material[5] = eyeRMaterial;
           c.material[6] = corneaRMaterial;
           c.material[7] = eyeLMaterial;
           c.material[8] = corneaLMaterial;
           c.material[9] = hairMaterial;
          c.material[0] = headMaterial;
          c.material[1] = bodyMaterial;
          c.material[2] = armMaterial;
          c.material[3] = legMaterial;
          c.material[4] = nailMaterial;
          c.material[5] = eyelashMaterial;
           c.material[16] = tearRMaterial;
           c.material[17] = tearLMaterial;
           c.material[18] = tongueMaterial;
           c.material[19] = upperMaterial;
          c.material[20] = lowerMaterial;
          c.material[21] = hair01Material;
          console.log('working'); 
          }
          if ( c.name == "Double_high"){
            c.material[0] = scalpMaterial;
            c.material[1] = hair02Material;
            
            
            };
            
            if ( c.name == "CC_Base_EyeOcclusion"){
            c.material[0] = eyeROMaterial;
            c.material[1] = eyeLOMaterial;
            
            };
            
            if ( c.name == "CC_Base_Teeth"){
            c.material[0] = upperMaterial;
            c.material[1] = lowerMaterial;
            
            };
            if ( c.name == "A7_0310001"){
            c.material[0] = hairMaterial;
            c.material[1] = hairMaterial;
            };
            if ( c.name == "A7_0310"){
            c.material[0] = hairMaterial;
            c.material[1] = hair01Material;
            };
            
            if ( c.name ==  "CC_Base_Eye"){
            c.material[0] = eyeRMaterial;
            c.material[1] = corneaRMaterial;
            c.material[2] = eyeLMaterial;
            c.material[3] = corneaLMaterial;
            };
            
            if ( c.name == "CC_Base_TearLine"){
            c.material[16] = tearRMaterial;
            c.material[17] = tearLMaterial;
            };
            if ( c.name == "CC_Base_Tongue"){
            c.material[0] = tongueMaterial;
            }
        }

      });

      this._target = fbx;
      this._params.scene.add(this._target);

      this._mixer = new THREE.AnimationMixer(this._target);

      
	  //
	  
	    
    this._manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
      console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
      console.log( `Started loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files. (${((itemsLoaded / itemsTotal) * 100).toFixed(2)}%)`);
    };
    
    this._manager.onLoad = function ( ) {
      console.log( 'Loading complete!');
      
    document.getElementById('loader1').remove()
      
    };
    
    this._manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
      console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
      console.log( `Started loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files. (${((itemsLoaded / itemsTotal) * 100).toFixed(2)}%)`);
    };
    
    this._manager.onError = function ( url ) {
      console.log( 'There was an error loading ' + url );
    };
	  
	  //
      this._manager.onLoad = () => {
        this._stateMachine.SetState('idle');
      };

      const _OnLoad = (animName, anim) => {
        const clip = anim.animations[0];
        const action = this._mixer.clipAction(clip);
  
        this._animations[animName] = {
          clip: clip,
          action: action,
        };
      };

      const loader = new FBXLoader(this._manager);
      loader.setPath('/assets/glb/actions/');
      loader.load('walk.fbx', (a) => { _OnLoad('walk', a); });
      loader.load('run.fbx', (a) => { _OnLoad('run', a); });
      loader.load('idle.fbx', (a) => { _OnLoad('idle', a); });
      loader.load('dance.fbx', (a) => { _OnLoad('dance', a); });
    });
  }

  Update(timeInSeconds) {
    if (!this._target) {
      return;
    }

    this._stateMachine.Update(timeInSeconds, this._input);

    const velocity = this._velocity;
    const frameDecceleration = new THREE.Vector3(
        velocity.x * this._decceleration.x,
        velocity.y * this._decceleration.y,
        velocity.z * this._decceleration.z
    );
    frameDecceleration.multiplyScalar(timeInSeconds);
    frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
        Math.abs(frameDecceleration.z), Math.abs(velocity.z));

    velocity.add(frameDecceleration);

    const controlObject = this._target;
    const _Q = new THREE.Quaternion();
    const _A = new THREE.Vector3();
    const _R = controlObject.quaternion.clone();

    const acc = this._acceleration.clone();
    if (this._input._keys.shift) {
      acc.multiplyScalar(2.0);
    }

    if (this._stateMachine._currentState.Name == 'dance') {
      acc.multiplyScalar(0.0);
    }

    if (this._input._keys.forward) {
      velocity.z += acc.z * timeInSeconds;
    }
    if (this._input._keys.backward) {
      velocity.z -= acc.z * timeInSeconds;
    }
    if (this._input._keys.left) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * Math.PI * timeInSeconds * this._acceleration.y);
      _R.multiply(_Q);
    }
    if (this._input._keys.right) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * timeInSeconds * this._acceleration.y);
      _R.multiply(_Q);
    }

    controlObject.quaternion.copy(_R);

    const oldPosition = new THREE.Vector3();
    oldPosition.copy(controlObject.position);

    const forward = new THREE.Vector3(0, 0, 1);
    forward.applyQuaternion(controlObject.quaternion);
    forward.normalize();

    const sideways = new THREE.Vector3(1, 0, 0);
    sideways.applyQuaternion(controlObject.quaternion);
    sideways.normalize();

    sideways.multiplyScalar(velocity.x * timeInSeconds);
    forward.multiplyScalar(velocity.z * timeInSeconds);

    controlObject.position.add(forward);
    controlObject.position.add(sideways);

    oldPosition.copy(controlObject.position);

    if (this._mixer) {
      this._mixer.update(timeInSeconds);
    }
  }
};

class BasicCharacterControllerInput {
  constructor() {
    this._Init();    
  }

  _Init() {
    this._keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      space: false,
      shift: false,
    };
    document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
    document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
  }

  _onKeyDown(event) {
    switch (event.keyCode) {
      case 87: // w
        this._keys.forward = true;
        break;
      case 65: // a
        this._keys.left = true;
        break;
      case 83: // s
        this._keys.backward = true;
        break;
      case 68: // d
        this._keys.right = true;
        break;
      case 32: // SPACE
        this._keys.space = true;
        break;
      case 16: // SHIFT
        this._keys.shift = true;
        break;
    }
  }

  _onKeyUp(event) {
    switch(event.keyCode) {
      case 87: // w
        this._keys.forward = false;
        break;
      case 65: // a
        this._keys.left = false;
        break;
      case 83: // s
        this._keys.backward = false;
        break;
      case 68: // d
        this._keys.right = false;
        break;
      case 32: // SPACE
        this._keys.space = false;
        break;
      case 16: // SHIFT
        this._keys.shift = false;
        break;
    }
  }
};


class FiniteStateMachine {
  constructor() {
    this._states = {};
    this._currentState = null;
  }

  _AddState(name, type) {
    this._states[name] = type;
  }

  SetState(name) {
    const prevState = this._currentState;
    
    if (prevState) {
      if (prevState.Name == name) {
        return;
      }
      prevState.Exit();
    }

    const state = new this._states[name](this);

    this._currentState = state;
    state.Enter(prevState);
  }

  Update(timeElapsed, input) {
    if (this._currentState) {
      this._currentState.Update(timeElapsed, input);
    }
  }
};


class CharacterFSM extends FiniteStateMachine {
  constructor(proxy) {
    super();
    this._proxy = proxy;
    this._Init();
  }

  _Init() {
    this._AddState('idle', IdleState);
    this._AddState('walk', WalkState);
    this._AddState('run', RunState);
    this._AddState('dance', DanceState);
  }
};


class State {
  constructor(parent) {
    this._parent = parent;
  }

  Enter() {}
  Exit() {}
  Update() {}
};


class DanceState extends State {
  constructor(parent) {
    super(parent);

    this._FinishedCallback = () => {
      this._Finished();
    }
  }

  get Name() {
    return 'dance';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['dance'].action;
    const mixer = curAction.getMixer();
    mixer.addEventListener('finished', this._FinishedCallback);

    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.reset();  
      curAction.setLoop(THREE.LoopOnce, 1);
      curAction.clampWhenFinished = true;
      curAction.crossFadeFrom(prevAction, 0.2, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  _Finished() {
    this._Cleanup();
    this._parent.SetState('idle');
  }

  _Cleanup() {
    const action = this._parent._proxy._animations['dance'].action;
    
    action.getMixer().removeEventListener('finished', this._CleanupCallback);
  }

  Exit() {
    this._Cleanup();
  }

  Update(_) {
  }
};


class WalkState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'walk';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['walk'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.enabled = true;

      if (prevState.Name == 'run') {
        const ratio = curAction.getClip().duration / prevAction.getClip().duration;
        curAction.time = prevAction.time * ratio;
      } else {
        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
      }

      curAction.crossFadeFrom(prevAction, 0.5, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  Exit() {
  }

  Update(timeElapsed, input) {
    if (input._keys.forward || input._keys.backward) {
      if (input._keys.shift) {
        this._parent.SetState('run');
      }
      return;
    }

    this._parent.SetState('idle');
  }
};


class RunState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'run';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['run'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.enabled = true;

      if (prevState.Name == 'walk') {
        const ratio = curAction.getClip().duration / prevAction.getClip().duration;
        curAction.time = prevAction.time * ratio;
      } else {
        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
      }

      curAction.crossFadeFrom(prevAction, 0.5, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  Exit() {
  }

  Update(timeElapsed, input) {
    if (input._keys.forward || input._keys.backward) {
      if (!input._keys.shift) {
        this._parent.SetState('walk');
      }
      return;
    }

    this._parent.SetState('idle');
  }
};


class IdleState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'idle';
  }

  Enter(prevState) {
    const idleAction = this._parent._proxy._animations['idle'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;
      idleAction.time = 0.0;
      idleAction.enabled = true;
      idleAction.setEffectiveTimeScale(1.0);
      idleAction.setEffectiveWeight(1.0);
      idleAction.crossFadeFrom(prevAction, 0.5, true);
      idleAction.play();
    } else {
      idleAction.play();
    }
  }

  Exit() {
  }

  Update(_, input) {
    if (input._keys.forward || input._keys.backward) {
      this._parent.SetState('walk');
    } else if (input._keys.space) {
      this._parent.SetState('dance');
    }
  }
};


class CharacterControllerDemo {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
    });
    this._threejs.outputEncoding = THREE.sRGBEncoding;
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setPixelRatio(window.devicePixelRatio);
    this._threejs.setSize(window.innerWidth, window.innerHeight);

 

    document.body.appendChild(this._threejs.domElement);

    window.addEventListener('resize', () => {
      this._OnWindowResize();
    }, false);

    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1.0;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(25, 10, 25);

    this._scene = new THREE.Scene();

    let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(-100, 100, 100);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 4096;
    light.shadow.mapSize.height = 4096;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 50;
    light.shadow.camera.right = -50;
    light.shadow.camera.top = 50;
    light.shadow.camera.bottom = -50;
    this._scene.add(light);

    light = new THREE.AmbientLight(0xFFFFFF, 0.25);
    this._scene.add(light);

    const controls = new OrbitControls(
      this._camera, this._threejs.domElement);
    controls.target.set(0, 10, 0);
    controls.update();

    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        './resources/posx.jpg',
        './resources/negx.jpg',
        './resources/posy.jpg',
        './resources/negy.jpg',
        './resources/posz.jpg',
        './resources/negz.jpg',
    ]);
    texture.encoding = THREE.sRGBEncoding;
    this._scene.background = texture;


const grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
grid.material.opacity = 0.2;
grid.material.transparent = true;
this._scene.add( grid );
    
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry( 2000, 2000, 10, 10),
        new THREE.MeshStandardMaterial({
            color: 0x808080,
          }));
    plane.castShadow = false;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    this._scene.add(plane);

    this._mixers = [];
    this._previousRAF = null;

    this._LoadAnimatedModel();
    this._RAF();
  }

  _LoadAnimatedModel() {
    const params = {
      camera: this._camera,
      scene: this._scene,
    }
    this._controls = new BasicCharacterController(params);
  }

  _LoadAnimatedModelAndPlay(path, modelFile, animFile, offset) {
    const loader = new FBXLoader();
    loader.setPath(path);
    loader.load(modelFile, (fbx) => {
      fbx.scale.setScalar(0.1);
      fbx.traverse(c => {
        c.castShadow = true;
      });
      fbx.position.copy(offset);

      const anim = new FBXLoader();
      anim.setPath(path);
      anim.load(animFile, (anim) => {
        const m = new THREE.AnimationMixer(fbx);
        this._mixers.push(m);
        const idle = m.clipAction(anim.animations[0]);
        idle.play();
      });
      this._scene.add(fbx);
    });
  }

  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }

  _RAF() {
    requestAnimationFrame((t) => {
      if (this._previousRAF === null) {
        this._previousRAF = t;
      }

      this._RAF();

      this._threejs.render(this._scene, this._camera);
      this._Step(t - this._previousRAF);
      this._previousRAF = t;
    });
  }

  _Step(timeElapsed) {
    const timeElapsedS = timeElapsed * 0.001;
    if (this._mixers) {
      this._mixers.map(m => m.update(timeElapsedS));
    }

    if (this._controls) {
      this._controls.Update(timeElapsedS);
    }
  }
}


let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new CharacterControllerDemo();
});
