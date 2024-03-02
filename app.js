const chakras = document.querySelectorAll('.chakras');

const playBTN = document.getElementById("btn")
// Tone.js instantiation
const synth = new Tone.Synth().toDestination();

//All Notes Audible To The Human Ear - 115 
const allNotes = [     
    27.5, //  A0 
    29.135, //A0#
    30.868, //B0
    32.703,// C1
    34.648, //C1#
    36.708,// D1
    38.891, //D1#
    41.203,//E1 
    43.654, //F1
    46.249, //F1#
    48.999,//G1 
    51.913, // G1#
    55.000, // A1 
    58.270, //A1#
    61.735, //B1 
    65.406, //C2   
    69.296, //C2#
    73.416, //D2   
    77.782, //D2#
    82.407, //E2    
    87.307, //F2
    92.499, //F2#   
    97.999, //G2   
    103.83, //G2#
    110.00, //A2   
    116.54, //A2#
    123.47, //B2   
    130.81, //C3   
    138.59, //C3#
    146.83, // D3   
    155.56, //D3#
    164.81, //E3   
    174.61,// F3
    185.00, //F3#   
    196.00, //G3   
    207.65, //G3#
    220.00, //A3   
    233.08, //A3#
    246.94, //B3   
    261.63, //C4   
    277.18, //C4#
    293.66, //D4   
    311.13, //D4#
    329.63, //E4   
    349.23, //F4
    369.99,//F4#   
    392.00, //G4   
    415.30, //G4# 
    440.00, //A4   
    466.16, //A4# 
    493.88, //B4    
    523.25, //C5  
    554.37, //C5#
    587.33, //D5  
    622.25, //D5#
    659.25, //E5   
    698.46, //F5
    739.99, //F5#   
    783.99, //G5   
    830.61, //G5#
    880.00, //A5   
    932.33, //A5#
    987.77, //B5   
    1046.5, //C6  
    1108.7, //C6#
    1174.7, //D6  
    1244.5, //D6#
    1318.5, //E6  
    1396.9, //F6
    1480.0, //F6#  
    1568.0, //G6  
    1661.2, //G6#
    1760.0, //A6  
    1864.7, //A6#
    1979.5, //B6   
    2093.0, //C7   
    2217.5, //C7#
    2349.3, //D7   
    2489.0, //D7#
    2637.0, //E7   
    2793.8, //F7
    2960.0, //F7#  
    3136.0, //G7  
    3322.4, //G7#
    3530.0, //A7  
    3729.3, //A7#
    3951.1, //B7  
    4186.0, //C8  
    4435.0, //C8#
    4699.0, //D8  
    4978.0, //D8#
    5274.0, //E8  
    5588.0, //F8
    5920.0, //F8#  
    6272.0, //G8  
    6645.0, //G8#
    7040.0, //A8  
    7459.0, //A8#
    7902.0, //B8  
    8372.0, //C9  
    8870.0, //C9#
    9397.0, //D9  
    9956.0, //D9#
    10548, //E9   
    11175, // F9
    11840, //F9#   
    12544, //G9   
    13290, //G9#
    14080, //A9   
    14917, //A9#
    15804, //B9   
    16744, //Cten   
    17740, //Cten#
    18795, //Dten   
    19912 //Dten#
]
// mapping the frequencies to Tone.js naming conventions (Hertz to actual notes)
const frequencyToNoteMap = {
    27.5: 'A0',
    29.135: 'A#0',
    30.868: 'B0',
    32.703: 'C1',
    34.648: 'C#1',
    36.708: 'D1',
    38.891: 'D#1',
    41.203: 'E1',
    43.654: 'F1',
    46.249: 'F#1',
    48.999: 'G1',
    51.913: 'G#1',
    55.0: 'A1',
    58.27: 'A#1',
    61.735: 'B1',
    65.406: 'C2',
    69.296: 'C#2',
    73.416: 'D2',
    77.782: 'D#2',
    82.407: 'E2',
    87.307: 'F2',
    92.499: 'F#2',
    97.999: 'G2',
    103.83: 'G#2',
    110.0: 'A2',
    116.54: 'A#2',
    123.47: 'B2',
    130.81: 'C3',
    138.59: 'C#3',
    146.83: 'D3',
    155.56: 'D#3',
    164.81: 'E3',
    174.61: 'F3',
    185.0: 'F#3',
    196.0: 'G3',
    207.65: 'G#3',
    220.0: 'A3',
    233.08: 'A#3',
    246.94: 'B3',
    261.63: 'C4',
    277.18: 'C#4',
    293.66: 'D4',
    311.13: 'D#4',
    329.63: 'E4',
    349.23: 'F4',
    369.99: 'F#4',
    392.0: 'G4',
    415.3: 'G#4',
    440.0: 'A4',
    466.16: 'A#4',
    493.88: 'B4',
    523.25: 'C5',
    554.37: 'C#5',
    587.33: 'D5',
    622.25: 'D#5',
    659.25: 'E5',
    698.46: 'F5',
    739.99: 'F#5',
    783.99: 'G5',
    830.61: 'G#5',
    880.0: 'A5',
    932.33: 'A#5',
    987.77: 'B5',
    1046.5: 'C6',
    1108.7: 'C#6',
    1174.7: 'D6',
    1244.5: 'D#6',
    1318.5: 'E6',
    1396.9: 'F6',
    1480.0: 'F#6',
    1568.0: 'G6',
    1661.2: 'G#6',
    1760.0: 'A6',
    1864.7: 'A#6',
    1979.5: 'B6',
    2093.0: 'C7',
    2217.5: 'C#7',
    2349.3: 'D7',
    2489.0: 'D#7',
    2637.0: 'E7',
    2793.8: 'F7',
    2960.0: 'F#7',
    3136.0: 'G7',
    3322.4: 'G#7',
    3530.0: 'A7',
    3729.3: 'A#7',
    3951.1: 'B7',
    4186.0: 'C8',
    4435.0: 'C#8',
    4699.0: 'D8',
    4978.0: 'D#8',
    5274.0: 'E8',
    5588.0: 'F8',
    5920.0: 'F#8',
    6272.0: 'G8',
    6645.0: 'G#8',
    7040.0: 'A8',
    7459.0: 'A#8',
    7902.0: 'B8',
    8372.0: 'C9',
    8870.0: 'C#9',
    9397.0: 'D9',
    9956.0: 'D#9',
    10548: 'E9',
    11175: 'F9',
    11840: 'F#9',
    12544: 'G9',
    13290: 'G#9',
    14080: 'A9',
    14917: 'A#9',
    15804: 'B9',
    16744: 'C10',
    17740: 'C#10',
    18795: 'D10',
    19912: 'D#10'
};
//An array of sequenced Dorian intervals 
const dorianIntervals = [ 
    2,1,2,2,2,1,2,       
    2,1,2,2,2,1,2,
    2,1,2,2,2,1,2,
    2,1,2,2,2,1,2,
    2,1,2,2,2,1,2,
    2,1,2,2,2,1,2,
    2,1,2,2,2,1,2,
    2,1,2,2,2,1,2,
    2,1,2,2,2,1,2,
    2,1,2,2,2,1,2,
    2,1,2,2,2,1,2,
    2,1,2,2,2,1,2,
    2,1,2,2,2,1,2,
    2,1,2,2,2,1,2,
    2,1,2,2,2,1,2,
    2,1,2,2,2,1,2,
    2,1,2
]; 



