import React from 'react';
import { formatTime, defaultChordNotes } from '../../utils/midiConverter';
import './Controls.css';

// Функция для генерации placeholder с примерами аккордов от C (только чистая нота C, без диезов и бемолей)
const getChordPlaceholder = () => {
    // Функция для сортировки аккордов: сначала мажор/минор, потом септаккорды
    const getSortOrder = (chord) => {
        if (chord === 'C') return 1;
        if (chord === 'Cm') return 2;
        if (chord.includes('maj7')) return 3;
        if (chord.includes('m7') && !chord.includes('m7b5')) return 4;
        if (chord.endsWith('7') && !chord.includes('m7') && !chord.includes('maj7') && !chord.includes('dim7') && !chord.includes('aug7')) return 5;
        if (chord.includes('dim7')) return 6;
        if (chord.includes('m7b5')) return 7;
        if (chord.includes('aug7')) return 8;
        return 9;
    };
    
    // Фильтруем только аккорды от чистой ноты C (без C# и Cb)
    const cChords = Object.keys(defaultChordNotes)
        .filter(chord => chord.startsWith('C') && !chord.startsWith('C#') && !chord.startsWith('Cb'))
        .sort((a, b) => {
            const orderA = getSortOrder(a);
            const orderB = getSortOrder(b);
            if (orderA !== orderB) return orderA - orderB;
            return a.localeCompare(b);
        });
    
    let placeholder = 'Название_аккорда Нота1 Нота2 Нота3 ....\n';
    
    // Добавляем только аккорды от чистой ноты C
    cChords.forEach(chord => {
        const chordInfo = defaultChordNotes[chord];
        if (chordInfo && chordInfo.notes) {
            placeholder += `${chord} ${chordInfo.notes.join(' ')}\n`;
        }
    });
    
    return placeholder.trim();
};

// Функция для получения списка предопределенных аккордов, сгруппированных по типам
const getChordLegend = () => {
    const chords = Object.keys(defaultChordNotes);
    
    // Группируем аккорды по типам
    const groups = {
        major: [],
        minor: [],
        maj7: [],
        m7: [],
        dom7: [],
        dim7: [],
        m7b5: [],
        aug7: [],
        other: []
    };
    
    chords.forEach(chord => {
        if (chord.endsWith('maj7')) {
            groups.maj7.push(chord);
        } else if (chord.endsWith('m7b5')) {
            groups.m7b5.push(chord);
        } else if (chord.endsWith('dim7')) {
            groups.dim7.push(chord);
        } else if (chord.endsWith('aug7')) {
            groups.aug7.push(chord);
        } else if (chord.endsWith('m7')) {
            groups.m7.push(chord);
        } else if (chord.endsWith('7')) {
            groups.dom7.push(chord);
        } else if (chord.endsWith('m')) {
            groups.minor.push(chord);
        } else if (!chord.includes('m') && !chord.includes('7') && !chord.includes('dim') && !chord.includes('aug')) {
            groups.major.push(chord);
        } else {
            groups.other.push(chord);
        }
    });
    
    return groups;
};

