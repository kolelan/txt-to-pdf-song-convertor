// Карта MIDI нот для всех октав
export const midiNotes = {
    'C0': 12, 'C#0': 13, 'Db0': 13, 'D0': 14, 'D#0': 15, 'Eb0': 15, 'E0': 16, 'F0': 17, 'F#0': 18, 'Gb0': 18, 'G0': 19, 'G#0': 20, 'Ab0': 20, 'A0': 21, 'A#0': 22, 'Bb0': 22, 'B0': 23,
    'C1': 24, 'C#1': 25, 'Db1': 25, 'D1': 26, 'D#1': 27, 'Eb1': 27, 'E1': 28, 'F1': 29, 'F#1': 30, 'Gb1': 30, 'G1': 31, 'G#1': 32, 'Ab1': 32, 'A1': 33, 'A#1': 34, 'Bb1': 34, 'B1': 35,
    'C2': 36, 'C#2': 37, 'Db2': 37, 'D2': 38, 'D#2': 39, 'Eb2': 39, 'E2': 40, 'F2': 41, 'F#2': 42, 'Gb2': 42, 'G2': 43, 'G#2': 44, 'Ab2': 44, 'A2': 45, 'A#2': 46, 'Bb2': 46, 'B2': 47,
    'C3': 48, 'C#3': 49, 'Db3': 49, 'D3': 50, 'D#3': 51, 'Eb3': 51, 'E3': 52, 'F3': 53, 'F#3': 54, 'Gb3': 54, 'G3': 55, 'G#3': 56, 'Ab3': 56, 'A3': 57, 'A#3': 58, 'Bb3': 58, 'B3': 59,
    'C4': 60, 'C#4': 61, 'Db4': 61, 'D4': 62, 'D#4': 63, 'Eb4': 63, 'E4': 64, 'F4': 65, 'F#4': 66, 'Gb4': 66, 'G4': 67, 'G#4': 68, 'Ab4': 68, 'A4': 69, 'A#4': 70, 'Bb4': 70, 'B4': 71,
    'C5': 72, 'C#5': 73, 'Db5': 73, 'D5': 74, 'D#5': 75, 'Eb5': 75, 'E5': 76, 'F5': 77, 'F#5': 78, 'Gb5': 78, 'G5': 79, 'G#5': 80, 'Ab5': 80, 'A5': 81, 'A#5': 82, 'Bb5': 82, 'B5': 83,
    'C6': 84, 'C#6': 85, 'Db6': 85, 'D6': 86, 'D#6': 87, 'Eb6': 87, 'E6': 88, 'F6': 89, 'F#6': 90, 'Gb6': 90, 'G6': 91, 'G#6': 92, 'Ab6': 92, 'A6': 93, 'A#6': 94, 'Bb6': 94, 'B6': 95,
    'C7': 96, 'C#7': 97, 'Db7': 97, 'D7': 98, 'D#7': 99, 'Eb7': 99, 'E7': 100, 'F7': 101, 'F#7': 102, 'Gb7': 102, 'G7': 103, 'G#7': 104, 'Ab7': 104, 'A7': 105, 'A#7': 106, 'Bb7': 106, 'B7': 107,
    'C8': 108, 'C#8': 109, 'Db8': 109, 'D8': 110, 'D#8': 111, 'Eb8': 111, 'E8': 112, 'F8': 113, 'F#8': 114, 'Gb8': 114, 'G8': 115, 'G#8': 116, 'Ab8': 116, 'A8': 117, 'A#8': 118, 'Bb8': 118, 'B8': 119
};

