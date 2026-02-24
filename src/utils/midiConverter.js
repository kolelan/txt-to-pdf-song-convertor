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

// Аккорды по умолчанию (все мажорные и минорные в 3-й октаве)
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
    'B#m': { notes: ['C4', 'Eb4', 'G4'], name: 'Си-диез минор' } // Энгармонически C минор
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
            const match = line.match(/Q:(\d+)/);
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
            const chordLine = line.split('%')[0].trim();
            
            const chordDurationInQuarters = (noteLengthNumerator / noteLengthDenominator) * 4;
            const barDurationInQuarters = (meterNumerator / meterDenominator) * 4;
            
            const parts = chordLine.split('|');
            
            for (let part of parts) {
                const chord = part.trim();
                if (chord && chord !== '') {
                    chords.push(chord);
                    chordDurations.push(chordDurationInQuarters);
                    barDurations.push(barDurationInQuarters);
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

// Воспроизведение одной ноты
export function playNote(frequency, duration, startTime, audioContext) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    // Огибающая для плавного звука
    const now = audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
}

// Воспроизведение аккорда
export function playChord(chordInfo, startTime, audioContext, duration) {
    if (!chordInfo || !chordInfo.notes) return;
    
    chordInfo.notes.forEach(note => {
        const midiNote = midiNotes[note];
        if (midiNote !== undefined) {
            const frequency = midiToFrequency(midiNote);
            playNote(frequency, duration, startTime, audioContext);
        }
    });
}

// Форматирование времени
export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}
