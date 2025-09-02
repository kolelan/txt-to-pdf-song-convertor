export const parseAbcNotation = (text) => {
  console.log('Parsing ABC notation');

  const result = {
    title: 'Unknown Song',
    tempo: 120,
    meter: '4/4',
    key: 'C',
    composer: '',
    sections: [],
    totalBars: 0 // Добавляем общее количество тактов
  };

  const lines = text.split('\n');
  let currentSection = { name: 'Main', measures: [], bars: 0 };
  let totalBars = 0;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    // Парсинг метаданных
    if (trimmedLine.startsWith('T:')) {
      result.title = trimmedLine.substring(2).trim();
    } else if (trimmedLine.startsWith('Q:')) {
      const tempoMatch = trimmedLine.match(/\d+/);
      if (tempoMatch) result.tempo = parseInt(tempoMatch[0]);
    } else if (trimmedLine.startsWith('M:')) {
      result.meter = trimmedLine.substring(2).trim();
    } else if (trimmedLine.startsWith('K:')) {
      result.key = trimmedLine.substring(2).trim();
    } else if (trimmedLine.startsWith('R:')) {
      result.composer = trimmedLine.substring(2).trim();
    }

    // Парсинг секций
    else if (trimmedLine.startsWith('%')) {
      if (currentSection.measures.length > 0) {
        result.sections.push({...currentSection});
        totalBars += currentSection.bars;
      }
      currentSection = {
        name: trimmedLine.substring(1).trim() || 'Section',
        measures: [],
        bars: 0
      };
    }

    // Парсинг строк с аккордами и текстом
    else if (trimmedLine.includes('|') || trimmedLine.includes('%')) {
      const commentIndex = trimmedLine.indexOf('%');
      let chordLine = trimmedLine;
      let lyrics = '';

      if (commentIndex !== -1) {
        chordLine = trimmedLine.substring(0, commentIndex).trim();
        lyrics = trimmedLine.substring(commentIndex + 1).trim();
      }

      // Подсчитываем такты в этой строке
      const barsInLine = countBarsInLine(chordLine);

      currentSection.measures.push({
        chordPart: chordLine,
        lyrics: lyrics,
        originalLine: trimmedLine,
        bars: barsInLine
      });

      currentSection.bars += barsInLine;
    }
  }

  // Добавляем последнюю секцию
  if (currentSection.measures.length > 0) {
    result.sections.push({...currentSection});
    totalBars += currentSection.bars;
  }

  result.totalBars = totalBars;
  console.log('Parsing result:', result);
  return result;
};

// Функция для подсчета тактов в строке
const countBarsInLine = (chordLine) => {
  if (!chordLine) return 0;

  let bars = 0;
  let inRepeat = false;
  let repeatCount = 1;

  // Убираем лишние пробелы и разбиваем на токены
  const tokens = chordLine.split(/(\|+\:?|\:\|+)/).filter(token => token.trim());

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].trim();

    if (token === '||:' || token === '|:') {
      // Начало повторения
      inRepeat = true;
      repeatCount = 2; // По умолчанию повторяем 2 раза
    }
    else if (token === ':||' || token === ':|') {
      // Конец повторения
      inRepeat = false;
    }
    else if (token === '||') {
      // Двойная черта - обычно означает конец секции
      bars += 1;
    }
    else if (token.includes('|')) {
      // Обычные тактовые черты
      const barCount = (token.match(/\|/g) || []).length;
      bars += barCount;
    }
    else if (token && !token.match(/^[\|\:]+$/)) {
      // Аккорды между тактовыми чертами - считаем как 1 такт
      bars += 1;
    }
  }

  // Умножаем на количество повторений если есть повторение
  if (inRepeat) {
    bars *= repeatCount;
  }

  return bars;
};

// Альтернативная более простая версия подсчета
const countBarsSimple = (chordLine) => {
  if (!chordLine) return 0;

  // Убираем всё после % если есть
  const cleanLine = chordLine.split('%')[0].trim();

  // Считаем количество тактовых черт
  const barLines = cleanLine.split('|').filter(part => {
    const trimmed = part.trim();
    return trimmed && !trimmed.startsWith(':') && !trimmed.endsWith(':');
  });

  return barLines.length;
};

// Улучшенная версия подсчета с учетом повторений
const countBarsAdvanced = (chordLine) => {
  if (!chordLine) return 0;

  let totalBars = 0;
  let repeatStack = [];
  let currentMultiplier = 1;

  // Разбиваем на токены
  const tokens = chordLine.split(/(\|\|?\:?|\:\|?)/).filter(token => token.trim());

  for (const token of tokens) {
    const cleanToken = token.trim();

    if (cleanToken === '|:' || cleanToken === '||:') {
      // Начало повторения - умножаем следующие такты на 2
      repeatStack.push(2);
      currentMultiplier *= 2;
    }
    else if (cleanToken === ':|' || cleanToken === ':||') {
      // Конец повторения
      if (repeatStack.length > 0) {
        currentMultiplier /= repeatStack.pop();
      }
    }
    else if (cleanToken === '||') {
      // Двойная черта - 1 такт
      totalBars += 1 * currentMultiplier;
    }
    else if (cleanToken === '|') {
      // Одиночная черта - 1 такт
      totalBars += 1 * currentMultiplier;
    }
    else if (cleanToken && !cleanToken.match(/^[\|\:]+$/)) {
      // Аккорды - считаем как 1 такт
      totalBars += 1 * currentMultiplier;
    }
  }

  return totalBars;
};