// Аккорды по умолчанию (мажорные, минорные и все септаккорды в 3-й октаве)
// Включает: мажорные (C, C#, D, ...), минорные (Cm, C#m, Dm, ...),
// Major 7th (Cmaj7, C#maj7, ...), Minor 7th (Cm7, C#m7, ...),
// Dominant 7th (C7, C#7, ...), Diminished 7th (Cdim7, C#dim7, ...),
// Half-diminished 7th (Cm7b5, C#m7b5, ...), Augmented 7th (Caug7, C#aug7, ...)
export const defaultChordNotes = {
    'C':  { notes: ['C3', 'E3', 'G3'], name: 'До мажор' },
    'C#': { notes: ['C#3', 'F3', 'G#3'], name: 'До-диез мажор' },
    'Cb': { notes: ['B3', 'D#4', 'F#4'], name: 'До-бемоль мажор' }, // Энгармонически B мажор
    'Db': { notes: ['Db3', 'F3', 'Ab3'], name: 'Ре-бемоль мажор' },
    'D':  { notes: ['D3', 'F#3', 'A3'], name: 'Ре мажор' },
    'D#': { notes: ['D#3', 'G3', 'A#3'], name: 'Ре-диез мажор' },
    'Eb': { notes: ['Eb3', 'G3', 'Bb3'], name: 'Ми-бемоль мажор' },
    'E':  { notes: ['E3', 'G#3', 'B3'], name: 'Ми мажор' },
    'E#': { notes: ['F3', 'A3', 'C4'], name: 'Ми-диез мажор' }, // Энгармонически F мажор
    'F':  { notes: ['F3', 'A3', 'C4'], name: 'Фа мажор' },
    'Fb': { notes: ['E3', 'G#3', 'B3'], name: 'Фа-бемоль мажор' }, // Энгармонически E мажор
    'F#': { notes: ['F#3', 'A#3', 'C#4'], name: 'Фа-диез мажор' },
    'Gb': { notes: ['Gb3', 'Bb3', 'Db4'], name: 'Соль-бемоль мажор' },
    'G':  { notes: ['G3', 'B3', 'D4'], name: 'Соль мажор' },
    'G#': { notes: ['G#3', 'C4', 'D#4'], name: 'Соль-диез мажор' },
    'Ab': { notes: ['Ab3', 'C4', 'Eb4'], name: 'Ля-бемоль мажор' },
    'A':  { notes: ['A3', 'C#4', 'E4'], name: 'Ля мажор' },
    'A#': { notes: ['A#3', 'D4', 'F4'], name: 'Ля-диез мажор' },
    'Bb': { notes: ['Bb3', 'D4', 'F4'], name: 'Си-бемоль мажор' },
    'B':  { notes: ['B3', 'D#4', 'F#4'], name: 'Си мажор' },
    'B#': { notes: ['C4', 'E4', 'G4'], name: 'Си-диез мажор' }, // Энгармонически C мажор
    'Cm':  { notes: ['C3', 'Eb3', 'G3'], name: 'До минор' },
    'C#m': { notes: ['C#3', 'E3', 'G#3'], name: 'До-диез минор' },
    'Cbm': { notes: ['B3', 'D4', 'F#4'], name: 'До-бемоль минор' }, // Энгармонически B минор
    'Dbm': { notes: ['Db3', 'E3', 'Ab3'], name: 'Ре-бемоль минор' },
    'Dm':  { notes: ['D3', 'F3', 'A3'], name: 'Ре минор' },
    'D#m': { notes: ['D#3', 'F#3', 'A#3'], name: 'Ре-диез минор' },
    'Ebm': { notes: ['Eb3', 'Gb3', 'Bb3'], name: 'Ми-бемоль минор' },
    'Em':  { notes: ['E3', 'G3', 'B3'], name: 'Ми минор' },
    'E#m': { notes: ['F3', 'Ab3', 'C4'], name: 'Ми-диез минор' }, // Энгармонически F минор
    'Fm':  { notes: ['F3', 'Ab3', 'C4'], name: 'Фа минор' },
    'Fbm': { notes: ['E3', 'G3', 'B3'], name: 'Фа-бемоль минор' }, // Энгармонически E минор
    'F#m': { notes: ['F#3', 'A3', 'C#4'], name: 'Фа-диез минор' },
    'Gbm': { notes: ['Gb3', 'A3', 'Db4'], name: 'Соль-бемоль минор' },
    'Gm':  { notes: ['G3', 'Bb3', 'D4'], name: 'Соль минор' },
    'G#m': { notes: ['G#3', 'B3', 'D#4'], name: 'Соль-диез минор' },
    'Abm': { notes: ['Ab3', 'B3', 'Eb4'], name: 'Ля-бемоль минор' },
    'Am':  { notes: ['A3', 'C4', 'E4'], name: 'Ля минор' },
    'A#m': { notes: ['A#3', 'C#4', 'F4'], name: 'Ля-диез минор' },
    'Bbm': { notes: ['Bb3', 'Db4', 'F4'], name: 'Си-бемоль минор' },
    'Bm':  { notes: ['B3', 'D4', 'F#4'], name: 'Си минор' },
    'B#m': { notes: ['C4', 'Eb4', 'G4'], name: 'Си-диез минор' }, // Энгармонически C минор
    
    // Major 7th (maj7, M7) - мажорные септаккорды: 1-3-5-7
    'Cmaj7':  { notes: ['C3', 'E3', 'G3', 'B3'], name: 'До мажор септаккорд' },
    'C#maj7': { notes: ['C#3', 'F3', 'G#3', 'C4'], name: 'До-диез мажор септаккорд' },
    'Cbmaj7': { notes: ['B2', 'D#3', 'F#3', 'A#3'], name: 'До-бемоль мажор септаккорд' },
    'Dbmaj7': { notes: ['Db3', 'F3', 'Ab3', 'C4'], name: 'Ре-бемоль мажор септаккорд' },
    'Dmaj7':  { notes: ['D3', 'F#3', 'A3', 'C#4'], name: 'Ре мажор септаккорд' },
    'D#maj7': { notes: ['D#3', 'G3', 'A#3', 'D4'], name: 'Ре-диез мажор септаккорд' },
    'Ebmaj7': { notes: ['Eb3', 'G3', 'Bb3', 'D4'], name: 'Ми-бемоль мажор септаккорд' },
    'Emaj7':  { notes: ['E3', 'G#3', 'B3', 'D#4'], name: 'Ми мажор септаккорд' },
    'E#maj7': { notes: ['F3', 'A3', 'C4', 'E4'], name: 'Ми-диез мажор септаккорд' },
    'Fmaj7':  { notes: ['F3', 'A3', 'C4', 'E4'], name: 'Фа мажор септаккорд' },
    'Fbmaj7': { notes: ['E3', 'G#3', 'B3', 'D#4'], name: 'Фа-бемоль мажор септаккорд' },
    'F#maj7': { notes: ['F#3', 'A#3', 'C#4', 'F4'], name: 'Фа-диез мажор септаккорд' },
    'Gbmaj7': { notes: ['Gb3', 'Bb3', 'Db4', 'F4'], name: 'Соль-бемоль мажор септаккорд' },
    'Gmaj7':  { notes: ['G3', 'B3', 'D4', 'F#4'], name: 'Соль мажор септаккорд' },
    'G#maj7': { notes: ['G#3', 'C4', 'D#4', 'G4'], name: 'Соль-диез мажор септаккорд' },
    'Abmaj7': { notes: ['Ab3', 'C4', 'Eb4', 'G4'], name: 'Ля-бемоль мажор септаккорд' },
    'Amaj7':  { notes: ['A3', 'C#4', 'E4', 'G#4'], name: 'Ля мажор септаккорд' },
    'A#maj7': { notes: ['A#3', 'D4', 'F4', 'A4'], name: 'Ля-диез мажор септаккорд' },
    'Bbmaj7': { notes: ['Bb3', 'D4', 'F4', 'A4'], name: 'Си-бемоль мажор септаккорд' },
    'Bmaj7':  { notes: ['B3', 'D#4', 'F#4', 'A#4'], name: 'Си мажор септаккорд' },
    'B#maj7': { notes: ['C4', 'E4', 'G4', 'B4'], name: 'Си-диез мажор септаккорд' },
    
    // Minor 7th (m7) - минорные септаккорды: 1-b3-5-b7
    'Cm7':  { notes: ['C3', 'Eb3', 'G3', 'Bb3'], name: 'До минор септаккорд' },
    'C#m7': { notes: ['C#3', 'E3', 'G#3', 'B3'], name: 'До-диез минор септаккорд' },
    'Cbm7': { notes: ['B2', 'D3', 'F#3', 'A3'], name: 'До-бемоль минор септаккорд' },
    'Dbm7': { notes: ['Db3', 'E3', 'Ab3', 'C4'], name: 'Ре-бемоль минор септаккорд' },
    'Dm7':  { notes: ['D3', 'F3', 'A3', 'C4'], name: 'Ре минор септаккорд' },
    'D#m7': { notes: ['D#3', 'F#3', 'A#3', 'C#4'], name: 'Ре-диез минор септаккорд' },
    'Ebm7': { notes: ['Eb3', 'Gb3', 'Bb3', 'Db4'], name: 'Ми-бемоль минор септаккорд' },
    'Em7':  { notes: ['E3', 'G3', 'B3', 'D4'], name: 'Ми минор септаккорд' },
    'E#m7': { notes: ['F3', 'Ab3', 'C4', 'Eb4'], name: 'Ми-диез минор септаккорд' },
    'Fm7':  { notes: ['F3', 'Ab3', 'C4', 'Eb4'], name: 'Фа минор септаккорд' },
    'Fbm7': { notes: ['E3', 'G3', 'B3', 'D4'], name: 'Фа-бемоль минор септаккорд' },
    'F#m7': { notes: ['F#3', 'A3', 'C#4', 'E4'], name: 'Фа-диез минор септаккорд' },
    'Gbm7': { notes: ['Gb3', 'A3', 'Db4', 'F4'], name: 'Соль-бемоль минор септаккорд' },
    'Gm7':  { notes: ['G3', 'Bb3', 'D4', 'F4'], name: 'Соль минор септаккорд' },
    'G#m7': { notes: ['G#3', 'B3', 'D#4', 'G4'], name: 'Соль-диез минор септаккорд' },
    'Abm7': { notes: ['Ab3', 'B3', 'Eb4', 'Gb4'], name: 'Ля-бемоль минор септаккорд' },
    'Am7':  { notes: ['A3', 'C4', 'E4', 'G4'], name: 'Ля минор септаккорд' },
    'A#m7': { notes: ['A#3', 'C#4', 'F4', 'A4'], name: 'Ля-диез минор септаккорд' },
    'Bbm7': { notes: ['Bb3', 'Db4', 'F4', 'Ab4'], name: 'Си-бемоль минор септаккорд' },
    'Bm7':  { notes: ['B3', 'D4', 'F#4', 'A4'], name: 'Си минор септаккорд' },
    'B#m7': { notes: ['C4', 'Eb4', 'G4', 'Bb4'], name: 'Си-диез минор септаккорд' },
    
    // Dominant 7th (7) - доминантсептаккорды: 1-3-5-b7
    'C7':  { notes: ['C3', 'E3', 'G3', 'Bb3'], name: 'До доминантсептаккорд' },
    'C#7': { notes: ['C#3', 'F3', 'G#3', 'B3'], name: 'До-диез доминантсептаккорд' },
    'Cb7': { notes: ['B2', 'D#3', 'F#3', 'A3'], name: 'До-бемоль доминантсептаккорд' },
    'Db7': { notes: ['Db3', 'F3', 'Ab3', 'C4'], name: 'Ре-бемоль доминантсептаккорд' },
    'D7':  { notes: ['D3', 'F#3', 'A3', 'C4'], name: 'Ре доминантсептаккорд' },
    'D#7': { notes: ['D#3', 'G3', 'A#3', 'C#4'], name: 'Ре-диез доминантсептаккорд' },
    'Eb7': { notes: ['Eb3', 'G3', 'Bb3', 'Db4'], name: 'Ми-бемоль доминантсептаккорд' },
    'E7':  { notes: ['E3', 'G#3', 'B3', 'D4'], name: 'Ми доминантсептаккорд' },
    'E#7': { notes: ['F3', 'A3', 'C4', 'Eb4'], name: 'Ми-диез доминантсептаккорд' },
    'F7':  { notes: ['F3', 'A3', 'C4', 'Eb4'], name: 'Фа доминантсептаккорд' },
    'Fb7': { notes: ['E3', 'G#3', 'B3', 'D4'], name: 'Фа-бемоль доминантсептаккорд' },
    'F#7': { notes: ['F#3', 'A#3', 'C#4', 'E4'], name: 'Фа-диез доминантсептаккорд' },
    'Gb7': { notes: ['Gb3', 'Bb3', 'Db4', 'F4'], name: 'Соль-бемоль доминантсептаккорд' },
    'G7':  { notes: ['G3', 'B3', 'D4', 'F4'], name: 'Соль доминантсептаккорд' },
    'G#7': { notes: ['G#3', 'C4', 'D#4', 'G4'], name: 'Соль-диез доминантсептаккорд' },
    'Ab7': { notes: ['Ab3', 'C4', 'Eb4', 'Gb4'], name: 'Ля-бемоль доминантсептаккорд' },
    'A7':  { notes: ['A3', 'C#4', 'E4', 'G4'], name: 'Ля доминантсептаккорд' },
    'A#7': { notes: ['A#3', 'D4', 'F4', 'A4'], name: 'Ля-диез доминантсептаккорд' },
    'Bb7': { notes: ['Bb3', 'D4', 'F4', 'Ab4'], name: 'Си-бемоль доминантсептаккорд' },
    'B7':  { notes: ['B3', 'D#4', 'F#4', 'A4'], name: 'Си доминантсептаккорд' },
    'B#7': { notes: ['C4', 'E4', 'G4', 'Bb4'], name: 'Си-диез доминантсептаккорд' },
    
    // Diminished 7th (dim7) - уменьшенные септаккорды: 1-b3-b5-bb7
    'Cdim7':  { notes: ['C3', 'Eb3', 'Gb3', 'A3'], name: 'До уменьшенный септаккорд' },
    'C#dim7': { notes: ['C#3', 'E3', 'G3', 'Bb3'], name: 'До-диез уменьшенный септаккорд' },
    'Cbdim7': { notes: ['B2', 'D3', 'F3', 'Ab3'], name: 'До-бемоль уменьшенный септаккорд' },
    'Dbdim7': { notes: ['Db3', 'E3', 'G3', 'Bb3'], name: 'Ре-бемоль уменьшенный септаккорд' },
    'Ddim7':  { notes: ['D3', 'F3', 'Ab3', 'B3'], name: 'Ре уменьшенный септаккорд' },
    'D#dim7': { notes: ['D#3', 'F#3', 'A3', 'C4'], name: 'Ре-диез уменьшенный септаккорд' },
    'Ebdim7': { notes: ['Eb3', 'Gb3', 'A3', 'C4'], name: 'Ми-бемоль уменьшенный септаккорд' },
    'Edim7':  { notes: ['E3', 'G3', 'Bb3', 'Db4'], name: 'Ми уменьшенный септаккорд' },
    'E#dim7': { notes: ['F3', 'Ab3', 'B3', 'D4'], name: 'Ми-диез уменьшенный септаккорд' },
    'Fdim7':  { notes: ['F3', 'Ab3', 'B3', 'D4'], name: 'Фа уменьшенный септаккорд' },
    'Fbdim7': { notes: ['E3', 'G3', 'Bb3', 'Db4'], name: 'Фа-бемоль уменьшенный септаккорд' },
    'F#dim7': { notes: ['F#3', 'A3', 'C4', 'Eb4'], name: 'Фа-диез уменьшенный септаккорд' },
    'Gbdim7': { notes: ['Gb3', 'A3', 'C4', 'Eb4'], name: 'Соль-бемоль уменьшенный септаккорд' },
    'Gdim7':  { notes: ['G3', 'Bb3', 'Db4', 'E4'], name: 'Соль уменьшенный септаккорд' },
    'G#dim7': { notes: ['G#3', 'B3', 'D4', 'F4'], name: 'Соль-диез уменьшенный септаккорд' },
    'Abdim7': { notes: ['Ab3', 'B3', 'D4', 'F4'], name: 'Ля-бемоль уменьшенный септаккорд' },
    'Adim7':  { notes: ['A3', 'C4', 'Eb4', 'Gb4'], name: 'Ля уменьшенный септаккорд' },
    'A#dim7': { notes: ['A#3', 'C#4', 'E4', 'G4'], name: 'Ля-диез уменьшенный септаккорд' },
    'Bbdim7': { notes: ['Bb3', 'Db4', 'F4', 'Ab4'], name: 'Си-бемоль уменьшенный септаккорд' },
    'Bdim7':  { notes: ['B3', 'D4', 'F4', 'Ab4'], name: 'Си уменьшенный септаккорд' },
    'B#dim7': { notes: ['C4', 'Eb4', 'Gb4', 'A4'], name: 'Си-диез уменьшенный септаккорд' },
    
    // Half-diminished 7th (m7b5) - полууменьшенные септаккорды: 1-b3-b5-b7
    'Cm7b5':  { notes: ['C3', 'Eb3', 'Gb3', 'Bb3'], name: 'До полууменьшенный септаккорд' },
    'C#m7b5': { notes: ['C#3', 'E3', 'G3', 'B3'], name: 'До-диез полууменьшенный септаккорд' },
    'Cbm7b5': { notes: ['B2', 'D3', 'F3', 'A3'], name: 'До-бемоль полууменьшенный септаккорд' },
    'Dbm7b5': { notes: ['Db3', 'E3', 'G3', 'C4'], name: 'Ре-бемоль полууменьшенный септаккорд' },
    'Dm7b5':  { notes: ['D3', 'F3', 'Ab3', 'C4'], name: 'Ре полууменьшенный септаккорд' },
    'D#m7b5': { notes: ['D#3', 'F#3', 'A3', 'C#4'], name: 'Ре-диез полууменьшенный септаккорд' },
    'Ebm7b5': { notes: ['Eb3', 'Gb3', 'A3', 'Db4'], name: 'Ми-бемоль полууменьшенный септаккорд' },
    'Em7b5':  { notes: ['E3', 'G3', 'Bb3', 'D4'], name: 'Ми полууменьшенный септаккорд' },
    'E#m7b5': { notes: ['F3', 'Ab3', 'B3', 'Eb4'], name: 'Ми-диез полууменьшенный септаккорд' },
    'Fm7b5':  { notes: ['F3', 'Ab3', 'B3', 'Eb4'], name: 'Фа полууменьшенный септаккорд' },
    'Fbm7b5': { notes: ['E3', 'G3', 'Bb3', 'D4'], name: 'Фа-бемоль полууменьшенный септаккорд' },
    'F#m7b5': { notes: ['F#3', 'A3', 'C4', 'E4'], name: 'Фа-диез полууменьшенный септаккорд' },
    'Gbm7b5': { notes: ['Gb3', 'A3', 'C4', 'F4'], name: 'Соль-бемоль полууменьшенный септаккорд' },
    'Gm7b5':  { notes: ['G3', 'Bb3', 'Db4', 'F4'], name: 'Соль полууменьшенный септаккорд' },
    'G#m7b5': { notes: ['G#3', 'B3', 'D4', 'G4'], name: 'Соль-диез полууменьшенный септаккорд' },
    'Abm7b5': { notes: ['Ab3', 'B3', 'D4', 'Gb4'], name: 'Ля-бемоль полууменьшенный септаккорд' },
    'Am7b5':  { notes: ['A3', 'C4', 'Eb4', 'G4'], name: 'Ля полууменьшенный септаккорд' },
    'A#m7b5': { notes: ['A#3', 'C#4', 'E4', 'A4'], name: 'Ля-диез полууменьшенный септаккорд' },
    'Bbm7b5': { notes: ['Bb3', 'Db4', 'F4', 'Ab4'], name: 'Си-бемоль полууменьшенный септаккорд' },
    'Bm7b5':  { notes: ['B3', 'D4', 'F4', 'A4'], name: 'Си полууменьшенный септаккорд' },
    'B#m7b5': { notes: ['C4', 'Eb4', 'Gb4', 'Bb4'], name: 'Си-диез полууменьшенный септаккорд' },
    
    // Augmented 7th (aug7, +7) - увеличенные септаккорды: 1-3-#5-b7
    'Caug7':  { notes: ['C3', 'E3', 'G#3', 'Bb3'], name: 'До увеличенный септаккорд' },
    'C#aug7': { notes: ['C#3', 'F3', 'A3', 'B3'], name: 'До-диез увеличенный септаккорд' },
    'Cbaug7': { notes: ['B2', 'D#3', 'G3', 'A3'], name: 'До-бемоль увеличенный септаккорд' },
    'Dbaug7': { notes: ['Db3', 'F3', 'A3', 'C4'], name: 'Ре-бемоль увеличенный септаккорд' },
    'Daug7':  { notes: ['D3', 'F#3', 'A#3', 'C4'], name: 'Ре увеличенный септаккорд' },
    'D#aug7': { notes: ['D#3', 'G3', 'B3', 'C#4'], name: 'Ре-диез увеличенный септаккорд' },
    'Ebaug7': { notes: ['Eb3', 'G3', 'B3', 'Db4'], name: 'Ми-бемоль увеличенный септаккорд' },
    'Eaug7':  { notes: ['E3', 'G#3', 'C4', 'D4'], name: 'Ми увеличенный септаккорд' },
    'E#aug7': { notes: ['F3', 'A3', 'C#4', 'Eb4'], name: 'Ми-диез увеличенный септаккорд' },
    'Faug7':  { notes: ['F3', 'A3', 'C#4', 'Eb4'], name: 'Фа увеличенный септаккорд' },
    'Fbaug7': { notes: ['E3', 'G#3', 'C4', 'D4'], name: 'Фа-бемоль увеличенный септаккорд' },
    'F#aug7': { notes: ['F#3', 'A#3', 'D4', 'E4'], name: 'Фа-диез увеличенный септаккорд' },
    'Gbaug7': { notes: ['Gb3', 'Bb3', 'D4', 'F4'], name: 'Соль-бемоль увеличенный септаккорд' },
    'Gaug7':  { notes: ['G3', 'B3', 'D#4', 'F4'], name: 'Соль увеличенный септаккорд' },
    'G#aug7': { notes: ['G#3', 'C4', 'E4', 'G4'], name: 'Соль-диез увеличенный септаккорд' },
    'Abaug7': { notes: ['Ab3', 'C4', 'E4', 'Gb4'], name: 'Ля-бемоль увеличенный септаккорд' },
    'Aaug7':  { notes: ['A3', 'C#4', 'F4', 'G4'], name: 'Ля увеличенный септаккорд' },
    'A#aug7': { notes: ['A#3', 'D4', 'F#4', 'A4'], name: 'Ля-диез увеличенный септаккорд' },
    'Bbaug7': { notes: ['Bb3', 'D4', 'F#4', 'Ab4'], name: 'Си-бемоль увеличенный септаккорд' },
    'Baug7':  { notes: ['B3', 'D#4', 'G4', 'A4'], name: 'Си увеличенный септаккорд' },
    'B#aug7': { notes: ['C4', 'E4', 'G#4', 'Bb4'], name: 'Си-диез увеличенный септаккорд' }
};

