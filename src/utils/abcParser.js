export const parseAbcNotation = (text) => {
  console.log('Parsing ABC notation');

  const result = {
    title: 'Unknown Song',
    tempo: 120,
    meter: '4/4',
    key: 'C',
    composer: '',
    sections: []
  };

  const lines = text.split('\n');
  let currentSection = { name: 'Main', measures: [] };

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    // Метаданные
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

    // Секции
    else if (trimmedLine.startsWith('%')) {
      if (currentSection.measures.length > 0) {
        result.sections.push({...currentSection});
      }
      currentSection = {
        name: trimmedLine.substring(1).trim() || 'Section',
        measures: []
      };
    }

    // Строки с аккордами и текстом
    else if (trimmedLine.includes('|') || trimmedLine.includes('%')) {
      const commentIndex = trimmedLine.indexOf('%');
      let chordPart = trimmedLine;
      let lyrics = '';

      if (commentIndex !== -1) {
        chordPart = trimmedLine.substring(0, commentIndex).trim();
        lyrics = trimmedLine.substring(commentIndex + 1).trim();
      }

      currentSection.measures.push({
        chordPart: chordPart,
        lyrics: lyrics,
        originalLine: trimmedLine
      });
    }
  }

  // Добавляем последнюю секцию
  if (currentSection.measures.length > 0) {
    result.sections.push(currentSection);
  }

  // Если нет секций, создаем одну
  if (result.sections.length === 0 && currentSection.measures.length > 0) {
    result.sections.push(currentSection);
  }

  console.log('Parsing result:', result);
  return result;
};