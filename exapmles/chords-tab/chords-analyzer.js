// Конфигурация инструментов
const INSTRUMENTS = {
    guitar: {
        name: 'Гитара (стандартный строй)',
        strings: [
            { note: 'E', octave: 4 },  // 1-я струна (самая тонкая) - E4
            { note: 'B', octave: 3 }, // 2-я струна - B3
            { note: 'G', octave: 3 }, // 3-я струна - G3
            { note: 'D', octave: 3 }, // 4-я струна - D3
            { note: 'A', octave: 2 }, // 5-я струна - A2
            { note: 'E', octave: 2 }  // 6-я струна - E2
        ],
        banjoFifthString: false
    },
    mandolin: {
        name: 'Мандолина (стандартный строй)',
        strings: [
            { note: 'E', octave: 5 },  // 1-я струна (самая тонкая) - E5
            { note: 'A', octave: 4 },  // 2-я струна - A4
            { note: 'D', octave: 4 },  // 3-я струна - D4
            { note: 'G', octave: 3 }  // 4-я струна - G3
        ],
        banjoFifthString: false
    },
    ukulele: {
        name: 'Укулеле (стандартный строй GCEA)',
        strings: [
            { note: 'A', octave: 4 },  // 1-я струна (самая тонкая)
            { note: 'E', octave: 4 },
            { note: 'C', octave: 4 },
            { note: 'G', octave: 4 }   // 4-я струна
        ],
        banjoFifthString: false
    },
    banjo: {
        name: 'Банджо (Open G)',
        strings: [
            { note: 'D', octave: 4 },  // 1-я струна (самая тонкая) - D4
            { note: 'B', octave: 3 },  // 2-я струна - B3
            { note: 'G', octave: 3 },  // 3-я струна - G3
            { note: 'D', octave: 3 },  // 4-я струна - D3
            { note: 'G', octave: 4 }   // 5-я струна (начинается с 5-го лада) - G4
        ],
        banjoFifthString: true,
        banjoFifthStringStartFret: 5
    },
    bass: {
        name: 'Бас-гитара (стандартный строй)',
        strings: [
            { note: 'G', octave: 2 },  // 1-я струна (самая тонкая) - G2
            { note: 'D', octave: 2 },  // 2-я струна - D2
            { note: 'A', octave: 1 },  // 3-я струна - A1
            { note: 'E', octave: 1 }  // 4-я струна - E1
        ],
        banjoFifthString: false
    }
};

// Ноты и их полутоны от C
const NOTE_VALUES = {
    'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3,
    'E': 4, 'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8,
    'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
};

// Обратное преобразование: полутон -> нота
const SEMITONE_TO_NOTE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Интервалы для аккордов
const CHORD_INTERVALS = {
    'maj': [0, 4, 7],           // Мажор: C, E, G
    'min': [0, 3, 7],           // Минор: C, Eb, G
    'dim': [0, 3, 6],           // Уменьшенный: C, Eb, Gb
    'aug': [0, 4, 8],           // Увеличенный: C, E, G#
    'sus2': [0, 2, 7],          // Sus2: C, D, G
    'sus4': [0, 5, 7],          // Sus4: C, F, G
    '7': [0, 4, 7, 10],         // Доминантсептаккорд: C, E, G, Bb
    'maj7': [0, 4, 7, 11],      // Большой мажорный септаккорд: C, E, G, B
    'min7': [0, 3, 7, 10],      // Минорный септаккорд: C, Eb, G, Bb
    'dim7': [0, 3, 6, 9],       // Уменьшенный септаккорд: C, Eb, Gb, A
    'add9': [0, 4, 7, 14],      // Add9: C, E, G, D
    '9': [0, 4, 7, 10, 14],     // Нонаккорд: C, E, G, Bb, D
    '6': [0, 4, 7, 9],          // Секстаккорд: C, E, G, A
    'm6': [0, 3, 7, 9]          // Минорный секстаккорд: C, Eb, G, A
};