// Парсинг пользовательских аккордов
export function parseChordOverrides(text, midiNotesMap) {
    const overrides = {};
    const lines = text.split('\n');
    
    for (let line of lines) {
        line = line.trim();
        if (line === '' || line.startsWith('#')) continue;
        
        const parts = line.split(/\s+/);
        if (parts.length >= 2) {
            const chordName = parts[0];
            const notes = parts.slice(1);
            
            const validNotes = notes.filter(note => midiNotesMap[note] !== undefined);
            
            if (validNotes.length === notes.length) {
                overrides[chordName] = {
                    notes: notes,
                    name: `Пользовательский: ${chordName}`
                };
            } else {
                const invalidNotes = notes.filter(note => midiNotesMap[note] === undefined);
                console.warn(`Предупреждение: В аккорде ${chordName} не найдены ноты: ${invalidNotes.join(', ')}`);
            }
        }
    }
    
    return overrides;
}

// Объединение аккордов
export function mergeChords(defaultChords, overrides) {
    const merged = JSON.parse(JSON.stringify(defaultChords));
    for (let [chord, value] of Object.entries(overrides)) {
        merged[chord] = value;
    }
    return merged;
}

// Парсинг ABC нотации для MIDI
export function parseABCForMIDI(text) {
    const lines = text.split('\n');
    const chords = [];
    const chordDurations = [];
    const barDurations = [];
    let tempo = 120;
    let meter = '2/4';
    let noteLength = '1/4';
    
    let meterNumerator = 2;
    let meterDenominator = 4;
    let noteLengthNumerator = 1;
    let noteLengthDenominator = 4;
    
    for (let line of lines) {
        line = line.trim();
        if (line === '') continue;
        
        if (line.startsWith('Q:')) {
            // Поддерживаем формат Q:69 или Q: 69 (с пробелом)
            const match = line.match(/Q:\s*(\d+)/);
            if (match) tempo = parseInt(match[1]);
        }
        else if (line.startsWith('M:')) {
            meter = line.substring(2).trim();
            const meterMatch = meter.match(/(\d+)\/(\d+)/);
            if (meterMatch) {
                meterNumerator = parseInt(meterMatch[1]);
                meterDenominator = parseInt(meterMatch[2]);
            }
        }
        else if (line.startsWith('L:')) {
            noteLength = line.substring(2).trim();
            const noteLengthMatch = noteLength.match(/(\d+)\/(\d+)/);
            if (noteLengthMatch) {
                noteLengthNumerator = parseInt(noteLengthMatch[1]);
                noteLengthDenominator = parseInt(noteLengthMatch[2]);
            }
        }
        else if (line.includes('|')) {
            // Отбрасываем комментарий после символа '%'
            const chordLine = line.split('%')[0].trim();

            if (!chordLine.includes('|')) {
                continue;
            }

            // Длительность одного "базового" аккорда (из L:) в четвертях
            const chordDurationInQuarters = (noteLengthNumerator / noteLengthDenominator) * 4;
            // Длительность целого такта в четвертях (из M:)
            const barDurationInQuarters = (meterNumerator / meterDenominator) * 4;

            // Делим строку на такты
            const bars = chordLine.split('|');

            for (let rawBar of bars) {
                const barContent = rawBar.trim();
                if (!barContent) continue;

                // Внутри такта может быть несколько аккордов, разделённых пробелами.
                // Внутри одного аккорда пробелов быть не может.
                const barChords = barContent.split(/\s+/).filter(Boolean);
                if (barChords.length === 0) continue;

                // Длительность части такта, "приходящаяся" на один аккорд.
                // Если, например, M: 2/4 и L: 1/4, то:
                // - barDurationInQuarters = 2 (две четверти в такте)
                // - chordDurationInQuarters = 1 (одна четверть на аккорд)
                // - при двух аккордах в такте barDurationPerChord = 1,
                //   тогда пауза внутри такта = 0 и такт заполняется ровно двумя аккордами.
                const barDurationPerChord = barDurationInQuarters / barChords.length;

                for (let chord of barChords) {
                    chords.push(chord);
                    chordDurations.push(chordDurationInQuarters);
                    barDurations.push(barDurationPerChord);
                }
            }
        }
    }
    
    return {
        chords,
        chordDurations,
        barDurations,
        tempo,
        meter,
        noteLength
    };
}

