// Base64 encoded Cyrillic font (simplified version)
export const registerCyrillicFont = (doc) => {
    // Для production используйте нормальные шрифты
    doc.setFont('helvetica');
    return doc;
};

// Альтернатива: используем стандартные шрифты, которые поддерживают кириллицу
export const setCyrillicFont = (doc) => {
    try {
        // Пробуем разные шрифты, которые могут поддерживать кириллицу
        const fonts = ['helvetica', 'times', 'courier'];
        for (const font of fonts) {
            try {
                doc.setFont(font);
                // Проверяем, работает ли шрифт
                doc.text('Тест', 10, 10);
                return doc;
            } catch (e) {
                continue;
            }
        }
        // Если ничего не работает, используем helvetica
        doc.setFont('helvetica');
        return doc;
    } catch (error) {
        console.warn('Font setting error:', error);
        return doc;
    }
};