// Парсинг аккорда из строки
function parseChord(chordStr) {
    chordStr = chordStr.trim();
    if (!chordStr) return null;

    // Убираем лишние символы
    chordStr = chordStr.replace(/[()]/g, '');

    // Определяем базовую ноту
    let rootNote = '';
    let i = 0;
    
    // Проверяем диезы и бемоли
    if (chordStr.length > 1 && (chordStr[1] === '#' || chordStr[1] === 'b')) {
        rootNote = chordStr.substring(0, 2);
        i = 2;
    } else {
        rootNote = chordStr[0];
        i = 1;
    }

    // Определяем тип аккорда
    const rest = chordStr.substring(i);
    let chordType = 'maj'; // По умолчанию мажор
    
    if (rest.startsWith('m') || rest.startsWith('min')) {
        chordType = 'min';
    } else if (rest.startsWith('dim')) {
        chordType = 'dim';
    } else if (rest.startsWith('aug')) {
        chordType = 'aug';
    } else if (rest.startsWith('sus2')) {
        chordType = 'sus2';
    } else if (rest.startsWith('sus4') || rest.startsWith('sus')) {
        chordType = 'sus4';
    } else if (rest.includes('maj7') || rest.includes('M7')) {
        chordType = 'maj7';
    } else if (rest.includes('min7') || rest.includes('m7')) {
        chordType = 'min7';
    } else if (rest.includes('dim7')) {
        chordType = 'dim7';
    } else if (rest.includes('add9')) {
        chordType = 'add9';
    } else if (rest.includes('9')) {
        chordType = '9';
    } else if (rest.includes('6')) {
        if (rest.includes('m6')) {
            chordType = 'm6';
        } else {
            chordType = '6';
        }
    } else if (rest.includes('7')) {
        chordType = '7';
    }

    return {
        root: rootNote,
        type: chordType,
        original: chordStr
    };
}

// Получить ноты аккорда
function getChordNotes(chord) {
    const rootValue = NOTE_VALUES[chord.root];
    if (rootValue === undefined) return null;

    const intervals = CHORD_INTERVALS[chord.type] || CHORD_INTERVALS['maj'];
    const notes = intervals.map(interval => {
        const semitone = (rootValue + interval) % 12;
        return SEMITONE_TO_NOTE[semitone];
    });

    return notes;
}

// Получить MIDI номер ноты
function getMidiNote(note, octave) {
    const noteValue = NOTE_VALUES[note];
    if (noteValue === undefined) return null;
    return (octave + 1) * 12 + noteValue;
}

// Получить ноту на струне на определенном ладу
function getNoteOnString(stringNote, stringOctave, fret, capo = 0, banjoFifthString = false, stringIndex = 0, banjoFifthStringStartFret = 5) {
    // Для банджо 5-й струны: струна физически начинается с 5-го лада
    // На 5-м ладу должна быть нота, на которую настроена струна (G)
    // Поэтому нужно вычесть смещение начала струны
    let adjustedFret = fret;
    if (banjoFifthString && stringIndex === 4) {
        // Для 5-й струны банджо: fret = 5 соответствует открытой струне (0)
        // Поэтому вычитаем смещение
        adjustedFret = fret - banjoFifthStringStartFret;
    }
    
    const totalFret = adjustedFret + capo;
    const stringMidi = getMidiNote(stringNote, stringOctave);
    if (stringMidi === null) return null;
    
    const noteMidi = stringMidi + totalFret;
    const octave = Math.floor(noteMidi / 12) - 1;
    const semitone = noteMidi % 12;
    const note = SEMITONE_TO_NOTE[semitone];
    
    return { note, octave, midi: noteMidi };
}

// Проверка, является ли нота частью аккорда
function isNoteInChord(note, chordNotes) {
    // Нормализуем ноту (убираем октаву для сравнения)
    const normalizedNote = note.replace(/\d+/, '');
    return chordNotes.some(cn => {
        const normalizedChordNote = cn.replace(/\d+/, '');
        return normalizedChordNote === normalizedNote || 
               (normalizedNote === 'C#' && normalizedChordNote === 'Db') ||
               (normalizedNote === 'Db' && normalizedChordNote === 'C#') ||
               (normalizedNote === 'D#' && normalizedChordNote === 'Eb') ||
               (normalizedNote === 'Eb' && normalizedChordNote === 'D#') ||
               (normalizedNote === 'F#' && normalizedChordNote === 'Gb') ||
               (normalizedNote === 'Gb' && normalizedChordNote === 'F#') ||
               (normalizedNote === 'G#' && normalizedChordNote === 'Ab') ||
               (normalizedNote === 'Ab' && normalizedChordNote === 'G#') ||
               (normalizedNote === 'A#' && normalizedChordNote === 'Bb') ||
               (normalizedNote === 'Bb' && normalizedChordNote === 'A#');
    });
}

// Нормализация ноты для сравнения
function normalizeNote(note) {
    const noteMap = {
        'C#': 'Db', 'Db': 'Db',
        'D#': 'Eb', 'Eb': 'Eb',
        'F#': 'Gb', 'Gb': 'Gb',
        'G#': 'Ab', 'Ab': 'Ab',
        'A#': 'Bb', 'Bb': 'Bb'
    };
    return noteMap[note] || note;
}