// Преобразование длительности в формат MIDI
export function getMidiDuration(quarters) {
    const midiDurations = [1, 2, 4, 8, 16, 32];
    const target = 4 / quarters;
    
    let closest = midiDurations[0];
    let minDiff = Math.abs(target - closest);
    for (let d of midiDurations) {
        const diff = Math.abs(target - d);
        if (diff < minDiff) {
            minDiff = diff;
            closest = d;
        }
    }
    return closest.toString();
}

// Преобразование MIDI ноты в частоту (Гц)
export function midiToFrequency(midiNote) {
    return 440 * Math.pow(2, (midiNote - 69) / 12);
}

// Параметры синтезатора для плавного звука
// Можно изменить эти параметры для настройки звучания:
// - waveType: 'sine' (чистый), 'triangle' (мягкий), 'sawtooth' (яркий), 'square' (резкий)
// - attackTime: время атаки (меньше = быстрее начало, но возможны щелчки)
// - sustainLevel: уровень sustain (0.0-1.0, выше = громче равномерный звук)
// - releaseTime: время затухания в конце (больше = плавнее окончание)
export const synthSettings = {
    // Тип волны: 'sine', 'triangle', 'sawtooth', 'square'
    // 'sine' - самый чистый, 'triangle' - мягче, 'sawtooth' - ярче
    waveType: 'sine',
    
    // Параметры огибающей ADSR (Attack, Decay, Sustain, Release)
    attackTime: 0.001,    // Очень быстрая атака (почти без щелчков)
    decayTime: 0.01,      // Короткий спад до уровня sustain
    sustainLevel: 0.8,    // Уровень sustain (равномерный звук, увеличен для более тянучего звука)
    releaseTime: 0.05,    // Плавное затухание в конце
    
    // Общая громкость
    volume: 0.25
};

