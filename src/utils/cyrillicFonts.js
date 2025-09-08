// src/utils/cyrillicFonts.js

// Импортируем все шрифты
import RobotoMonoRegular from '../fonts/RobotoMono-Regular.js';
import RobotoMonoBold from '../fonts/RobotoMono-Bold.js';
import RobotoMonoItalic from '../fonts/RobotoMono-Italic.js';
import RobotoMonoBoldItalic from '../fonts/RobotoMono-BoldItalic.js';
import RobotoMonoLight from '../fonts/RobotoMono-Light.js';
import RobotoMonoLightItalic from '../fonts/RobotoMono-LightItalic.js';
import RobotoMonoMedium from '../fonts/RobotoMono-Medium.js';
import RobotoMonoMediumItalic from '../fonts/RobotoMono-MediumItalic.js';
import RobotoMonoSemiBold from '../fonts/RobotoMono-SemiBold.js';
import RobotoMonoSemiBoldItalic from '../fonts/RobotoMono-SemiBoldItalic.js';
import RobotoMonoThin from '../fonts/RobotoMono-Thin.js';
import RobotoMonoThinItalic from '../fonts/RobotoMono-ThinItalic.js';
import RobotoMonoExtraLight from '../fonts/RobotoMono-ExtraLight.js';
import RobotoMonoExtraLightItalic from '../fonts/RobotoMono-ExtraLightItalic.js';
import PTMonoRegular from '../fonts/PTMono-Regular.js';

export const CYRILLIC_FONTS = {
    'Roboto Mono': {
        normal: RobotoMonoRegular,
        bold: RobotoMonoBold,
        italic: RobotoMonoItalic,
        bolditalic: RobotoMonoBoldItalic,
        light: RobotoMonoLight,
        lightitalic: RobotoMonoLightItalic,
        medium: RobotoMonoMedium,
        mediumitalic: RobotoMonoMediumItalic,
        semibold: RobotoMonoSemiBold,
        semibolditalic: RobotoMonoSemiBoldItalic,
        thin: RobotoMonoThin,
        thinitalic: RobotoMonoThinItalic,
        extralight: RobotoMonoExtraLight,
        extralightitalic: RobotoMonoExtraLightItalic
    },
    'PT Mono': {
        normal: PTMonoRegular
    }
};

export const registerCyrillicFont = async (doc) => {
    try {
        // Регистрируем все варианты Roboto Mono
        Object.entries(CYRILLIC_FONTS['Roboto Mono']).forEach(([style, fontData]) => {
            const fontName = `RobotoMono-${style.charAt(0).toUpperCase() + style.slice(1)}`;
            doc.addFileToVFS(`${fontName}.ttf`, fontData);
            doc.addFont(`${fontName}.ttf`, 'Roboto Mono', style);
        });

        // Регистрируем PT Mono
        doc.addFileToVFS('PTMono-Regular.ttf', PTMonoRegular);
        doc.addFont('PTMono-Regular.ttf', 'PT Mono', 'normal');

        // Устанавливаем Roboto Mono по умолчанию
        doc.setFont('Roboto Mono', 'normal');

        return true;

    } catch (error) {
        console.warn('Font error:', error);
        doc.setFont('courier');
        return false;
    }
};

export const safeText = (doc, text, x, y, options = {}) => {
    try {
        doc.text(text, x, y, options);
        return true;
    } catch (error) {
        console.warn('Text error:', error);

        // Fallback на стандартный шрифт
        const currentFont = doc.getFont();
        if (currentFont.fontName !== 'helvetica') {
            doc.setFont('helvetica');
            doc.text(text, x, y, options);
            doc.setFont(currentFont.fontName, currentFont.fontStyle);
        } else {
            doc.text(text, x, y, options);
        }
        return false;
    }
};