// Преобразование арабских цифр в римские
function toRoman(num) {
    if (num === 0) return '0';
    if (num < 0 || num > 12) return num.toString();
    
    const romanNumerals = [
        { value: 12, numeral: 'XII' },
        { value: 11, numeral: 'XI' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 8, numeral: 'VIII' },
        { value: 7, numeral: 'VII' },
        { value: 6, numeral: 'VI' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 3, numeral: 'III' },
        { value: 2, numeral: 'II' },
        { value: 1, numeral: 'I' }
    ];
    
    for (const { value, numeral } of romanNumerals) {
        if (num >= value) {
            return numeral;
        }
    }
    
    return num.toString();
}

// Поиск всех позиций ноты на струне
function findNotePositionsOnString(stringNote, stringOctave, targetNote, maxFret = 12, capo = 0, banjoFifthString = false, stringIndex = 0, banjoFifthStringStartFret = 5) {
    const positions = [];
    const normalizedTarget = normalizeNote(targetNote);
    
    // Для банджо: 5-я струна начинается с определенного лада
    let minFretForString = (banjoFifthString && stringIndex === 4) ? banjoFifthStringStartFret : 0;
    
    // Если установлен каподастр, минимальный лад должен быть не меньше каподастра
    // (открытые струны и лады до каподастра недоступны)
    const startFret = Math.max(minFretForString, capo);
    const endFret = maxFret;
    
    for (let fret = startFret; fret <= endFret; fret++) {
        const noteInfo = getNoteOnString(stringNote, stringOctave, fret, capo, banjoFifthString, stringIndex, banjoFifthStringStartFret);
        if (noteInfo && normalizeNote(noteInfo.note) === normalizedTarget) {
            positions.push(fret);
        }
    }
    
    return positions;
}