// Воспроизведение одной ноты с улучшенной огибающей
export function playNote(frequency, duration, startTime, audioContext, settings = synthSettings) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = settings.waveType;
    
    // Улучшенная огибающая ADSR для плавного и тянучего звука
    const now = startTime;
    const attackEnd = now + settings.attackTime;
    const decayEnd = attackEnd + settings.decayTime;
    const releaseStart = now + duration - settings.releaseTime;
    
    // Attack: плавный подъем от 0 до пика
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(settings.volume * 1.2, attackEnd);
    
    // Decay: спад до уровня sustain
    gainNode.gain.linearRampToValueAtTime(settings.volume * settings.sustainLevel, decayEnd);
    
    // Sustain: удерживаем постоянный уровень на протяжении большей части длительности
    gainNode.gain.setValueAtTime(settings.volume * settings.sustainLevel, decayEnd);
    
    // Release: плавное затухание только в конце
    if (releaseStart > decayEnd) {
        gainNode.gain.setValueAtTime(settings.volume * settings.sustainLevel, releaseStart);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
    } else {
        // Если длительность слишком короткая, просто плавно затухаем
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
    }
    
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
}

// Воспроизведение аккорда
export function playChord(chordInfo, startTime, audioContext, duration, settings = synthSettings) {
    if (!chordInfo || !chordInfo.notes) return;
    
    chordInfo.notes.forEach(note => {
        const midiNote = midiNotes[note];
        if (midiNote !== undefined) {
            const frequency = midiToFrequency(midiNote);
            playNote(frequency, duration, startTime, audioContext, settings);
        }
    });
}

