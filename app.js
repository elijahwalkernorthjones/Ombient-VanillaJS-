const chakras = document.querySelectorAll('.chakras');

// import * as Tone from 'tone';

// Tone.js instantiation with a slower attack for smoother onset
const synth = new Tone.PolySynth(Tone.Synth, {
  envelope: {
    attack: 5,   // Increased attack time for a softer onset
    decay: 2.5,  // Sufficient decay
    sustain: 0.8,// Sustain level
    release: 1.5 // Release time
  }
});

// Create reverb effect with more reasonable settings
const reverb = new Tone.Reverb({
  decay: 4,     // Shorter decay time
  wet: 0.3      // Lower wet mix for a blend of dry and wet signals
});

// Connect synth to reverb
synth.connect(reverb);

// Create a volume control and set to -12 dB for headroom management
const volume = new Tone.Volume(-12);

// Connect reverb to volume control
reverb.connect(volume);

// Create a compressor to control dynamics at the end of the chain
const compressor = new Tone.Compressor({
  threshold: -20, // Threshold in dB
  ratio: 6,       // Compression ratio
  attack: 0.005,  // Attack time in seconds
  release: 0.25   // Release time in seconds
});

// Connect volume to compressor, then to destination
volume.connect(compressor);
compressor.toDestination();





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
    console.clear();
    // Log when a chakra is clicked
    console.log('Chakra clicked:', chakra.id);

    const isEnlarged = chakra.classList.contains('largeChakra');
    console.log('Is enlarged before click?', isEnlarged);

    if (isEnlarged) {
      chakra.classList.remove('largeChakra');
      chakra.style.transform = ''; // Reset transform if needed
      console.log('Enlarged class removed and transform reset for:', chakra.id);
    } else {
      // Reset all chakras before enlarging the clicked one
      resetChakras();
      chakra.classList.add('largeChakra');
      // Directly set the transform to ensure it stays enlarged
      chakra.style.transform = 'scale(2.9)';
      console.log('Enlarged class added and transform set for:', chakra.id);
    }
  });
});

function resetChakras() {
  chakras.forEach(chakra => {
      chakra.classList.remove('largeChakra');
      chakra.style.transform = ''; // Reset any inline style
      // Log each chakra being reset
      console.log('Resetting chakra:', chakra.id);
  });
}








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
let earthChakra = dorianFreq.slice(0, 20);
let fireChakra = dorianFreq.slice(20, 25);
let waterChakra = dorianFreq.slice(25, 30);
let windChakra = dorianFreq.slice(30, 35);
let soundChakra = dorianFreq.slice(35, 40);
let lightChakra = dorianFreq.slice(45, 55);
let cosmicChakra = dorianFreq.slice(55); // This will get the remaining notes

// Log the chakra arrays to verify
console.log("Earth Chakra:", earthChakra);
console.log("Fire Chakra:", fireChakra);
console.log("Water Chakra:", waterChakra);
console.log("Wind Chakra:", windChakra);
console.log("Sound Chakra:", soundChakra);
console.log("Light Chakra:", lightChakra);
console.log("Cosmic Chakra:", cosmicChakra);



// Example Note Arrays for Each Chakra (previously defined)
const chakraNotes = {
  'chakra7': earthChakra,
  'chakra6': fireChakra,
  'chakra5': waterChakra,
  'chakra4': windChakra,
  'chakra3': soundChakra,
  'chakra2': lightChakra,
  'chakra1': cosmicChakra
};

// State object to keep track of which chakras are playing
const chakraStates = {};

// Initialize chakra states
chakras.forEach(chakra => {
  chakraStates[chakra.id] = { playing: false, note: chakraNotes[chakra.id][0] };
});

// Add click event listeners to each chakra
chakras.forEach(chakra => {
  chakra.addEventListener('click', async () => {
      await Tone.start(); // Ensure the audio context is ready
      const state = chakraStates[chakra.id];

      if (state.playing) {
          // If the chakra is currently playing, stop the note
          synth.triggerRelease(frequencyToNoteMap[state.note]);
          state.playing = false;
          console.log('Stopped playing:', chakra.id);
      } else {
          // Not playing, so start playing
          const note = frequencyToNoteMap[state.note];
          synth.triggerAttack(note);
          state.playing = true;
          console.log('Started playing:', chakra.id, note);

          // Stop the note after 1 minute automatically
          setTimeout(() => {
              if (state.playing) {
                  synth.triggerRelease(note);
                  state.playing = false;
                  console.log('Automatically stopped playing after 1 minute:', chakra.id);
              }
          }, 30000); // 30 seconds
      }
  });
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
