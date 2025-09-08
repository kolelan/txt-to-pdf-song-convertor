import React from 'react';
import './Controls.css';

const Controls = ({ options, onOptionsChange, onGeneratePdf, loading, hasData }) => {
    const handleOptionChange = (key, value) => {
        onOptionsChange({
            ...options,
            [key]: value
        });
    };

    const fontSizeOptions = [8, 9, 10, 11, 12, 14, 16, 18, 20];
    const lineHeightOptions = [0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8];
    const offsetOptions = [50, 60, 70, 80, 90, 100];
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
                    </div>
                </div>

                {/* Колонка 3: Шрифты и инструмент */}
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
                        <div className="control-item">
                            <label>
                                <span>Стиль шрифта:</span>
                                <select
                                    value={options.fontStyle || 'normal'}
                                    onChange={(e) => handleOptionChange('fontStyle', e.target.value)}
                                >
                                    {fontStyleOptions.map(style => (
                                        <option key={style.value} value={style.value}>
                                            {style.label}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </div>

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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Controls;