// Опциональная функция для более богатого тембра (несколько осцилляторов)
// Можно использовать вместо playNote для более насыщенного звука
export function playNoteRich(frequency, duration, startTime, audioContext, settings = synthSettings) {
    // Основной осциллятор
    const oscillator1 = audioContext.createOscillator();
    const gainNode1 = audioContext.createGain();
    
    oscillator1.connect(gainNode1);
    gainNode1.connect(audioContext.destination);
    
    oscillator1.frequency.value = frequency;
    oscillator1.type = settings.waveType;
    
    // Опционально: добавить октаву выше для яркости (можно закомментировать)
    const oscillator2 = audioContext.createOscillator();
    const gainNode2 = audioContext.createGain();
    
    oscillator2.connect(gainNode2);
    gainNode2.connect(audioContext.destination);
    
    oscillator2.frequency.value = frequency * 2; // Октава выше
    oscillator2.type = settings.waveType;
    
    // Огибающая для основного осциллятора
    const now = startTime;
    const attackEnd = now + settings.attackTime;
    const decayEnd = attackEnd + settings.decayTime;
    const releaseStart = now + duration - settings.releaseTime;
    
    // Основной осциллятор (громче)
    gainNode1.gain.setValueAtTime(0, now);
    gainNode1.gain.linearRampToValueAtTime(settings.volume * 1.2, attackEnd);
    gainNode1.gain.linearRampToValueAtTime(settings.volume * settings.sustainLevel, decayEnd);
    gainNode1.gain.setValueAtTime(settings.volume * settings.sustainLevel, decayEnd);
    
    // Второй осциллятор (тише, для обертонов)
    gainNode2.gain.setValueAtTime(0, now);
    gainNode2.gain.linearRampToValueAtTime(settings.volume * 0.3, attackEnd);
    gainNode2.gain.linearRampToValueAtTime(settings.volume * 0.15, decayEnd);
    gainNode2.gain.setValueAtTime(settings.volume * 0.15, decayEnd);
    
    if (releaseStart > decayEnd) {
        gainNode1.gain.setValueAtTime(settings.volume * settings.sustainLevel, releaseStart);
        gainNode1.gain.exponentialRampToValueAtTime(0.001, now + duration);
        gainNode2.gain.setValueAtTime(settings.volume * 0.15, releaseStart);
        gainNode2.gain.exponentialRampToValueAtTime(0.001, now + duration);
    } else {
        gainNode1.gain.exponentialRampToValueAtTime(0.001, now + duration);
        gainNode2.gain.exponentialRampToValueAtTime(0.001, now + duration);
    }
    
    oscillator1.start(startTime);
    oscillator1.stop(startTime + duration);
    oscillator2.start(startTime);
    oscillator2.stop(startTime + duration);
}

// Форматирование времени
export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}
