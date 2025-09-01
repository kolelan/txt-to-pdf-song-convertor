import React, { useState, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import Editor from './components/Editor/Editor';
import PdfPreview from './components/PdfPreview/PdfPreview';
import Controls from './components/Controls/Controls';
import { parseAbcNotation } from './utils/abcParser';
import { generatePdf } from './utils/pdfGenerator';
import './App.css';

function App() {
  const [inputText, setInputText] = useState(`X: 1
T: Белым дымом
M: 4/4
L: 1/4
Q:110
R: Г. Степенко / Н. Ярков
K: Ab 
% Intro
||: Ab |  Eb | Bb | Db :||
% Куплет 1
| Ab | Eb |             % Железной иглой проколют мне вену
| Bb | Db |             % И раствориться в крови
| Ab | Eb |             % Всё то лекарство что дала ты мне
| Bb | Db |             % Что бы спасти мою жизнь
% Припев
| Ab | Cmb |          % Жги, жги белым дымом
| Fm | Eb |             % Беги от меня скорее прочь
% Соло
| Ab |  Eb | Bb | Db |`);

  const [parsedData, setParsedData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({
    showLyrics: true,
    showChords: true,
    showTempo: true,
    showTitle: true,
    showLegend: true,
    instrument: 'guitar',
    capo: 0
  });

  useEffect(() => {
    try {
      const parsed = parseAbcNotation(inputText);
      setParsedData(parsed);
    } catch (err) {
      console.error('Initial parsing error:', err);
    }
  }, []);

  const handleTextChange = (text) => {
    setInputText(text);
    try {
      const parsed = parseAbcNotation(text);
      setParsedData(parsed);
      setError(null);
    } catch (err) {
      setError('Ошибка формата текста');
      console.error('Parse error:', err);
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
                <Editor value={inputText} onChange={handleTextChange} />
                {error && <div className="error-message">{error}</div>}
                {parsedData && (
                    <div className="debug-info">
                      <p>Секций: {parsedData.sections.length}</p>
                      <p>Тактов: {parsedData.sections.reduce((acc, s) => acc + s.measures.length, 0)}</p>
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
        />
      </div>
  );
}

export default App;