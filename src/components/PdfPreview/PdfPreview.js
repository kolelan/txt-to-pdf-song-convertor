import React from 'react';
import './PdfPreview.css';

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
                <a href={pdfUrl} download="song.pdf" className="download-btn">
                    Скачать PDF
                </a>
            </div>
        </div>
    );
};

export default PdfPreview;