// Поиск аппликатур аккорда - используем ВСЕ струны, где есть ноты аккорда
function findChordFingerings(instrument, chord, maxVariants = 3, capo = 0) {
    const chordNotes = getChordNotes(chord);
    if (!chordNotes) return [];

    const strings = instrument.strings;
    const banjoFifthString = instrument.banjoFifthString || false;
    const banjoFifthStringStartFret = instrument.banjoFifthStringStartFret || 5;
    const maxFret = 12;

    // Для каждой струны находим все возможные позиции нот аккорда
    const stringOptions = [];
    for (let i = 0; i < strings.length; i++) {
        const optionsForString = [];
        
        // Для банджо: 5-я струна может использоваться или не использоваться
        // Если это 5-я струна банджо и аккорд содержит G (соль), добавляем позицию на 5-м ладу
        if (banjoFifthString && i === 4) {
            // 5-я струна банджо настроена на G и начинается с 5-го лада
            const fifthStringNote = strings[i].note;
            const fifthStringOctave = strings[i].octave;
            
            // Проверяем, есть ли в аккорде нота G
            for (const note of chordNotes) {
                if (normalizeNote(note) === normalizeNote(fifthStringNote)) {
                    // Если каподастр меньше 5-го лада, добавляем позицию на 5-м ладу
                    const fretToUse = Math.max(banjoFifthStringStartFret, capo);
                    const noteInfo = getNoteOnString(fifthStringNote, fifthStringOctave, fretToUse, capo, banjoFifthString, 4, banjoFifthStringStartFret);
                    if (noteInfo && normalizeNote(noteInfo.note) === normalizeNote(note)) {
                        optionsForString.push({
                            note: note,
                            fret: fretToUse
                        });
                    }
                }
            }
        }
        
        // Ищем все позиции всех нот аккорда на этой струне (включая открытые)
        for (const note of chordNotes) {
            const positions = findNotePositionsOnString(
                strings[i].note,
                strings[i].octave,
                note,
                maxFret,
                capo,
                banjoFifthString,
                i,
                banjoFifthStringStartFret
            );
            
            for (const fret of positions) {
                // Для банджо 5-й струны пропускаем дубликаты (уже добавили выше)
                if (banjoFifthString && i === 4 && fret === Math.max(banjoFifthStringStartFret, capo)) {
                    continue;
                }
                optionsForString.push({
                    note: note,
                    fret: fret
                });
            }
        }
        
        // Сортируем опции по ладу (открытые струны и низкие лады первыми)
        optionsForString.sort((a, b) => a.fret - b.fret);
        
        if (optionsForString.length > 0) {
            stringOptions.push({
                stringIndex: i,
                options: optionsForString
            });
        }
    }

    if (stringOptions.length === 0) {
        return [];
    }

    const fingerings = [];
    const maxCombinations = 5000; // Ограничение для производительности
    let combinationCount = 0;

    // Генерируем варианты аппликатур
    function generateFingerings(currentFingering, stringIndex) {
        if (combinationCount >= maxCombinations) return;
        
        if (stringIndex >= stringOptions.length) {
            // Проверяем валидность аппликатуры
            const playedNotes = new Set();
            const fingeringNotes = [];
            const usedFrets = [];

            for (let i = 0; i < strings.length; i++) {
                const fret = currentFingering[i];
                if (fret === null || fret === undefined) continue;

                const noteInfo = getNoteOnString(
                    strings[i].note,
                    strings[i].octave,
                    fret,
                    capo,
                    banjoFifthString,
                    i,
                    banjoFifthStringStartFret
                );

                if (noteInfo) {
                    const normalizedNote = normalizeNote(noteInfo.note);
                    playedNotes.add(normalizedNote);
                    fingeringNotes.push({
                        string: i,
                        fret: fret,
                        note: noteInfo.note
                    });
                    usedFrets.push(fret);
                }
            }

            // Проверяем, содержит ли все ноты аккорда
            const normalizedChordNotes = chordNotes.map(n => normalizeNote(n));
            const hasAllNotes = normalizedChordNotes.every(cn => playedNotes.has(cn));

            if (hasAllNotes && usedFrets.length > 0) {
                const minFret = Math.min(...usedFrets);
                const maxUsedFret = Math.max(...usedFrets);
                const stretch = maxUsedFret - minFret;
                const openStrings = usedFrets.filter(f => f === 0).length;
                const usedStringsCount = usedFrets.length;
                
                // Оценка: предпочитаем меньше растяжение, больше открытых струн, больше струн, низкие позиции
                // Для банджо дополнительно поощряем использование открытых струн
                const banjoBonus = banjoFifthString && openStrings > 0 ? 15 : 0;
                const score = -stretch * 20 + openStrings * 10 + usedStringsCount * 5 - minFret * 3 + banjoBonus;
                
                fingerings.push({
                    fingering: [...currentFingering],
                    notes: fingeringNotes,
                    score: score
                });
                combinationCount++;
            }
            return;
        }

        const stringOption = stringOptions[stringIndex];
        const stringIdx = stringOption.stringIndex;
        
        // Пробуем каждую возможную позицию на этой струне
        for (const option of stringOption.options) {
            currentFingering[stringIdx] = option.fret;
            generateFingerings(currentFingering, stringIndex + 1);
        }
        
        // Также пробуем вариант без этой струны
        // Для банджо 5-й струны это особенно важно - она может не использоваться
        currentFingering[stringIdx] = null;
        if (stringIndex < stringOptions.length - 1) {
            generateFingerings(currentFingering, stringIndex + 1);
        } else if (banjoFifthString && stringIdx === 4) {
            // Для 5-й струны банджо всегда пробуем вариант без неё
            generateFingerings(currentFingering, stringIndex + 1);
        }
    }

    const initialFingering = new Array(strings.length).fill(null);
    generateFingerings(initialFingering, 0);

    // Сортируем по оценке
    fingerings.sort((a, b) => b.score - a.score);
    
    // Удаляем дубликаты
    const uniqueFingerings = [];
    const seen = new Set();
    for (const fingering of fingerings) {
        const key = fingering.fingering.join(',');
        if (!seen.has(key)) {
            seen.add(key);
            uniqueFingerings.push(fingering);
        }
    }

    // Предпочитаем варианты, которые используют больше струн
    uniqueFingerings.sort((a, b) => {
        const aStrings = a.fingering.filter(f => f !== null && f !== undefined).length;
        const bStrings = b.fingering.filter(f => f !== null && f !== undefined).length;
        if (aStrings !== bStrings) {
            return bStrings - aStrings; // Больше струн = лучше
        }
        return b.score - a.score;
    });

    return uniqueFingerings.slice(0, maxVariants);
}

