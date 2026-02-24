import React from 'react';
import './PdfPreview.css';

// Функция для генерации имени файла
const generateFileName = (parsedData, options) => {
    // Получаем название песни из метаданных
    const title = parsedData?.title || 'Song';
    
    // Очищаем название от недопустимых символов для имени файла
    const cleanTitle = title
        .replace(/[<>:"/\\|?*]/g, '') // Удаляем недопустимые символы
        .replace(/\s+/g, '_') // Заменяем пробелы на подчеркивания
        .trim();
    
    // Формируем части имени файла
    const parts = [cleanTitle];
    
    // Если включен нотный стан, добавляем "notes"
    if (options?.showStaff) {
        parts.push('notes');
    }
    
    // Добавляем текущую дату в формате ггггммдд
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dateStr = `${year}${month}${day}`;
    parts.push(dateStr);
    
    // Объединяем все части и добавляем расширение
    return `${parts.join('_')}.pdf`;
};

const PdfPreview = ({ pdfUrl, parsedData, options, loading }) => {
    if (loading) {
        return (
            <div className="pdf-preview">
                <h3>Предпросмотр PDF</h3>
                <div className="pdf-placeholder">
                    <p>Генерация PDF...</p>
                </div>
            </div>
        );
    }

    if (!pdfUrl) {
        return (
            <div className="pdf-preview">
                <h3>Предпросмотр PDF</h3>
                <div className="pdf-placeholder">
                    <p>Нажмите "Сгенерировать PDF" для создания документа</p>
                    {parsedData && (
                        <div className="preview-info">
                            <h4>{parsedData.title}</h4>
                            <p>Темп: {parsedData.tempo} BPM</p>
                            <p>Размер: {parsedData.meter}</p>
                            <p>Тональность: {parsedData.key}</p>
                            <p>Секций: {parsedData.sections.length}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="pdf-preview">
            <h3>Предпросмотр PDF</h3>
            <iframe
                src={pdfUrl}
                title="PDF Preview"
                className="pdf-iframe"
            />
            <div className="pdf-download">
                <a 
                    href={pdfUrl} 
                    download={generateFileName(parsedData, options)} 
                    className="download-btn"
                >
                    Скачать PDF
                </a>
            </div>
        </div>
    );
};

export default PdfPreview;