import React from 'react';
import './Controls.css';

const Controls = ({ options, onOptionsChange, onGeneratePdf, loading, hasData }) => {
    const handleOptionChange = (key, value) => {
        onOptionsChange({
            ...options,
            [key]: value
        });
    };

    return (
        <div className="controls">
            <h3>Настройки генерации</h3>

            <div className="control-group">
                <label>
                    <input
                        type="checkbox"
                        checked={options.showLyrics}
                        onChange={(e) => handleOptionChange('showLyrics', e.target.checked)}
                    />
                    Показывать текст песни
                </label>
            </div>

            <div className="control-group">
                <label>
                    <input
                        type="checkbox"
                        checked={options.showChords}
                        onChange={(e) => handleOptionChange('showChords', e.target.checked)}
                    />
                    Показывать аккорды
                </label>
            </div>

            <div className="control-group">
                <label>
                    <input
                        type="checkbox"
                        checked={options.showLegend}
                        onChange={(e) => handleOptionChange('showLegend', e.target.checked)}
                    />
                    Показывать легенду
                </label>
            </div>

            <div className="control-group">
                <label>
                    Инструмент:
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

            <div className="control-group">
                <label>
                    Каподастр:
                    <input
                        type="number"
                        min="0"
                        max="7"
                        value={options.capo}
                        onChange={(e) => handleOptionChange('capo', parseInt(e.target.value) || 0)}
                    />
                </label>
            </div>

            <button
                onClick={onGeneratePdf}
                className="generate-btn"
                disabled={loading || !hasData}
                title={!hasData ? 'Сначала введите данные' : ''}
            >
                {loading ? 'Генерация...' : 'Сгенерировать PDF'}
            </button>
        </div>
    );
};

export default Controls;