// Визуализация аппликатуры
function renderFingering(strings, fingering, capo = 0, banjoFifthString = false, banjoFifthStringStartFret = 5, displayMode = 'frets', chordName = '') {
    const frets = fingering.fingering;
    const playedFrets = frets.filter(f => f !== null && f !== undefined);
    
    if (playedFrets.length === 0) return '';

    const minFret = Math.min(...playedFrets);
    const maxFret = Math.max(...playedFrets);
    
    // Определяем диапазон ладов для отображения
    let displayStartFret = Math.max(0, minFret - 1);
    let displayEndFret = Math.min(maxFret + 2, 12);
    
    // Если все лады в первых позициях, показываем с 0
    if (maxFret <= 3) {
        displayStartFret = 0;
        displayEndFret = 5;
    }

    // Формируем строку для копирования: название аккорда + пробелы между ладами
    const fretsArray = frets.map(f => {
        if (f === null || f === undefined) return 'X';
        return f.toString();
    });
    // Добавляем пробелы между ладами для читаемости (особенно для ладов 10+)
    const fretsString = fretsArray.join(' ');
    // Добавляем название аккорда в начало, если указано
    const fullFretsString = chordName ? `${chordName} ${fretsString}` : fretsString;
    
    // Используем JSON.stringify для безопасной передачи строки через data-атрибут
    // Это сохранит все пробелы и специальные символы, и автоматически экранирует кавычки
    const jsonString = JSON.stringify(fullFretsString);
    // Экранируем кавычки для HTML атрибута
    const escapedString = jsonString.replace(/"/g, '&quot;');
    
    let html = '<div class="chord-variant">';
    html += `<button class="copy-button" data-fingering="${escapedString}" onclick="copyFingering(event)" title="Копировать аппликатуру">📋 Копировать</button>`;
    html += '<div class="chord-tab">';
    
    // Отображаем струны сверху вниз (1-я струна = самая тонкая, сверху)
    for (let i = 0; i < strings.length; i++) {
        const fret = frets[i];
        const string = strings[i];
        const stringNumber = i + 1; // Номер струны (1-я сверху, индекс 0 -> номер 1)
        
        html += '<div class="string">';
        html += `<span class="string-label">${stringNumber}</span>`;
        html += '<div class="fret-numbers">';
        
        for (let f = displayStartFret; f <= displayEndFret; f++) {
            let fretClass = 'fret';
            let content = '';
            
            // Для банджо: 5-я струна не существует до определенного лада
            if (banjoFifthString && i === 4 && f < banjoFifthStringStartFret) {
                content = ' ';
                fretClass += ' muted';
            } else if (fret === null || fret === undefined) {
                // Струна не играется (заглушена)
                content = '×';
                fretClass += ' muted';
            } else if (fret === 0 && f === 0) {
                // Открытая струна
                if (displayMode === 'notes') {
                    // Показываем ноту открытой струны
                    const noteInfo = getNoteOnString(strings[i].note, strings[i].octave, 0, capo, banjoFifthString, i, banjoFifthStringStartFret);
                    content = noteInfo ? noteInfo.note : '0';
                } else if (displayMode === 'dots') {
                    content = '○'; // Кружок для открытой струны
                } else {
                    content = '0'; // Лады - цифра 0
                }
                fretClass += ' open';
            } else if (fret === f) {
                // Этот лад зажат
                if (displayMode === 'notes') {
                    // Показываем ноту на этом ладу
                    const noteInfo = getNoteOnString(strings[i].note, strings[i].octave, fret, capo, banjoFifthString, i, banjoFifthStringStartFret);
                    content = noteInfo ? noteInfo.note : fret.toString();
                } else if (displayMode === 'dots') {
                    content = '●'; // Точка для зажатого лада
                } else {
                    content = fret.toString(); // Лады - арабская цифра
                }
                fretClass += ' fingered';
            } else {
                // Пустой лад
                content = '─';
            }
            
            html += `<span class="${fretClass}">${content}</span>`;
        }
        
        html += '</div></div>';
    }
    
    // Отображаем горизонтальную линию с римскими цифрами под аккордом
    // Показываем первый лад и далее через один (I, III, V, VII и т.д.)
    // Всегда показываем, даже если начинается с 0 (показываем I)
    const firstFretToShow = displayStartFret === 0 ? 1 : displayStartFret;
    html += '<div class="fret-numbers" style="margin-top: 10px; padding-left: 30px;">';
    for (let f = displayStartFret; f <= displayEndFret; f++) {
        // Показываем первый лад (или I если с 0) и далее через один
        const shouldShow = (f === firstFretToShow) || (f > firstFretToShow && (f - firstFretToShow) % 2 === 0);
        if (shouldShow) {
            const fretToDisplay = f === 0 ? 1 : f; // Если начинается с 0, показываем I
            html += `<span style="width: 25px; text-align: center; display: inline-block; color: #666; font-size: 0.9em; font-weight: bold;">${toRoman(fretToDisplay)}</span>`;
        } else {
            html += `<span style="width: 25px; text-align: center; display: inline-block;"></span>`;
        }
    }
    html += '</div>';
    
    // Показываем информацию о нотах (все ноты, которые звучат в аккорде)
    if (fingering.notes && fingering.notes.length > 0) {
        // Сортируем ноты по струнам (сверху вниз)
        const sortedNotes = [...fingering.notes].sort((a, b) => a.string - b.string);
        const notesInfo = sortedNotes.map(n => `${n.note}${n.fret}`).join(', ');
        html += `<div class="info-text" style="font-size: 0.85em; color: #888;">${notesInfo}</div>`;
    }
    
    html += '</div>';
    html += '</div>';
    
    return html;
}

// Функция копирования аппликатуры в буфер обмена
function copyFingering(event) {
    const button = event.target;
    const originalText = button.textContent;
    
    // Получаем строку из data-атрибута (JSON-encoded с HTML entities)
    const encodedString = button.getAttribute('data-fingering');
    if (!encodedString) {
        console.error('Ошибка: Не найдена строка для копирования');
        return;
    }
    
    // Восстанавливаем кавычки из HTML entities и парсим JSON
    let decodedString;
    try {
        // Восстанавливаем кавычки
        const jsonString = encodedString.replace(/&quot;/g, '"');
        // Парсим JSON (он автоматически уберет экранированные символы)
        decodedString = JSON.parse(jsonString);
    } catch (e) {
        console.error('Ошибка при декодировании строки:', e);
        // Fallback - используем строку как есть (без JSON парсинга)
        decodedString = encodedString.replace(/&quot;/g, '"');
    }
    
    // Копируем в буфер обмена (с названием аккорда и пробелами между ладами)
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(decodedString).then(() => {
            // Показываем уведомление об успешном копировании
            button.textContent = '✓ Скопировано!';
            button.style.background = '#4CAF50';
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '#667eea';
            }, 2000);
        }).catch(err => {
            console.error('Ошибка копирования в буфер обмена:', err);
            alert('Не удалось скопировать. Попробуйте выделить текст вручную.');
        });
    } else {
        // Fallback для старых браузеров
        const textArea = document.createElement('textarea');
        textArea.value = decodedString;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            button.textContent = '✓ Скопировано!';
            button.style.background = '#4CAF50';
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '#667eea';
            }, 2000);
        } catch (err) {
            console.error('Ошибка копирования:', err);
            alert('Не удалось скопировать. Попробуйте выделить текст вручную.');
        }
        document.body.removeChild(textArea);
    }
}

