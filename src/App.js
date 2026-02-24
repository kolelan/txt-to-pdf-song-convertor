import React, {useState, useEffect} from 'react';
import Layout from './components/Layout/Layout';
import Editor from './components/Editor/Editor';
import PdfPreview from './components/PdfPreview/PdfPreview';
import Controls from './components/Controls/Controls';
import {parseAbcNotation} from './utils/abcParser';
import {generatePdf} from './utils/pdfGenerator';
import {analyzeBarsFromText, getBarStatistics} from './utils/barCounter'; // Импортируем функции подсчёта
import './App.css';
import Footer from "./components/Footer/Footer";

function App() {
    const [inputText, setInputText] = useState(`X: 1
T: White smoke
M: 4/4
L: 1/4
Q:110
R: G. Stepenko / N. Yarkov
K: Ab 
 % Intro
||: Ab |  Eb | Bb | Db :||
% Verse 1
| Ab | Eb | % An iron needle will pierce my vein
| Bb | Db | % And dissolve in blood
| Ab | Eb | % All the medicine that you gave me
| Bb | Db | % Into the silence a whisper shud
% Chorus
| Ab | Cmb | % Burn, burn white smoke
| Fm | Eb | % Run away my spirit broke
% Solo
| Ab | Eb | Bb | Db |`);

    const [parsedData, setParsedData] = useState(null);
    const [barStatistics, setBarStatistics] = useState(null); // Добавляем состояние для статистики
    const [pdfUrl, setPdfUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState({
        showLyrics: true,
        showChords: true,
        showTempo: true,
        showTitle: true,
        showLegend: true,
        showStatistics: true,
        showStaff: false,
        fontSize: 12,
        lineHeight: 0.4,
        fixedTextOffset: 80,
        fontFamily: 'Roboto Mono',
        fontStyle: 'normal',
        instrument: 'guitar',
        capo: 0,
        staffLineSpacing: 3,
        staffSpacing: 16,
        staffVerticalOffset: 0,
        staffLineWidth: 0.35,
        staffLineCount: 5
    });
    useEffect(() => {
        try {
            const parsed = parseAbcNotation(inputText);
            setParsedData(parsed);
            // Подсчитываем такты после парсинга
            const stats = getBarStatistics(parsed);
            setBarStatistics(stats);
        } catch (err) {
            console.error('Initial parsing error:', err);
            setBarStatistics(null);
        }
    }, []);

    const handleTextChange = (text) => {
        setInputText(text);
        try {
            const parsed = parseAbcNotation(text);
            setParsedData(parsed);

            // Используем analyzeBarsFromText для точного подсчёта
            const barAnalysis = analyzeBarsFromText(text);
            console.log('Bar analysis:', barAnalysis);

            // Обновляем статистику тактов
            const stats = {
                total: barAnalysis.totalBars,
                sections: barAnalysis.sections.length,
                averageBarsPerSection: barAnalysis.sections.length > 0
                    ? Math.round(barAnalysis.totalBars / barAnalysis.sections.length)
                    : 0,
                hasRepeats: false, // Можно добавить проверку повторений
                sectionDetails: barAnalysis.sections.map(section => ({
                    name: section.name,
                    bars: section.bars,
                    hasRepeats: false
                }))
            };

            setBarStatistics(stats);
            setError(null);
        } catch (err) {
            setError('Ошибка формата текста');
            console.error('Parse error:', err);
            setBarStatistics(null);
        }
    };

    const handleGeneratePdf = async () => {
        if (!parsedData) {
            setError('Нет данных для генерации');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            console.log('Generating PDF with:', parsedData);
            const pdfBlob = await generatePdf(parsedData, options);
            const url = URL.createObjectURL(pdfBlob);
            setPdfUrl(url);
        } catch (err) {
            console.error('Generation error:', err);
            setError('Ошибка при создании PDF');
        } finally {
            setLoading(false);
        }
    };

    const handleOptionsChange = (newOptions) => {
        setOptions(newOptions);
    };

    return (
        <div className="App">
            <Layout
                leftPanel={
                    <>
                        <Editor value={inputText} onChange={handleTextChange}/>
                        {error && <div className="error-message">{error}</div>}
                        {barStatistics && (
                            <div className="bar-statistics">
                                <h4>Статистика тактов:</h4>
                                <p>Всего тактов: <strong>{barStatistics.total}</strong></p>
                                <p>Секций: <strong>{barStatistics.sections}</strong></p>

                                <div className="section-details">
                                    <h5>Детали секций:</h5>
                                    {barStatistics.sectionDetails.map((section, index) => (
                                        <div key={index} className="section-item">
                                            <span className="section-name">{section.name}:</span>
                                            <span className="section-bars">{section.bars} тактов</span>
                                            {section.hasRepeats && <span className="repeat-indicator">🔄</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                }
                rightPanel={
                    <PdfPreview
                        pdfUrl={pdfUrl}
                        parsedData={parsedData}
                        options={options}
                        loading={loading}
                    />
                }
                controls={
                    <Controls
                        options={options}
                        onOptionsChange={handleOptionsChange}
                        onGeneratePdf={handleGeneratePdf}
                        loading={loading}
                        hasData={!!parsedData}
                    />
                }
                footer={
                    <Footer/>
                }
            />
        </div>
    );
}

export default App;