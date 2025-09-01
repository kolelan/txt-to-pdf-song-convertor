import React from 'react';
import './Editor.css';

const Editor = ({ value, onChange }) => {
    return (
        <div className="editor">
            <h3>Текст песни с аккордами</h3>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Введите текст в ABC нотации..."
                className="editor-textarea"
            />
        </div>
    );
};

export default Editor;