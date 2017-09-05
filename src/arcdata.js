import dummyImg from './assets/img/figure.svg';
import hourglassImg from './assets/img/hourglass.svg';
import emc2Img from './assets/img/emc2.svg';
import eyeImg from './assets/img/eye.svg';
import windowsImg from './assets/img/window.svg';
import funnelImg from './assets/img/funnel.svg';

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
