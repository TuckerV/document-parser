import React from 'react';

interface ConvertedPreviewProps {
  content: string;
}

const ConvertedPreview: React.FC<ConvertedPreviewProps> = ({ content }) => (
  <div style={{ marginTop: 16 }}>
    <h3>Converted Template:</h3>
    <pre
      style={{
        maxHeight: 300,
        overflow: 'auto',
        background: '#e6ffe6',
        padding: 12,
        width: '100%',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      {content}
    </pre>
  </div>
);

export default ConvertedPreview;
