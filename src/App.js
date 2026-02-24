import React, {useState, useEffect} from 'react';
import Layout from './components/Layout/Layout';
import Editor from './components/Editor/Editor';
import PdfPreview from './components/PdfPreview/PdfPreview';
import Controls from './components/Controls/Controls';
import {parseAbcNotation} from './utils/abcParser';
import {generatePdf} from './utils/pdfGenerator';
import {analyzeBarsFromText, getBarStatistics} from './utils/barCounter';
import {
    parseABCForMIDI,
    parseChordOverrides,
    mergeChords,
    defaultChordNotes,
    midiNotes,
    getMidiDuration
} from './utils/midiConverter';
import {useMidiPlayer} from './hooks/useMidiPlayer';
import * as MidiWriter from 'midi-writer-js';
import './App.css';
import Footer from "./components/Footer/Footer";

function App() {
    const [inputText, setInputText] = useState(`X: 1
T: White smoke
M: 4/4
L: 1/4
Q:110
R: G. Stepenko / N. Yarkov
K: Ab 
 % Intro
||: Ab |  Eb | Bb | Db :||
% Verse 1
| Ab | Eb | % An iron needle will pierce my vein
| Bb | Db | % And dissolve in blood
| Ab | Eb | % All the medicine that you gave me
| Bb | Db | % Into the silence a whisper shud
% Chorus
| Ab | Cmb | % Burn, burn white smoke
| Fm | Eb | % Run away my spirit broke
% Solo
| Ab | Eb | Bb | Db |`);

    const [parsedData, setParsedData] = useState(null);
    const [barStatistics, setBarStatistics] = useState(null); // Добавляем состояние для статистики
    const [pdfUrl, setPdfUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState({
        showLyrics: true,
        showChords: true,
        showTempo: true,
        showTitle: true,
        showLegend: true,
        showStatistics: true,
        showStaff: false,
        fontSize: 12,
        lineHeight: 0.4,
        fixedTextOffset: 80,
        fontFamily: 'Roboto Mono',
        fontStyle: 'normal',
        instrument: 'guitar',
        capo: 0,
        staffLineSpacing: 2,
        staffSpacing: 8,
        staffVerticalOffset: 0,
        staffLineWidth: 0.1,
        staffLineCount: 5,
        chordOverrides: ''
    });
    useEffect(() => {
        try {
            const parsed = parseAbcNotation(inputText);
            setParsedData(parsed);
            // Подсчитываем такты после парсинга
            const stats = getBarStatistics(parsed);
            setBarStatistics(stats);
        } catch (err) {
            console.error('Initial parsing error:', err);
            setBarStatistics(null);
        }
    }, []);

    const handleTextChange = (text) => {
        setInputText(text);
        try {
            const parsed = parseAbcNotation(text);
            setParsedData(parsed);

            // Используем analyzeBarsFromText для точного подсчёта
            const barAnalysis = analyzeBarsFromText(text);
            console.log('Bar analysis:', barAnalysis);

            // Обновляем статистику тактов
            const stats = {
                total: barAnalysis.totalBars,
                sections: barAnalysis.sections.length,
                averageBarsPerSection: barAnalysis.sections.length > 0
                    ? Math.round(barAnalysis.totalBars / barAnalysis.sections.length)
                    : 0,
                hasRepeats: false, // Можно добавить проверку повторений
                sectionDetails: barAnalysis.sections.map(section => ({
                    name: section.name,
                    bars: section.bars,
                    hasRepeats: false
                }))
            };

            setBarStatistics(stats);
            setError(null);
        } catch (err) {
            setError('Ошибка формата текста');
            console.error('Parse error:', err);
            setBarStatistics(null);
        }
    };

    const handleGeneratePdf = async () => {
        if (!parsedData) {
            setError('Нет данных для генерации');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            console.log('Generating PDF with:', parsedData);
            const pdfBlob = await generatePdf(parsedData, options);
            const url = URL.createObjectURL(pdfBlob);
            setPdfUrl(url);
        } catch (err) {
            console.error('Generation error:', err);
            setError('Ошибка при создании PDF');
        } finally {
            setLoading(false);
        }
    };

    const handleOptionsChange = (newOptions) => {
        setOptions(newOptions);
    };

    // Хук для воспроизведения MIDI
    const {
        isPlaying,
        isPaused,
        currentTime,
        totalTime,
        progress,
        togglePlayback,
        stopPlayback
    } = useMidiPlayer(inputText, options.chordOverrides);

    const handleConvertToMIDI = async () => {
        if (!parsedData || !inputText) {
            const message = 'Нет данных для конвертации в MIDI!';
            console.log(message);
            alert(message);
            return;
        }

        try {
            // Парсим ABC нотацию для MIDI
            const parsed = parseABCForMIDI(inputText);
            
            if (parsed.chords.length === 0) {
                const message = 'Не найдено аккордов для обработки!';
                console.log(message);
                alert(message);
                return;
            }

            // Парсим пользовательские аккорды
            const overrides = parseChordOverrides(options.chordOverrides || '', midiNotes);
            const chordNotes = mergeChords(defaultChordNotes, overrides);

            // Проверяем неизвестные аккорды
            const unknownChords = new Set();
            const validChords = [];

            for (let chord of parsed.chords) {
                if (chordNotes[chord]) {
                    validChords.push(chord);
                } else {
                    unknownChords.add(chord);
                }
            }

            if (unknownChords.size > 0) {
                const confirmMessage = `Внимание! Найдены неопределенные аккорды: ${Array.from(unknownChords).join(', ')}\n\n` +
                    `Добавьте их определение в поле "Пользовательские аккорды".\n\n` +
                    `Продолжить с доступными аккордами?`;
                console.log(confirmMessage);
                const proceed = window.confirm(confirmMessage);
                if (!proceed || validChords.length === 0) {
                    return;
                }
            }

            // Создаем MIDI
            const track = new MidiWriter.Track();
            track.setTempo(parsed.tempo);

            validChords.forEach((chord, index) => {
                const chordInfo = chordNotes[chord];
                if (chordInfo) {
                    const midiPitches = chordInfo.notes
                        .map(note => midiNotes[note])
                        .filter(pitch => pitch !== undefined);

                    if (midiPitches.length > 0) {
                        const chordDurationInQuarters = parsed.chordDurations && parsed.chordDurations[index]
                            ? parsed.chordDurations[index]
                            : 1;
                        
                        const barDurationInQuarters = parsed.barDurations && parsed.barDurations[index]
                            ? parsed.barDurations[index]
                            : 2;
                        
                        const restDurationInQuarters = barDurationInQuarters - chordDurationInQuarters;
                        
                        const chordDuration = getMidiDuration(chordDurationInQuarters);

                        // Добавляем аккорд
                        const noteEvent = new MidiWriter.NoteEvent({
                            pitch: midiPitches,
                            duration: chordDuration,
                            velocity: 80
                        });
                        track.addEvent(noteEvent);

                        // Добавляем паузу, если такт не заполнен полностью
                        if (restDurationInQuarters > 0) {
                            const restDuration = getMidiDuration(restDurationInQuarters);
                            const restEvent = new MidiWriter.NoteEvent({
                                pitch: [],
                                duration: restDuration,
                                velocity: 0
                            });
                            track.addEvent(restEvent);
                        }
                    }
                }
            });

            const write = new MidiWriter.Writer([track]);
            const midiData = write.buildFile();

            const blob = new Blob([midiData], { type: 'audio/midi' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${parsedData.title || 'song'}.mid`;
            link.click();
            URL.revokeObjectURL(url);

            let message = `MIDI файл создан!\n`;
            message += `Аккордов обработано: ${validChords.length}\n`;
            message += `Темп: ${parsed.tempo} BPM\n`;
            if (unknownChords.size > 0) {
                message += `Пропущено неизвестных аккордов: ${unknownChords.size}`;
            }
            
            console.log(message);
            alert(message);
        } catch (err) {
            console.error('MIDI conversion error:', err);
            const errorMessage = 'Ошибка при создании MIDI файла: ' + err.message;
            console.log(errorMessage);
            alert(errorMessage);
        }
    };

    const handlePreviewChords = () => {
        if (!parsedData || !inputText) {
            const message = 'Нет данных для проверки!';
            console.log(message);
            alert(message);
            return;
        }

        try {
            const parsed = parseABCForMIDI(inputText);
            const overrides = parseChordOverrides(options.chordOverrides || '', midiNotes);
            const chordNotes = mergeChords(defaultChordNotes, overrides);

            const chordStats = {};
            const unknownChords = new Set();

            for (let chord of parsed.chords) {
                if (chordNotes[chord]) {
                    chordStats[chord] = (chordStats[chord] || 0) + 1;
                } else {
                    unknownChords.add(chord);
                }
            }

            let previewText = '=== РЕЗУЛЬТАТ ПАРСИНГА ===\n\n';
            previewText += `Темп: ${parsed.tempo} BPM\n`;
            previewText += `Размер: ${parsed.meter}\n`;
            previewText += `Всего аккордов: ${parsed.chords.length}\n`;
            previewText += `Уникальных аккордов: ${Object.keys(chordStats).length}\n\n`;

            if (unknownChords.size > 0) {
                previewText += `⚠️ НЕОПРЕДЕЛЕННЫЕ АККОРДЫ: ${Array.from(unknownChords).join(', ')}\n\n`;
            }

            previewText += 'Аккорды в песне (с количеством вхождений):\n';

            const sortedChords = Object.entries(chordStats)
                .sort((a, b) => b[1] - a[1]);

            for (let [chord, count] of sortedChords) {
                const info = chordNotes[chord];
                const source = info && info.name.includes('Пользовательский') ? ' (польз.)' : '';
                previewText += `${chord}: ${count} раз - ${info ? info.notes.join(', ') : '???'}${source}\n`;
            }

            if (Object.keys(overrides).length > 0) {
                previewText += '\nПользовательские определения аккордов:\n';
                for (let [chord, info] of Object.entries(overrides)) {
                    previewText += `${chord}: ${info.notes.join(', ')}\n`;
                }
            }

            console.log(previewText);
            alert(previewText);
        } catch (err) {
            console.error('Preview error:', err);
            const errorMessage = 'Ошибка при проверке аккордов: ' + err.message;
            console.log(errorMessage);
            alert(errorMessage);
        }
    };

    return (
        <div className="App">
            <Layout
                leftPanel={
                    <>
                        <Editor value={inputText} onChange={handleTextChange}/>
                        {error && <div className="error-message">{error}</div>}
                        {barStatistics && (
                            <div className="bar-statistics">
                                <h4>Статистика тактов:</h4>
                                <p>Всего тактов: <strong>{barStatistics.total}</strong></p>
                                <p>Секций: <strong>{barStatistics.sections}</strong></p>

                                <div className="section-details">
                                    <h5>Детали секций:</h5>
                                    {barStatistics.sectionDetails.map((section, index) => (
                                        <div key={index} className="section-item">
                                            <span className="section-name">{section.name}:</span>
                                            <span className="section-bars">{section.bars} тактов</span>
                                            {section.hasRepeats && <span className="repeat-indicator">🔄</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                }
                rightPanel={
                    <PdfPreview
                        pdfUrl={pdfUrl}
                        parsedData={parsedData}
                        options={options}
                        loading={loading}
                    />
                }
                controls={
                    <Controls
                        options={options}
                        onOptionsChange={handleOptionsChange}
                        onGeneratePdf={handleGeneratePdf}
                        onConvertToMIDI={handleConvertToMIDI}
                        onPreviewChords={handlePreviewChords}
                        onTogglePlayback={togglePlayback}
                        onStopPlayback={stopPlayback}
                        isPlaying={isPlaying}
                        isPaused={isPaused}
                        currentTime={currentTime}
                        totalTime={totalTime}
                        progress={progress}
                        loading={loading}
                        hasData={!!parsedData}
                    />
                }
                footer={
                    <Footer/>
                }
            />
        </div>
    );
}

export default App;