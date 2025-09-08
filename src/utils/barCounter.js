// src/utils/barCounter.js

/**
 * Подсчитывает количество тактов в строке ABC notation
 * @param {string} abcLine - Строка ABC notation
 * @returns {number} - Количество тактов в строке
 */
export const countBarsInLine = (abcLine) => {
    if (!abcLine || typeof abcLine !== 'string') return 0;

    // Убираем комментарии (всё после %)
    const cleanLine = abcLine.split('%')[0].trim();
    if (!cleanLine) return 0;

    // Считаем количество тактов по разделителям |
    const bars = cleanLine.split('|').filter(bar => {
        const trimmedBar = bar.trim();
        return trimmedBar.length > 0 && trimmedBar !== ':';
    });

    return bars.length;
};

/**
 * Подсчитывает общее количество тактов в партитуре
 * @param {Object} parsedData - Распарсенные данные ABC notation
 * @returns {Object} - Объект с информацией о тактах
 */
export const countBars = (parsedData) => {
    if (!parsedData || !parsedData.sections) {
        return {
            totalBars: 0,
            sections: []
        };
    }

    let totalBars = 0;
    const sectionsWithBars = [];

    parsedData.sections.forEach(section => {
        let sectionBars = 0;

        if (section.measures && section.measures.length > 0) {
            // Подсчитываем такты в каждой строке секции
            section.measures.forEach(measure => {
                if (measure.originalLine) {
                    sectionBars += countBarsInLine(measure.originalLine);
                } else if (measure.chordPart) {
                    // Fallback: считаем по chordPart если нет originalLine
                    const bars = measure.chordPart.split('|').filter(bar => {
                        const trimmedBar = bar.trim();
                        return trimmedBar.length > 0 && trimmedBar !== ':';
                    }).length;
                    sectionBars += bars;
                } else {
                    // Если нет данных, считаем 1 такт на measure
                    sectionBars += 1;
                }
            });
            totalBars += sectionBars;
        }

        sectionsWithBars.push({
            name: section.name || 'Unnamed Section',
            bars: sectionBars,
            measures: section.measures || []
        });
    });

    return {
        totalBars,
        sections: sectionsWithBars,
        hasData: totalBars > 0
    };
};

/**
 * Подсчитывает такты в конкретной секции
 * @param {Array} measures - Массив тактов секции
 * @returns {number} - Количество тактов
 */
export const countBarsInSection = (measures) => {
    if (!measures || !Array.isArray(measures)) return 0;

    let sectionBars = 0;
    measures.forEach(measure => {
        if (measure.originalLine) {
            sectionBars += countBarsInLine(measure.originalLine);
        } else if (measure.chordPart) {
            const bars = measure.chordPart.split('|').filter(bar => {
                const trimmedBar = bar.trim();
                return trimmedBar.length > 0 && trimmedBar !== ':';
            }).length;
            sectionBars += bars;
        } else {
            sectionBars += 1;
        }
    });

    return sectionBars;
};

/**
 * Проверяет, содержит ли секция повторяющиеся такты
 * @param {Array} measures - Массив тактов секции
 * @returns {boolean} - Есть ли повторения
 */
export const hasRepeatedBars = (measures) => {
    if (!measures || measures.length < 2) return false;

    // Простая проверка на повторяющиеся последовательности аккордов
    const chordSequences = measures.map(measure => measure.chordPart || '');

    for (let i = 0; i < chordSequences.length - 1; i++) {
        if (chordSequences[i] === chordSequences[i + 1] && chordSequences[i] !== '') {
            return true;
        }
    }

    return false;
};

/**
 * Анализирует ABC текст и возвращает детальную информацию о тактах
 * @param {string} abcText - Полный текст ABC notation
 * @returns {Object} - Детальная информация о тактах
 */
export const analyzeBarsFromText = (abcText) => {
    if (!abcText || typeof abcText !== 'string') {
        return {
            totalBars: 0,
            sections: []
        };
    }

    const lines = abcText.split('\n');
    let currentSection = 'Intro';
    const sections = {};
    let totalBars = 0;

    lines.forEach(line => {
        const trimmedLine = line.trim();

        // Определяем начало новой секции
        if (trimmedLine.startsWith('%')) {
            const sectionMatch = trimmedLine.match(/%(.*)/);
            if (sectionMatch && sectionMatch[1].trim()) {
                currentSection = sectionMatch[1].trim();
                if (!sections[currentSection]) {
                    sections[currentSection] = { bars: 0, lines: [] };
                }
            }
            return;
        }

        // Пропускаем метаданные (X:, T:, M:, L:, Q:, R:, K:)
        if (trimmedLine.match(/^[A-Z]:/)) {
            return;
        }

        // Считаем такты в строке
        const barsInLine = countBarsInLine(trimmedLine);
        if (barsInLine > 0) {
            if (!sections[currentSection]) {
                sections[currentSection] = { bars: 0, lines: [] };
            }
            sections[currentSection].bars += barsInLine;
            sections[currentSection].lines.push({
                text: trimmedLine,
                bars: barsInLine
            });
            totalBars += barsInLine;
        }
    });

    return {
        totalBars,
        sections: Object.entries(sections).map(([name, data]) => ({
            name,
            bars: data.bars,
            lines: data.lines
        }))
    };
};

/**
 * Генерирует статистику по тактам
 * @param {Object} parsedData - Распарсенные данные
 * @returns {Object} - Статистика
 */
export const getBarStatistics = (parsedData) => {
    const barCount = countBars(parsedData);

    return {
        total: barCount.totalBars,
        sections: barCount.sections.length,
        averageBarsPerSection: barCount.sections.length > 0
            ? Math.round(barCount.totalBars / barCount.sections.length)
            : 0,
        hasRepeats: barCount.sections.some(section =>
            hasRepeatedBars(section.measures)
        ),
        sectionDetails: barCount.sections.map(section => ({
            name: section.name,
            bars: section.bars,
            hasRepeats: hasRepeatedBars(section.measures)
        }))
    };
};

export default {
    countBars,
    countBarsInLine,
    countBarsInSection,
    hasRepeatedBars,
    analyzeBarsFromText,
    getBarStatistics
};