// Компонент для отображения легенды предопределенных аккордов
const ChordLegend = () => {
    const chordGroups = getChordLegend();
    const [isExpanded, setIsExpanded] = React.useState(false);
    
    const totalChords = Object.values(chordGroups).reduce((sum, group) => sum + group.length, 0);
    
    return (
        <div style={{ marginTop: '8px', fontSize: '13px', color: '#666' }}>
            <div 
                style={{ 
                    cursor: 'pointer', 
                    color: '#0066cc', 
                    textDecoration: 'underline',
                    marginBottom: '5px',
                    fontSize: '13px'
                }}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? '▼' : '▶'} Предопределено аккордов: {totalChords} (нажмите для просмотра)
            </div>
            {isExpanded && (
                <div style={{ 
                    marginTop: '8px', 
                    padding: '10px', 
                    backgroundColor: '#f9f9f9', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    fontSize: '12px',
                    lineHeight: '1.5'
                }}>
                    <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                        💡 Вы можете переопределить любой из этих аккордов, указав его название и новые ноты.
                    </div>
                    {chordGroups.major.length > 0 && (
                        <div style={{ marginBottom: '6px' }}>
                            <strong>Мажорные:</strong> {chordGroups.major.slice(0, 20).join(', ')}
                            {chordGroups.major.length > 20 && ` ... (+${chordGroups.major.length - 20})`}
                        </div>
                    )}
                    {chordGroups.minor.length > 0 && (
                        <div style={{ marginBottom: '6px' }}>
                            <strong>Минорные:</strong> {chordGroups.minor.slice(0, 20).join(', ')}
                            {chordGroups.minor.length > 20 && ` ... (+${chordGroups.minor.length - 20})`}
                        </div>
                    )}
                    {chordGroups.maj7.length > 0 && (
                        <div style={{ marginBottom: '6px' }}>
                            <strong>Major 7th (maj7):</strong> {chordGroups.maj7.slice(0, 15).join(', ')}
                            {chordGroups.maj7.length > 15 && ` ... (+${chordGroups.maj7.length - 15})`}
                        </div>
                    )}
                    {chordGroups.m7.length > 0 && (
                        <div style={{ marginBottom: '6px' }}>
                            <strong>Minor 7th (m7):</strong> {chordGroups.m7.slice(0, 15).join(', ')}
                            {chordGroups.m7.length > 15 && ` ... (+${chordGroups.m7.length - 15})`}
                        </div>
                    )}
                    {chordGroups.dom7.length > 0 && (
                        <div style={{ marginBottom: '6px' }}>
                            <strong>Dominant 7th (7):</strong> {chordGroups.dom7.slice(0, 15).join(', ')}
                            {chordGroups.dom7.length > 15 && ` ... (+${chordGroups.dom7.length - 15})`}
                        </div>
                    )}
                    {chordGroups.dim7.length > 0 && (
                        <div style={{ marginBottom: '6px' }}>
                            <strong>Diminished 7th (dim7):</strong> {chordGroups.dim7.slice(0, 15).join(', ')}
                            {chordGroups.dim7.length > 15 && ` ... (+${chordGroups.dim7.length - 15})`}
                        </div>
                    )}
                    {chordGroups.m7b5.length > 0 && (
                        <div style={{ marginBottom: '6px' }}>
                            <strong>Half-diminished 7th (m7b5):</strong> {chordGroups.m7b5.slice(0, 15).join(', ')}
                            {chordGroups.m7b5.length > 15 && ` ... (+${chordGroups.m7b5.length - 15})`}
                        </div>
                    )}
                    {chordGroups.aug7.length > 0 && (
                        <div style={{ marginBottom: '6px' }}>
                            <strong>Augmented 7th (aug7):</strong> {chordGroups.aug7.slice(0, 15).join(', ')}
                            {chordGroups.aug7.length > 15 && ` ... (+${chordGroups.aug7.length - 15})`}
                        </div>
                    )}
                    {chordGroups.other.length > 0 && (
                        <div style={{ marginBottom: '6px' }}>
                            <strong>Другие:</strong> {chordGroups.other.join(', ')}
                        </div>
                    )}
                    <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #ddd', fontStyle: 'italic', color: '#888' }}>
                        <strong>Пример переопределения:</strong> Cm C2 Eb2 G2 (переопределит стандартный Cm)
                    </div>
                </div>
            )}
        </div>
    );
};

