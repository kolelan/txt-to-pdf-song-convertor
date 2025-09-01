export const processChordsForInstrument = (chord, instrument, capo) => {
  // Базовая обработка аккордов
  // В реальном приложении здесь будет сложная логика

  switch (instrument) {
    case 'guitar':
      return `${chord} (G)`;
    case 'bass':
      return `${chord} (B)`;
    case 'banjo':
      return `${chord} (BJ)`;
    case 'mandolin':
      return `${chord} (M)`;
    case 'ukulele':
      return `${chord} (U)`;
    default:
      return chord;
  }
};