// Парсинг аккордов из текста
function parseChordsFromText(text) {
    // Разделяем по пробелам, запятым, вертикальным чертам
    const separators = /[\s,|]+/;
    const parts = text.split(separators).filter(p => p.trim());
    
    const chords = [];
    for (const part of parts) {
        const chord = parseChord(part.trim());
        if (chord) {
            chords.push(chord);
        }
    }
    
    return chords;
}

// Инициализация интерфейса
function initInterface() {
    const instrumentSelect = document.getElementById('instrument-select');
    const customConfig = document.getElementById('custom-instrument-config');
    
    instrumentSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customConfig.style.display = 'block';
            updateCustomStringsConfig();
        } else {
            customConfig.style.display = 'none';
        }
    });
    
    const stringsCountInput = document.getElementById('custom-strings-count');
    stringsCountInput.addEventListener('change', updateCustomStringsConfig);
    
    // Обработчик кнопки анализа
    const analyzeButton = document.getElementById('analyze-button');
    if (analyzeButton) {
        analyzeButton.addEventListener('click', analyzeChords);
    }
}

function updateCustomStringsConfig() {
    const count = parseInt(document.getElementById('custom-strings-count').value) || 6;
    const container = document.getElementById('custom-strings-config');
    container.innerHTML = '<label>Настройка струн (от 1-й к последней, 1-я = самая тонкая):</label>';
    
    for (let i = 0; i < count; i++) {
        const div = document.createElement('div');
        div.className = 'string-config';
        div.innerHTML = `
            <label>${i + 1}-я:</label>
            <input type="text" class="custom-note" placeholder="E" maxlength="2">
            <input type="number" class="custom-octave" placeholder="4" min="0" max="8" value="4">
        `;
        container.appendChild(div);
    }
}

