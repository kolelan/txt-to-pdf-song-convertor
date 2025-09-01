import { jsPDF } from 'jspdf';

// Простая функция транслитерации
const transliterate = (text) => {
  if (!text) return '';

  const cyrillicMap = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
    'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo',
    'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
    'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
    'Ф': 'F', 'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch', 'Ъ': '',
    'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
  };

  return text.split('').map(char => {
    return cyrillicMap[char] || char;
  }).join('');
};

export const generatePdf = async (parsedData, options) => {
  try {
    const doc = new jsPDF();
    let yPosition = 20;
    const margin = 20;
    const lineHeight = 6;

    // Используем моноширинный шрифт
    doc.setFont('courier');
    doc.setFontSize(9);

    // Заголовок
    if (options.showTitle) {
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      const title = parsedData.title ? transliterate(parsedData.title) : 'Song';
      doc.text(title, 105, yPosition, { align: 'center' });
      yPosition += 10;
      doc.setFontSize(9);
    }

    // Метаданные
    if (options.showTempo) {
      doc.setFont(undefined, 'normal');
      const metaInfo = [
        parsedData.tempo && `T: ${parsedData.tempo}`,
        parsedData.meter && `M: ${parsedData.meter}`,
        parsedData.key && `K: ${parsedData.key}`,
        parsedData.composer && `By: ${transliterate(parsedData.composer)}`
      ].filter(Boolean).join(' | ');

      doc.text(metaInfo, 105, yPosition, { align: 'center' });
      yPosition += 6;
    }

    yPosition += 4;

    // Секции
    if (parsedData.sections && parsedData.sections.length > 0) {
      for (const section of parsedData.sections) {
        // Заголовок секции
        doc.setFont(undefined, 'bold');
        const sectionName = section.name ? transliterate(section.name) : 'Section';
        doc.text(sectionName, margin, yPosition);
        yPosition += 5;
        doc.setFont(undefined, 'normal');

        if (section.measures && section.measures.length > 0) {
          for (const measure of section.measures) {
            // Восстанавливаем оригинальное форматирование строки
            const originalLine = measure.originalLine || '';
            const commentIndex = originalLine.indexOf('%');

            if (commentIndex !== -1) {
              // Аккордовая часть (до %)
              const chordPart = originalLine.substring(0, commentIndex).trim();

              // Текстовая часть (после %)
              const textPart = originalLine.substring(commentIndex + 1).trim();

              // Отображаем аккорды
              if (options.showChords && chordPart) {
                doc.setFont(undefined, 'bold');
                doc.text(chordPart, margin, yPosition);
              }

              // Отображаем текст на той же строке, сохраняя оригинальное положение
              if (options.showLyrics && textPart) {
                doc.setFont(undefined, 'normal');

                // Вычисляем позицию текста на основе оригинальной строки
                const textPosition = calculateTextPosition(doc, originalLine, commentIndex, margin);
                doc.text(transliterate(textPart), textPosition, yPosition);
              }

              yPosition += lineHeight;
            } else {
              // Если нет комментария, просто отображаем аккорды
              if (options.showChords && measure.chordPart) {
                doc.setFont(undefined, 'bold');
                doc.text(measure.chordPart, margin, yPosition);
                yPosition += lineHeight;
              }
            }

            if (yPosition > 270) {
              doc.addPage();
              yPosition = 20;
            }
          }
        }

        yPosition += 3;
      }
    }

    return doc.output('blob');

  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('Failed to generate PDF');
  }
};

// Функция для вычисления позиции текста на основе оригинальной строки
const calculateTextPosition = (doc, originalLine, commentIndex, margin) => {
  // Берем часть строки до комментария для вычисления ширины
  const chordPart = originalLine.substring(0, commentIndex);
  const chordWidth = doc.getTextWidth(chordPart);

  // Возвращаем позицию с небольшим отступом
  return margin + chordWidth + 2;
};