// TOGGLE CLASS FUNCTION TO ENLARGE CHAKRAS ON CLICK & ADD LARGE CHAKRA CLASS
chakras.forEach((chakra) => {
  chakra.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log('chakra clicked:', chakra)

    const isEnlarged = chakra.classList.contains('largeChakra');
    // console.log('Is enlarged?', isEnlarged);

    // Check if any chakra is currently enlarged
    const enlargedChakra = document.querySelector('.largeChakra');
    // console.log('Enlarged chakra:', enlargedChakra);

    if (enlargedChakra) {
      // console.log('Removing largeChakra class from another chakra:', enlargedChakra);
      // If a chakra is already enlarged and it's not the one that was clicked, remove the "largeChakra" class and reset its transform
      if (enlargedChakra !== chakra) {
        enlargedChakra.classList.remove('largeChakra');
      }
    }

    // Toggle the "largeChakra" class and transform of the clicked chakra
    if (isEnlarged) {
      // console.log('Removing largeChakra class from the clicked chakra:', chakra);
      chakra.classList.remove('largeChakra');
    } else {
      // console.log('Adding largeChakra class to the clicked chakra:', chakra);
      chakra.classList.add('largeChakra');
    }
  });
});













// INTERVALS --> INDEX
// Get the mode intervals mapped to indices in an array dorianIntervals(2,1,2,2,2,1,2) -> dorianIndices(0,2,3,5,7,9,10)etc
const randomTonic = (Math.floor(Math.random()*13));
let dorianIndices = [];
let n1 = 0;

