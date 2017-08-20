import dummyImg from './assets/img/dummy.png';
import hourglassImg from './assets/img/hourglass.png';
import emc2Img from './assets/img/emc2.png';
import eyeImg from './assets/img/eye.png';
import windowsImg from './assets/img/windows.png';
import funnelImg from './assets/img/funnel.png';

class ArcData {
  constructor() {
    this.arcDataArray = [ 
      { "descriptor": "eye",
        "dimension": "sight",
        "icon": eyeImg,
      },
      { "descriptor" : "hourglass",
        "dimension": "time",
        "icon": hourglassImg,
      },
      { "descriptor" : "figure",
        "dimension": "things",
        "icon": dummyImg,
      },
      { "descriptor" : "window",
        "dimension": "sound",
        "icon": windowsImg,
      },
      { "descriptor" : "funnel",
        "dimension": "ideas",
        "icon": funnelImg,
      },
      { "descriptor" : "emc2",
        "dimension": "mind",
        "icon": emc2Img,
      },
  
    ];
  }

  getArcData() {
    return this.arcDataArray;
  }
}

export { ArcData };
