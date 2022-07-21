import { ScreenDirector } from './bin/ScreenDirector.js' ;
// ScreenDirector Reference

// ScreenDirector Implementation Library
import { Screenplay } from  './imp/Screenplay.js' ;
import { SceneDirections } from  './imp/SceneDirections.js' ;
import { Manifesto } from  './imp/Manifesto.js' ;
import { Workflow } from  './imp/Workflow.js' ;

let app = {};
app.init = ()=>{

  // Scene Director Implementation
  const screen_play = new Screenplay( );
  const scene_directions = new SceneDirections();
  const workflow = new Workflow();
  const manifesto = new Manifesto( scene_directions, workflow );

  const scene_director = new ScreenDirector(screen_play, manifesto, false);

  // Main Logic
  scene_director.start();

}

// Execute initialization prior to exportation
app.init();
