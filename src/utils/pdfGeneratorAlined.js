import { jsPDF } from 'jspdf';
import {transliterate} from "./transliterate";
// Версия с вычислением максимальной ширины аккордов
export const generatePdfAligned = async (parsedData, options) => {
    try {
        const doc = new jsPDF();
        let yPosition = 20;
        const margin = 20;
        const lineHeight = 6;
        const textPadding = 10; // Отступ между аккордами и текстом

        doc.setFont('courier');
        doc.setFontSize(9);

        // Сначала вычисляем максимальную ширину аккордных частей
        let maxChordWidth = 0;
        if (parsedData.sections && parsedData.sections.length > 0) {
            for (const section of parsedData.sections) {
                if (section.measures && section.measures.length > 0) {
                    for (const measure of section.measures) {
                        if (measure.chordPart) {
                            const width = doc.getTextWidth(measure.chordPart);
                            if (width > maxChordWidth) {
                                maxChordWidth = width;
                            }
                        }
                    }
                }
            }
        }

        // Добавляем отступ для текста
        const textStartPosition = margin + maxChordWidth + textPadding;

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
                        // Отображаем аккорды
                        if (options.showChords && measure.chordPart) {
                            doc.setFont(undefined, 'bold');
                            doc.text(measure.chordPart, margin, yPosition);
                        }

                        // Отображаем текст с выравниванием
                        if (options.showLyrics && measure.lyrics) {
                            doc.setFont(undefined, 'normal');
                            const lyricsText = transliterate(measure.lyrics);
                            doc.text(lyricsText, textStartPosition, yPosition);
                        }

                        yPosition += lineHeight;

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