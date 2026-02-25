import { useState, useRef, useCallback } from 'react';
import {
    parseABCForMIDI,
    parseChordOverrides,
    mergeChords,
    defaultChordNotes,
    midiNotes,
    playChord,
    formatTime
} from '../utils/midiConverter';

export function useMidiPlayer(inputText, chordOverrides) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [progress, setProgress] = useState(0);
    
    const audioContextRef = useRef(null);
    const playbackTimeoutRef = useRef(null);
    const progressIntervalRef = useRef(null);
    const currentChordIndexRef = useRef(0);
    const playbackChordsRef = useRef([]);
    const playbackChordDurationsRef = useRef([]);
    const playbackBarDurationsRef = useRef([]);
    const playbackTempoRef = useRef(120);
    const startTimeRef = useRef(0);
    const pausedTimeRef = useRef(0);
    const pauseStartTimeRef = useRef(0);
    const isPlayingRef = useRef(false);
    const isPausedRef = useRef(false);

    const stopPlayback = useCallback(() => {
        setIsPlaying(false);
        setIsPaused(false);
        isPlayingRef.current = false;
        isPausedRef.current = false;
        currentChordIndexRef.current = 0;
        
        if (playbackTimeoutRef.current) {
            clearTimeout(playbackTimeoutRef.current);
            playbackTimeoutRef.current = null;
        }
        
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }
        
        setProgress(0);
        setCurrentTime(0);
        
        if (audioContextRef.current) {
            audioContextRef.current.suspend().then(() => {
                audioContextRef.current.resume();
            });
        }
    }, []);

    const pausePlayback = useCallback(() => {
        if (!isPlayingRef.current || isPausedRef.current) return;
        
        setIsPaused(true);
        isPausedRef.current = true;
        pauseStartTimeRef.current = audioContextRef.current.currentTime;
        
        if (playbackTimeoutRef.current) {
            clearTimeout(playbackTimeoutRef.current);
            playbackTimeoutRef.current = null;
        }
        
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }
    }, [isPlaying, isPaused]);

    const scheduleNextChord = useCallback(() => {
        if (!isPlayingRef.current || isPausedRef.current || currentChordIndexRef.current >= playbackChordsRef.current.length) {
            if (currentChordIndexRef.current >= playbackChordsRef.current.length) {
                stopPlayback();
            }
            return;
        }
        
        const chordDurationInQuarters = playbackChordDurationsRef.current[currentChordIndexRef.current] || 1;
        const barDurationInQuarters = playbackBarDurationsRef.current[currentChordIndexRef.current] || 2;
        
        const quarterNoteDuration = 60 / playbackTempoRef.current;
        const chordDuration = chordDurationInQuarters * quarterNoteDuration;
        const barDuration = barDurationInQuarters * quarterNoteDuration;
        
        const currentTime = audioContextRef.current.currentTime;
        const scheduledTime = currentTime;
        
        playChord(playbackChordsRef.current[currentChordIndexRef.current], scheduledTime, audioContextRef.current, chordDuration);
        
        currentChordIndexRef.current++;
        
        playbackTimeoutRef.current = setTimeout(() => {
            scheduleNextChord();
        }, barDuration * 1000);
    }, [stopPlayback]);

    const startProgressUpdate = useCallback(() => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }
        
        progressIntervalRef.current = setInterval(() => {
            if (!isPlayingRef.current || isPausedRef.current) return;
            
            const currentTime = audioContextRef.current.currentTime;
            const elapsed = currentTime - startTimeRef.current - pausedTimeRef.current;
            
            const quarterNoteDuration = 60 / playbackTempoRef.current;
            const totalDuration = playbackBarDurationsRef.current.reduce((sum, duration) => sum + duration, 0) * quarterNoteDuration;
            
            const progressValue = Math.min((elapsed / totalDuration) * 100, 100);
            setProgress(progressValue);
            setCurrentTime(Math.min(elapsed, totalDuration));
        }, 100);
    }, [isPlaying, isPaused]);

    const resumePlayback = useCallback(() => {
        if (!isPausedRef.current) return;
        
        pausedTimeRef.current += audioContextRef.current.currentTime - pauseStartTimeRef.current;
        setIsPaused(false);
        isPausedRef.current = false;
        
        scheduleNextChord();
        startProgressUpdate();
    }, [scheduleNextChord, startProgressUpdate]);

    const playComposition = useCallback(() => {
        if (!inputText) {
            const message = 'Нет данных для воспроизведения!';
            console.log(message);
            alert(message);
            return;
        }

        try {
            const parsed = parseABCForMIDI(inputText);
            
            if (parsed.chords.length === 0) {
                const message = 'Не найдено аккордов для обработки!';
                console.log(message);
                alert(message);
                return;
            }

            const overrides = parseChordOverrides(chordOverrides || '', midiNotes);
            const chordNotes = mergeChords(defaultChordNotes, overrides);

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
                console.log(`Пользователь выбрал: ${proceed ? 'Продолжить' : 'Отмена'}`);
                if (!proceed || validChords.length === 0) {
                    return;
                }
            }

            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }

            if (audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume();
            }

            setIsPlaying(true);
            setIsPaused(false);
            isPlayingRef.current = true;
            isPausedRef.current = false;
            
            playbackChordsRef.current = validChords.map(chord => chordNotes[chord]).filter(chord => chord);
            playbackChordDurationsRef.current = parsed.chordDurations || playbackChordsRef.current.map(() => 1);
            playbackBarDurationsRef.current = parsed.barDurations || playbackChordsRef.current.map(() => 2);
            playbackTempoRef.current = parsed.tempo;
            currentChordIndexRef.current = 0;
            startTimeRef.current = audioContextRef.current.currentTime;
            pausedTimeRef.current = 0;

            const quarterNoteDuration = 60 / playbackTempoRef.current;
            const totalDuration = playbackBarDurationsRef.current.reduce((sum, duration) => sum + duration, 0) * quarterNoteDuration;
            setTotalTime(totalDuration);

            startProgressUpdate();
            scheduleNextChord();
        } catch (err) {
            console.error('Playback error:', err);
            const errorMessage = 'Ошибка при воспроизведении: ' + err.message;
            console.log(errorMessage);
            alert(errorMessage);
        }
    }, [inputText, chordOverrides, startProgressUpdate, scheduleNextChord, stopPlayback]);

    const togglePlayback = useCallback(() => {
        if (isPaused) {
            resumePlayback();
        } else if (isPlaying) {
            pausePlayback();
        } else {
            playComposition();
        }
    }, [isPlaying, isPaused, playComposition, pausePlayback, resumePlayback]);

    return {
        isPlaying,
        isPaused,
        currentTime,
        totalTime,
        progress,
        togglePlayback,
        stopPlayback
    };
}