for (let i = randomTonic; i < allNotes.length; i++){
    
    dorianIndices.push(n1)

    if (dorianIntervals[i] === 0){ 
        break;
    } else if (dorianIntervals[i] === 1){
        n1 += 1
    }   else if (dorianIntervals[i] === 2){
        n1 += 2;
        }
    if (n1 > 115){
        break
    }
}
console.log(` randomTonic says starting index is : ${randomTonic}`)
console.log(dorianIndices)


//INDEX --> FREQUENCY
//Loop to turn indices into their respective frequencies //
let dorianFreq = []

for(let i = 0; i < 67; i++) {
    dorianFreq.push(allNotes.at(dorianIndices[i]));    
    //to test index compared to frequency
    // console.log(`index : ${dorianIndices[i]} frequency : ${allNotes.at(dorianIndices[i])}`) 
}
console.log(dorianFreq)
console.log(dorianFreq.length)
// console.log(dorianIndices) // -- the intervals throughout the new Dorian array

// Assign portions of dorianFreq to chakra arrays
let earthChakra = dorianFreq.slice(0, 10);
let fireChakra = dorianFreq.slice(10, 20);
let waterChakra = dorianFreq.slice(20, 30);
let windChakra = dorianFreq.slice(30, 40);
let soundChakra = dorianFreq.slice(40, 50);
let lightChakra = dorianFreq.slice(50, 60);
let cosmicChakra = dorianFreq.slice(60); // This will get the remaining notes

// Log the chakra arrays to verify
console.log("Earth Chakra:", earthChakra);
console.log("Fire Chakra:", fireChakra);
console.log("Water Chakra:", waterChakra);
console.log("Wind Chakra:", windChakra);
console.log("Sound Chakra:", soundChakra);
console.log("Light Chakra:", lightChakra);
console.log("Cosmic Chakra:", cosmicChakra);






// Function to play the Dorian scale using Tone.js
function playScale(chakraType) {
    // Loop through the dorianFreq array
    for (let i = 0; i < chakraType.length; i++) {
        // Look up the note name from the frequency
        let noteName = frequencyToNoteMap[chakraType[i]];

        // Trigger the note with Tone.js after a delay based on the index
        // (to play the notes sequentially)
        synth.triggerAttackRelease(noteName, '8n', Tone.now() + i * 1.5);
    }
}




chakra1.addEventListener("click", async () => {
  await Tone.start();
  console.log('Audio context started');
  playScale(fireChakra);
});



/** Now I need to create 7 different sections that define each chakra note range. 
 * 
 * 7 chakras
 * never more than 67 notes 
 * 
 * first 6 chakras get 10 notes each then the last gets 7
 * 
 * 
 * 
 * 
 */
