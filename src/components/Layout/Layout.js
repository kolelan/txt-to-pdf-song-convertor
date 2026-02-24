import React from 'react';
import './Layout.css';

const Layout = ({ leftPanel, rightPanel, controls, footer }) => {
    return (
        <div className="layout">
            <div className="layout-header">
                <h1>Music Chord Converter</h1>
                <p>Преобразование текста песен с аккордами в PDF</p>
            </div>

            <div className="layout-main">
                <div className="layout-left">
                    {leftPanel}
                </div>

                <div className="layout-right">
                    {rightPanel}
                </div>
            </div>

            <div className="layout-controls">
                {controls}
            </div>

            <div className="layout-footer">
                {footer}
            </div>
        </div>
    );
};

export default Layout;