const Controls = ({ 
    options, 
    onOptionsChange, 
    onGeneratePdf, 
    onConvertToMIDI, 
    onPreviewChords,
    onTogglePlayback,
    onStopPlayback,
    isPlaying,
    isPaused,
    currentTime,
    totalTime,
    progress,
    loading, 
    hasData 
}) => {
    const handleOptionChange = (key, value) => {
        onOptionsChange({
            ...options,
            [key]: value
        });
    };

    const fontSizeOptions = [8, 9, 10, 11, 12, 14, 16, 18, 20];
    const lineHeightOptions = [0.3, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8];
    const offsetOptions = [50, 60, 70, 80, 90, 100];
    const staffLineSpacingOptions = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8];
    const staffSpacingOptions = [1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
    const staffVerticalOffsetOptions = [-10, -8, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 8, 10];
    const staffLineWidthOptions = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.5, 0.6, 0.7, 0.8, 1.0];
    const staffLineCountOptions = [3, 4, 5, 6, 7, 8];
    const fontFamilyOptions = ['Roboto Mono', 'PT Mono', 'Courier', 'Helvetica'];
    const fontStyleOptions = [
        { value: 'normal', label: 'Normal' },
        { value: 'bold', label: 'Bold' },
        { value: 'italic', label: 'Italic' },
        { value: 'bolditalic', label: 'Bold Italic' },
        { value: 'light', label: 'Light' },
        { value: 'medium', label: 'Medium' },
        { value: 'semibold', label: 'Semi Bold' }
    ];

    return (
        <div className="controls">
            <div className="preview-header">
                <button
                    onClick={onGeneratePdf}
                    className="preview-btn"
                    disabled={loading || !hasData}
                    title={!hasData ? 'Сначала введите данные' : ''}
                >
                    {loading ? '⏳ Генерация...' : '👁️ Предпросмотр PDF'}
                </button>

                {!hasData && (
                    <div className="warning-message">
                        Введите данные для генерации
                    </div>
                )}
            </div>

            <div className="controls-columns">
                {/* Колонка 1: Отображение */}
                <div className="control-column">
                    <div className="settings-group">
                        <h4>Отображение</h4>
                        <div className="checkbox-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={options.showLyrics}
                                    onChange={(e) => handleOptionChange('showLyrics', e.target.checked)}
                                />
                                <span>Текст песни</span>
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={options.showChords}
                                    onChange={(e) => handleOptionChange('showChords', e.target.checked)}
                                />
                                <span>Аккорды</span>
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={options.showTempo}
                                    onChange={(e) => handleOptionChange('showTempo', e.target.checked)}
                                />
                                <span>Темп/Тональность</span>
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={options.showTitle}
                                    onChange={(e) => handleOptionChange('showTitle', e.target.checked)}
                                />
                                <span>Заголовок</span>
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={options.showLegend}
                                    onChange={(e) => handleOptionChange('showLegend', e.target.checked)}
                                />
                                <span>Легенда</span>
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={options.showStatistics}
                                    onChange={(e) => handleOptionChange('showStatistics', e.target.checked)}
                                />
                                <span>Статистика</span>
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={options.showStaff}
                                    onChange={(e) => handleOptionChange('showStaff', e.target.checked)}
                                />
                                <span>Нотоносец</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Колонка 2: Форматирование */}
                <div className="control-column">
                    <div className="settings-group">
                        <h4>Форматирование</h4>
                        <div className="control-item">
                            <label>
                                <span>Смещение текста:</span>
                                <select
                                    value={options.fixedTextOffset || 80}
                                    onChange={(e) => handleOptionChange('fixedTextOffset', parseInt(e.target.value))}
                                >
                                    {offsetOptions.map(offset => (
                                        <option key={offset} value={offset}>
                                            {offset}px
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="control-item">
                            <label>
                                <span>Размер шрифта:</span>
                                <select
                                    value={options.fontSize}
                                    onChange={(e) => handleOptionChange('fontSize', parseInt(e.target.value))}
                                >
                                    {fontSizeOptions.map(size => (
                                        <option key={size} value={size}>
                                            {size}px
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="control-item">
                            <label>
                                <span>Межстрочный интервал:</span>
                                <select
                                    value={options.lineHeight}
                                    onChange={(e) => handleOptionChange('lineHeight', parseFloat(e.target.value))}
                                >
                                    {lineHeightOptions.map(height => (
                                        <option key={height} value={height}>
                                            {height}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="control-item">
                            <label>
                                <span>Отступы страницы:</span>
                                <select
                                    value={options.pageMargins || 20}
                                    onChange={(e) => handleOptionChange('pageMargins', parseInt(e.target.value))}
                                >
                                    <option value={10}>10px</option>
                                    <option value={15}>15px</option>
                                    <option value={20}>20px</option>
                                    <option value={25}>25px</option>
                                    <option value={30}>30px</option>
                                </select>
                            </label>
                        </div>
                        {options.showStaff && (
                            <>
                                <div className="control-item">
                                    <label>
                                        <span>Количество линий:</span>
                                        <select
                                            value={options.staffLineCount !== undefined ? options.staffLineCount : 5}
                                            onChange={(e) => handleOptionChange('staffLineCount', parseInt(e.target.value))}
                                        >
                                            {staffLineCountOptions.map(count => (
                                                <option key={count} value={count}>
                                                    {count} линий
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div className="control-item">
                                    <label>
                                        <span>Расстояние между линиями нотного стана:</span>
                                        <select
                                            value={options.staffLineSpacing !== undefined ? options.staffLineSpacing : 2}
                                            onChange={(e) => handleOptionChange('staffLineSpacing', parseFloat(e.target.value))}
                                        >
                                            {staffLineSpacingOptions.map(spacing => (
                                                <option key={spacing} value={spacing}>
                                                    {spacing}px
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div className="control-item">
                                    <label>
                                        <span>Расстояние между нотными станами:</span>
                                        <select
                                            value={options.staffSpacing !== undefined ? options.staffSpacing : 8}
                                            onChange={(e) => handleOptionChange('staffSpacing', parseInt(e.target.value))}
                                        >
                                            {staffSpacingOptions.map(spacing => (
                                                <option key={spacing} value={spacing}>
                                                    {spacing}px
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div className="control-item">
                                    <label>
                                        <span>Вертикальный сдвиг нотного стана:</span>
                                        <select
                                            value={options.staffVerticalOffset !== undefined ? options.staffVerticalOffset : 0}
                                            onChange={(e) => handleOptionChange('staffVerticalOffset', parseInt(e.target.value))}
                                        >
                                            {staffVerticalOffsetOptions.map(offset => (
                                                <option key={offset} value={offset}>
                                                    {offset > 0 ? `+${offset}px` : `${offset}px`}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div className="control-item">
                                    <label>
                                        <span>Толщина линий нотного стана:</span>
                                        <select
                                            value={options.staffLineWidth !== undefined ? options.staffLineWidth : 0.1}
                                            onChange={(e) => handleOptionChange('staffLineWidth', parseFloat(e.target.value))}
                                        >
                                            {staffLineWidthOptions.map(width => (
                                                <option key={width} value={width}>
                                                    {width}px
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Колонка 3: Шрифты */}
                <div className="control-column">
                    <div className="settings-group">
                        <h4>Шрифт</h4>
                        <div className="control-item">
                            <label>
                                <span>Шрифт:</span>
                                <select
                                    value={options.fontFamily || 'Roboto Mono'}
                                    onChange={(e) => handleOptionChange('fontFamily', e.target.value)}
                                >
                                    {fontFamilyOptions.map(font => (
                                        <option key={font} value={font}>
                                            {font}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Колонка 4: Инструмент */}
                <div className="control-column">
                    <div className="settings-group">
                        <h4>Инструмент</h4>
                        <div className="control-item">
                            <label>
                                <span>Инструмент:</span>
                                <select
                                    value={options.instrument}
                                    onChange={(e) => handleOptionChange('instrument', e.target.value)}
                                >
                                    <option value="guitar">Гитара</option>
                                    <option value="bass">Бас-гитара</option>
                                    <option value="banjo">Банджо</option>
                                    <option value="mandolin">Мандолина</option>
                                    <option value="ukulele">Укулеле</option>
                                </select>
                            </label>
                        </div>
                        <div className="control-item">
                            <label>
                                <span>Каподастр:</span>
                                <input
                                    type="number"
                                    min="0"
                                    max="7"
                                    value={options.capo}
                                    onChange={(e) => handleOptionChange('capo', parseInt(e.target.value) || 0)}
                                />
                            </label>
                        </div>
                        <div className="control-item">
                            <label>
                                <span>Пользовательские аккорды:</span>
                                <textarea
                                    value={options.chordOverrides || ''}
                                    onChange={(e) => handleOptionChange('chordOverrides', e.target.value)}
                                    placeholder={getChordPlaceholder()}
                                    rows={12}
                                    style={{
                                        width: '100%',
                                        fontFamily: 'monospace',
                                        fontSize: '11px',
                                        padding: '5px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        resize: 'vertical'
                                    }}
                                />
                                <ChordLegend />
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Элементы управления MIDI - ниже остальных */}
            <div className="midi-controls" style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid #ddd' }}>
                <div className="settings-group">
                    <h4>Воспроизведение</h4>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
                        <button
                            onClick={() => onTogglePlayback && onTogglePlayback()}
                            disabled={!hasData}
                            style={{
                                background: isPlaying && !isPaused ? '#FF9800' : '#4CAF50',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: !hasData ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                opacity: !hasData ? 0.6 : 1
                            }}
                        >
                            {isPlaying && !isPaused ? '⏸ Пауза' : '▶ Воспроизвести'}
                        </button>
                        <button
                            onClick={() => onStopPlayback && onStopPlayback()}
                            disabled={!isPlaying}
                            style={{
                                background: '#f44336',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: !isPlaying ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                opacity: !isPlaying ? 0.6 : 1
                            }}
                        >
                            ⏹ Остановить
                        </button>
                    </div>
                    
                    {/* Прогресс-бар */}
                    {isPlaying && (
                        <div style={{ marginTop: '10px' }}>
                            <div style={{
                                width: '100%',
                                height: '8px',
                                background: '#e0e0e0',
                                borderRadius: '4px',
                                overflow: 'hidden',
                                marginBottom: '5px'
                            }}>
                                <div style={{
                                    height: '100%',
                                    background: '#4CAF50',
                                    width: `${progress}%`,
                                    transition: 'width 0.1s linear'
                                }} />
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '12px',
                                color: '#666'
                            }}>
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(totalTime)}</span>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="settings-group" style={{ marginTop: '15px' }}>
                    <h4>Конвертация в MIDI</h4>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => onConvertToMIDI && onConvertToMIDI()}
                            className="midi-btn"
                            disabled={loading || !hasData}
                            style={{
                                background: '#4CAF50',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: loading || !hasData ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                opacity: loading || !hasData ? 0.6 : 1
                            }}
                        >
                            {loading ? '⏳ Генерация...' : '📥 Скачать MIDI'}
                        </button>
                        <button
                            onClick={() => onPreviewChords && onPreviewChords()}
                            className="midi-btn secondary"
                            disabled={!hasData}
                            style={{
                                background: '#2196F3',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: !hasData ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                opacity: !hasData ? 0.6 : 1
                            }}
                        >
                            🔍 Проверить аккорды
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Controls;