import React from 'react';

const  viewdata = [
  {
    "name": "Bedroom",
    "background": "#da7",
    "items": [
      {
        "svg": <circle cx={25} cy={25} r={25} fill="purple" />,
        "name": "ceilingLight",
        "puzzleTitle": "Mute",
        "requiredItems": ["nozzle", "hose"],
        "isHidden": false,
      },
      {
        "svg": <circle cx={25} cy={25} r={25} fill="yellow" />,
        "name": "pillow",
        "puzzleTitle": "",
        "requiredItems": [],
        "isHidden": false,
        "top": "5%",
        "left": "43%",
      },
      {
        "svg": <g>
               <path className="path1" d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
               <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
               </g>,
        "name": "trashCan",
        "puzzleTitle": "traceMonkey",
        "requiredItems": ["hose", "nozzle"],
        "isHidden": false,
        "top": "80%",
        "left": "80%",
      },
      {
        "svg": <rect x="0" y="0" width="100%" height="100%" fill="purple" />,
        "name": "bed",
        "puzzleTitle": "Test Monkey",
        "requiredItems": [],
        "isHidden": false,
        "top": "40%",
        "left": "66%",
      },
    ]
  }
];

export {viewdata};