// Получить текущую конфигурацию инструмента
function getCurrentInstrument() {
    const instrumentSelect = document.getElementById('instrument-select');
    const capo = parseInt(document.getElementById('capo-fret').value) || 0;
    
    if (instrumentSelect.value === 'custom') {
        const count = parseInt(document.getElementById('custom-strings-count').value) || 6;
        const strings = [];
        
        const noteInputs = document.querySelectorAll('.custom-note');
        const octaveInputs = document.querySelectorAll('.custom-octave');
        
        for (let i = 0; i < count; i++) {
            const note = noteInputs[i]?.value?.trim().toUpperCase() || 'E';
            const octave = parseInt(octaveInputs[i]?.value) || 4;
            strings.push({ note, octave });
        }
        
        return {
            strings,
            banjoFifthString: false,
            capo
        };
    } else {
        const instrument = INSTRUMENTS[instrumentSelect.value];
        return {
            ...instrument,
            capo
        };
    }
}

// Основная функция анализа
function analyzeChords() {
    const chordsInput = document.getElementById('chords-input').value;
    const variantsCount = parseInt(document.getElementById('variants-count').value) || 3;
    const resultDiv = document.getElementById('result');
    
    if (!chordsInput.trim()) {
        resultDiv.innerHTML = '<div class="error">Введите аккорды для анализа!</div>';
        return;
    }
    
    const chords = parseChordsFromText(chordsInput);
    if (chords.length === 0) {
        resultDiv.innerHTML = '<div class="error">Не удалось распознать аккорды. Проверьте формат ввода.</div>';
        return;
    }
    
    const instrument = getCurrentInstrument();
    const capo = instrument.capo || 0;
    const displayMode = document.getElementById('display-mode').value || 'frets';
    
    // Сохраняем данные для PDF
    chordsDataForPDF = [];
    
    let html = '<div class="chords-display">';
    
    for (const chord of chords) {
        const chordNotes = getChordNotes(chord);
        if (!chordNotes) {
            html += `<div class="chord-group"><div class="chord-name">${chord.original}</div><div class="error">Не удалось определить ноты аккорда</div></div>`;
            continue;
        }
        
        const fingerings = findChordFingerings(instrument, chord, variantsCount, capo);
        
        // Сохраняем данные для PDF
        const chordDataForPDF = {
            name: `${chord.original} (${chordNotes.join(', ')})`,
            variants: []
        };
        
        html += `<div class="chord-group">`;
        html += `<div class="chord-name">${chord.original} (${chordNotes.join(', ')})</div>`;
        
        if (fingerings.length === 0) {
            html += '<div class="error">Не найдено аппликатур для этого аккорда</div>';
        } else {
            html += '<div class="chord-variants">';
            for (const fingering of fingerings) {
                html += renderFingering(
                    instrument.strings,
                    fingering,
                    capo,
                    instrument.banjoFifthString,
                    instrument.banjoFifthStringStartFret,
                    displayMode,
                    chord.original
                );
                
                // Сохраняем данные варианта для PDF
                chordDataForPDF.variants.push({
                    strings: instrument.strings.length,
                    frets: fingering.fingering,
                    notes: fingering.notes || []
                });
            }
            html += '</div>';
        }
        
        html += '</div>';
        
        if (chordDataForPDF.variants.length > 0) {
            chordsDataForPDF.push(chordDataForPDF);
        }
    }
    
    html += '</div>';
    resultDiv.innerHTML = html;
    
    // Показываем кнопку скачивания PDF
    const downloadButton = document.getElementById('download-pdf-button');
    if (downloadButton && chordsDataForPDF.length > 0) {
        downloadButton.style.display = 'inline-block';
    }
}

// Глобальная переменная для хранения данных аккордов для PDF
let chordsDataForPDF = null;

