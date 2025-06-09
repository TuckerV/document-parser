import React, { useState } from 'react';
import UploadArea from './UploadArea';
import DocxPreview from './DocxPreview';
import ConvertedPreview from './ConvertedPreview';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import {
  convertIfBlocks,
  convertVariables,
  convertForLoops,
  convertDoubleBracesToSingle,
} from '../../convertGavelToMustache';
import { toast } from 'react-toastify';

const App = () => {
  const [lastFile, setLastFile] = useState<File | null>(null);
  const [convertedContent, setConvertedContent] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    toast.info('File selected');
    setLastFile(file);
    setConvertedContent(null); // Reset conversion when new file is uploaded
  };

  const uploadedContent = useSelector(
    (state: RootState) => state.app.uploadedContent,
  );
  const uploadError = useSelector((state: RootState) => state.app.uploadError);

  const handleConvert = () => {
    if (!uploadedContent) return;
    // Compose the pipe manually using the imported functions, ending with double-to-single braces
    const result = convertDoubleBracesToSingle(
      convertForLoops(convertVariables(convertIfBlocks(uploadedContent))),
    );
    setConvertedContent(result);
  };

  return (
    <div className={styles.App}>
      <header className={styles.App__header}>
        <div
          style={{
            display: 'flex',
            width: '100%',
            border: '1px solid #ccc',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 16,
            marginBottom: 24,
          }}
        >
          <UploadArea onFileSelect={handleFileSelect} />
        </div>
        <div className={styles.buttonContainer}>
          <button
            style={{
              padding: '8px 24px',
              fontWeight: 'bold',
              background: '#5cb85c',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor:
                uploadedContent && lastFile && !lastFile.name.endsWith('.docx')
                  ? 'pointer'
                  : 'not-allowed',
              opacity:
                uploadedContent && lastFile && !lastFile.name.endsWith('.docx')
                  ? 1
                  : 0.5,
            }}
            onClick={handleConvert}
            disabled={
              !(uploadedContent && lastFile && !lastFile.name.endsWith('.docx'))
            }
          >
            Convert Template
          </button>
          <button
            style={{
              padding: '8px 24px',
              fontWeight: 'bold',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: convertedContent ? 'pointer' : 'not-allowed',
              opacity: convertedContent ? 1 : 0.5,
            }}
            onClick={async () => {
              if (!convertedContent) return;
              const docx = await import('docx');
              const { Document, Packer, Paragraph } = docx;
              const paragraphs = convertedContent
                .split(/\r?\n/)
                .map((line) => new Paragraph(line));
              const doc = new Document({
                sections: [
                  {
                    properties: {},
                    children: paragraphs,
                  },
                ],
              });
              const blob = await Packer.toBlob(doc);
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'converted-template.docx';
              document.body.appendChild(a);
              a.click();
              setTimeout(() => {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
              }, 100);
            }}
            disabled={!convertedContent}
          >
            Export as DOCX
          </button>
        </div>
        {uploadError && (
          <div style={{ color: 'red', marginBottom: 16 }}>
            Error: {uploadError}
          </div>
        )}
        <div className={styles.previewContainer}>
          {/* Original Preview */}
          <div className={styles.previewPanel}>
            <h3 style={{ marginBottom: 8 }}>Original DOCX Preview</h3>
            {lastFile ? (
              <DocxPreview file={lastFile} />
            ) : (
              <div
                style={{ color: '#999', padding: 12, background: '#f4f4f4' }}
              >
                No file uploaded.
              </div>
            )}
          </div>
          {/* Formatted Preview */}
          <div className={styles.previewPanel}>
            <h3 style={{ marginBottom: 8 }}>Formatted Template Preview</h3>
            <ConvertedPreview content={convertedContent || ''} />
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;
