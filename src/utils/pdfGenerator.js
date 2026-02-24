import { jsPDF } from 'jspdf';
import { registerCyrillicFont, safeText } from './cyrillicFonts';
import { getBarStatistics } from './barCounter';

// Функция для рисования нотного стана
// y - позиция верхней линии стана (базовая линия текста аккордов)
// lineSpacing - расстояние между линиями
// lineWidth - толщина линий
const drawStaff = (doc, x, y, width, lineSpacing = 3, lineWidth = 0.35) => {
  // Сохраняем текущую толщину линии
  const currentLineWidth = doc.getLineWidth();
  // Устанавливаем толщину линий нотного стана
  doc.setLineWidth(lineWidth);
  
  // Рисуем 5 горизонтальных линий нотного стана на равном расстоянии
  // Верхняя линия на позиции y, остальные ниже
  for (let i = 0; i < 5; i++) {
    const lineY = y + (i * lineSpacing);
    doc.line(x, lineY, x + width, lineY);
  }
  
  // Восстанавливаем исходную толщину линии
  doc.setLineWidth(currentLineWidth);
};

export const generatePdf = async (parsedData, options) => {
  try {
    const doc = new jsPDF();
    let yPosition = 20;
    const margin = 20;
    const lineHeight = options.fontSize * options.lineHeight;
    const fixedTextOffset = options.fixedTextOffset || 80;

    // Регистрируем кириллические шрифты
    await registerCyrillicFont(doc);

    doc.setFontSize(options.fontSize);
    doc.setFont(options.fontFamily, options.fontStyle);

    // Заголовок
    if (options.showTitle) {
      const titleSize = Math.max(options.fontSize + 4, 14);
      doc.setFontSize(titleSize);
      doc.setFont(options.fontFamily, 'bold');
      const title = parsedData.title || 'Song';
      safeText(doc, title, 105, yPosition, { align: 'center' });
      yPosition += titleSize * options.lineHeight + 2;
      doc.setFontSize(options.fontSize);
    }

    // Метаданные
    if (options.showTempo) {
      doc.setFont(options.fontFamily, 'normal');
      const metaInfo = [
        parsedData.tempo && `T: ${parsedData.tempo}`,
        parsedData.meter && `M: ${parsedData.meter}`,
        parsedData.key && `K: ${parsedData.key}`,
        parsedData.composer && `By: ${parsedData.composer}`
      ].filter(Boolean).join(' | ');

      safeText(doc, metaInfo, 105, yPosition, { align: 'center' });
      yPosition += lineHeight;
    }

    yPosition += 4;

    // Секции
    if (parsedData.sections && parsedData.sections.length > 0) {
      for (const section of parsedData.sections) {
        // Заголовок секции
        const sectionSize = options.fontSize + 1;
        doc.setFontSize(sectionSize);
        doc.setFont(options.fontFamily, 'bold');
        const sectionName = section.name || 'Section';
        safeText(doc, sectionName, margin, yPosition);
        yPosition += sectionSize * options.lineHeight;
        doc.setFontSize(options.fontSize);
        doc.setFont(options.fontFamily, 'normal');

        if (section.measures && section.measures.length > 0) {
          for (const measure of section.measures) {
            // Отображаем аккорды
            if (options.showChords && measure.chordPart) {
              doc.setFont(options.fontFamily, 'bold');
              safeText(doc, measure.chordPart, margin, yPosition);
            }

            // Отображаем нотный стан или текст с выравниванием
            if (options.showStaff) {
              // Рисуем нотный стан вместо текста
              // Нотный стан должен начинаться на той же строке, что и аккорды
              const staffWidth = 120; // Ширина нотного стана
              const staffLineSpacing = options.staffLineSpacing || 3; // Расстояние между линиями внутри стана
              const staffLineWidth = options.staffLineWidth !== undefined ? options.staffLineWidth : 0.35; // Толщина линий
              // Базовый сдвиг вверх 5px + настраиваемый сдвиг из опций
              const baseOffset = -5; // Базовый сдвиг вверх на 5px
              const customOffset = options.staffVerticalOffset !== undefined ? options.staffVerticalOffset : 0;
              const totalOffset = baseOffset + customOffset;
              const staffY = yPosition + totalOffset; // Позиция по Y с учетом сдвига (верхняя линия стана)
              const staffX = fixedTextOffset; // Позиция по X (там же, где обычно текст)
              drawStaff(doc, staffX, staffY, staffWidth, staffLineSpacing, staffLineWidth);
              
              // Используем специальное расстояние между станами
              // Учитываем высоту стана (4 промежутка между 5 линиями) + дополнительное расстояние
              const staffHeight = 4 * staffLineSpacing; // Высота стана (4 промежутка между 5 линиями)
              const staffSpacing = options.staffSpacing || 16;
              yPosition += staffHeight + staffSpacing; // Перемещаемся на высоту стана + расстояние до следующего
            } else if (options.showLyrics && measure.lyrics) {
              // Отображаем текст песни
              doc.setFont(options.fontFamily, 'normal');
              safeText(doc, measure.lyrics, fixedTextOffset, yPosition);
              yPosition += lineHeight;
            } else {
              // Если ни текст, ни нотный стан не отображаются, используем обычный lineHeight
              yPosition += lineHeight;
            }

            if (yPosition > 270) {
              doc.addPage();
              yPosition = 20;
              doc.setFontSize(options.fontSize);
              doc.setFont(options.fontFamily, options.fontStyle);
            }
          }
        }

        yPosition += lineHeight / 2;
      }
    }

    // Легенда
    if (options.showLegend && yPosition < 270) {
      const legendSize = options.fontSize - 1;
      doc.setFontSize(legendSize);
      doc.setFont(options.fontFamily, 'italic');
      doc.setTextColor(100, 100, 100);

      const legend = [
        options.capo > 0 && `Capo: fret ${options.capo}`,
        `Instrument: ${options.instrument}`,
        `Font: ${options.fontFamily} ${options.fontStyle}`,
        'Generated by Music Converter'
      ].filter(Boolean);

      legend.forEach((line, index) => {
        if (yPosition + (index * legendSize * options.lineHeight) < 285) {
          safeText(doc, line, margin, yPosition + (index * legendSize * options.lineHeight));
        }
      });

      yPosition += legend.length * legendSize * options.lineHeight + 5;
    }

    // Статистика (после легенды)
    if (options.showStatistics && yPosition < 270) {
      const statsSize = options.fontSize - 2;
      doc.setFontSize(statsSize);
      doc.setFont(options.fontFamily, 'normal');
      doc.setTextColor(80, 80, 80);

      // Получаем статистику тактов
      const stats = getBarStatistics(parsedData);

      // Заголовок статистики
      safeText(doc, 'Статистика тактов:', margin, yPosition);
      yPosition += statsSize * options.lineHeight;

      // Общая информация
      safeText(doc, `Всего тактов: ${stats.total}`, margin + 5, yPosition);
      yPosition += statsSize * options.lineHeight;

      safeText(doc, `Секций: ${stats.sections}`, margin + 5, yPosition);
      yPosition += statsSize * options.lineHeight;

      // Детали секций
      safeText(doc, 'Детали секций:', margin, yPosition);
      yPosition += statsSize * options.lineHeight;

      stats.sectionDetails.forEach(section => {
        if (yPosition < 270) {
          safeText(doc, `${section.name}: ${section.bars} тактов`, margin + 10, yPosition);
          yPosition += statsSize * options.lineHeight;
        }
      });
    }

    return doc.output('blob');

  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('Failed to generate PDF');
  }
};