// src/check-fonts.js

import { registerCyrillicFont, safeText } from './utils/cyrillicFonts.js';
import { jsPDF } from 'jspdf';

async function testFonts() {
    try {
        const doc = new jsPDF();

        console.log('Регистрируем шрифты...');
        const success = await registerCyrillicFont(doc);

        if (success) {
            console.log('Шрифты успешно зарегистрированы');

            // Проверяем доступные шрифты
            const fontList = doc.getFontList();
            console.log('Доступные шрифты:', Object.keys(fontList));

            // Убеждаемся, что установлен правильный шрифт
            doc.setFont('Roboto Mono', 'normal');

            // Добавляем текст
            safeText(doc, 'Привет мир!', 20, 20);
            safeText(doc, 'Hello world!', 20, 30);
            safeText(doc, 'Тестовый текст', 20, 40);
            safeText(doc, 'Подъезд с твёрдым знаком', 20, 50);
            safeText(doc, 'Сельдь с двумя мягкими', 20, 60);

            // Сохраняем для проверки
            doc.save('test-fonts.pdf');
            console.log('PDF создан успешно!');
        } else {
            console.log('Не удалось зарегистрировать кириллические шрифты');
        }

    } catch (error) {
        console.error('Ошибка:', error);
    }
}

testFonts();