// Функция генерации и скачивания PDF
function downloadPDF() {
    if (!chordsDataForPDF || chordsDataForPDF.length === 0) {
        alert('Нет данных для экспорта в PDF. Сначала проанализируйте аккорды.');
        return;
    }

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        let yPosition = 20;
        const margin = 20;
        const pageHeight = 280;
        const lineHeight = 8;
        
        // Заголовок
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Аккорды для струнных инструментов', 105, yPosition, { align: 'center' });
        yPosition += 15;
        
        // Информация об инструменте
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const instrumentSelect = document.getElementById('instrument-select');
        const instrumentName = instrumentSelect.options[instrumentSelect.selectedIndex].text;
        const capo = parseInt(document.getElementById('capo-fret').value) || 0;
        let instrumentInfo = `Инструмент: ${instrumentName}`;
        if (capo > 0) {
            instrumentInfo += ` | Каподастр: ${capo} лад`;
        }
        doc.text(instrumentInfo, margin, yPosition);
        yPosition += 12;
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        
        // Рисуем аккорды
        for (const chordData of chordsDataForPDF) {
            // Проверяем, нужна ли новая страница
            if (yPosition > pageHeight - 60) {
                doc.addPage();
                yPosition = 20;
            }
            
            // Название аккорда
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text(chordData.name, margin, yPosition);
            yPosition += 10;
            
            // Варианты аппликатур
            doc.setFontSize(10);
            doc.setFont('courier', 'normal');
            
            for (const variant of chordData.variants) {
                if (yPosition > pageHeight - 40) {
                    doc.addPage();
                    yPosition = 20;
                }
                
                // Рисуем табулатуру
                const strings = variant.strings;
                const frets = variant.frets;
                
                // Номера струн и лады
                let xPos = margin;
                const stringSpacing = 8;
                const fretSpacing = 6;
                
                // Определяем диапазон ладов
                const playedFrets = frets.filter(f => f !== null && f !== undefined);
                if (playedFrets.length === 0) continue;
                
                const minFret = Math.min(...playedFrets);
                const maxFret = Math.max(...playedFrets);
                let displayStartFret = Math.max(0, minFret - 1);
                let displayEndFret = Math.min(maxFret + 2, 12);
                
                if (maxFret <= 3) {
                    displayStartFret = 0;
                    displayEndFret = 5;
                }
                
                // Рисуем струны
                for (let i = 0; i < strings.length; i++) {
                    const fret = frets[i];
                    let line = `${strings.length - i} `;
                    
                    for (let f = displayStartFret; f <= displayEndFret; f++) {
                        if (fret === null || fret === undefined) {
                            line += '× ';
                        } else if (fret === 0 && f === 0) {
                            line += '0 ';
                        } else if (fret === f) {
                            line += fret.toString() + ' ';
                        } else {
                            line += '─ ';
                        }
                    }
                    
                    doc.text(line, xPos, yPosition);
                    yPosition += lineHeight;
                }
                
                // Римские цифры ладов (если не с нуля)
                if (displayStartFret > 0) {
                    yPosition += 2;
                    let romanLine = '  ';
                    const firstFretToShow = displayStartFret === 0 ? 1 : displayStartFret;
                    for (let f = displayStartFret; f <= displayEndFret; f++) {
                        const shouldShow = (f === firstFretToShow) || (f > firstFretToShow && (f - firstFretToShow) % 2 === 0);
                        if (shouldShow) {
                            const fretToDisplay = f === 0 ? 1 : f;
                            romanLine += toRoman(fretToDisplay) + ' ';
                        } else {
                            romanLine += '  ';
                        }
                    }
                    doc.setFontSize(8);
                    doc.text(romanLine, xPos, yPosition);
                    doc.setFontSize(10);
                    yPosition += lineHeight;
                }
                
                // Ноты аккорда
                if (variant.notes && variant.notes.length > 0) {
                    const notesInfo = variant.notes.map(n => `${n.note}${n.fret}`).join(', ');
                    doc.setFontSize(8);
                    doc.text(notesInfo, xPos, yPosition);
                    doc.setFontSize(10);
                    yPosition += lineHeight + 3;
                } else {
                    yPosition += 3;
                }
            }
            
            yPosition += 5;
        }
        
        // Сохраняем PDF
        const fileName = `chords_${new Date().getTime()}.pdf`;
        doc.save(fileName);
        
    } catch (error) {
        console.error('Ошибка генерации PDF:', error);
        alert('Ошибка при генерации PDF. Убедитесь, что библиотека jsPDF загружена.');
    }
}

// Регистрация Service Worker для PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Определяем путь к service worker относительно текущей страницы
        const basePath = window.location.pathname.replace(/\/[^\/]*$/, '/');
        const swPath = basePath + 'service-worker.js';
        
        navigator.serviceWorker.register(swPath, { scope: basePath })
            .then((registration) => {
                console.log('Service Worker зарегистрирован:', registration.scope);
                
                // Проверяем обновления Service Worker
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('Доступна новая версия приложения');
                        }
                    });
                });
            })
            .catch((error) => {
                console.log('Ошибка регистрации Service Worker:', error);
            });
    });
    
    // Обработка события beforeinstallprompt для показа кнопки установки
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        // Предотвращаем автоматический показ баннера (опционально)
        // e.preventDefault();
        deferredPrompt = e;
        console.log('PWA готово к установке - баннер должен появиться автоматически');
        
        // Если хотите показать свою кнопку вместо автоматического баннера:
        // e.preventDefault();
        // showInstallButton();
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initInterface();
});
