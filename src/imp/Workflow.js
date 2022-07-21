// Screen Director Reference
import { Workflow as _Workflow } from '../bin/ScreenDirector.js';
// Support Library Reference
import GUI from 'lil-gui';
import * as THREE from 'three';
import { OrbitControls } from '../lib/OrbitControls.js';

// Workflow Implementation
class Workflow extends _Workflow{
  elevated_vars = {
    "u_name": ""
  }

  ActivateOrbitControls = async ( screenplay )=>{
    if( !screenplay.controls.orbit_controls ) {
      screenplay.controls.orbit_controls = new OrbitControls( screenplay.active_cam, screenplay.renderer.domElement );
      screenplay.controls.orbit_controls.zoomSpeed = 4;
      screenplay.controls.orbit_controls.enableDamping = true;
      screenplay.controls.orbit_controls.saveState();
    }
    let _ship = screenplay.actors.Ship;
    switch( screenplay.active_cam.name ){
      case 'ConnCam':
        _ship.conn_station.getWorldPosition( screenplay.controls.orbit_controls.target );
        break;
      case 'OpsCam':
        _ship.ops_station.getWorldPosition( screenplay.controls.orbit_controls.target );
        break;
      case 'CaptainCam':
        _ship.ops_station.getWorldPosition( screenplay.controls.orbit_controls.target );
        break;
    }
    screenplay.controls.orbit_controls.release_distance = 1 + screenplay.controls.orbit_controls.getDistance();
    screenplay.updatables.set( 'controls', screenplay.controls.orbit_controls );
    screenplay.active_cam.user_control = true;
    screenplay.active_cam.updateProjectionMatrix();
    screenplay.controls.orbit_controls.enabled = true;

  }

  DeactivateOrbitControls = async ( screenplay )=>{
    screenplay.controls.orbit_controls.reset();
    screenplay.actions.change_cam( screenplay.active_cam.name );
    screenplay.controls.orbit_controls.enabled = false;
    screenplay.updatables.delete( 'controls' );
    screenplay.active_cam.user_control = false;
  }

  confirm_privileges = async ( screenplay ) => {
    console.log('Workflow.confirm_privileges');
    return window.confirm( 'Allowed?' );
  };
  verify_capabilities = async ( screenplay ) => {
    console.log( 'Workflow.verify_capabilities' );
    return window.confirm( 'You getting this?' );
  };
  introduction = async ( screenplay ) => {
    console.log('Workflow.introduction');
    return window.confirm( 'We are nearly there, cool?' );
  };
  user_introduction = async ( screenplay ) => {
    console.log('Workflow.user_introduction');

    screenplay.renderer.domElement.addEventListener( 'wheel', (event)=>{

        if( !screenplay.active_cam.user_control && event.deltaY > 0 ){
          this.ActivateOrbitControls( screenplay );
        } else if( screenplay.active_cam.user_control && event.deltaY < 0 ){
          if( screenplay.controls.orbit_controls.getDistance() < screenplay.controls.orbit_controls.release_distance ){
            this.DeactivateOrbitControls( screenplay );
          }
        }
    }, { capture: false } );

    return window.alert( 'Howdy!  Ready to go.' );
  };
}

export { Workflow }
