import React, { useEffect, useRef, useState } from 'react';
import { renderAsync } from 'docx-preview';
import mammoth from 'mammoth';
import { toast } from 'react-toastify';

interface DocxPreviewProps {
  file: File;
}

const DocxPreview: React.FC<DocxPreviewProps> = ({ file }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fallbackText, setFallbackText] = useState<string | null>(null);

  useEffect(() => {
    if (!file || !containerRef.current) return;
    setFallbackText(null); // Reset fallback
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        toast.promise(
          renderAsync(
            reader.result as ArrayBuffer,
            containerRef.current!,
            undefined,
            undefined,
          ),
          {
            pending: 'Rendering document...',
            success: 'Document rendered successfully',
            error: 'Failed to render docx',
          },
        );
      } catch (e: any) {
        toast.error(`Failed to render docx: ${e?.message || e}`);
        // If docx-preview fails, fallback to mammoth
        try {
          const { value } = await mammoth.extractRawText({
            arrayBuffer: reader.result as ArrayBuffer,
          });
          setFallbackText(value);
        } catch (err) {
          toast.error('This document could not be previewed.');
          setFallbackText('This document could not be previewed.');
        }
      }
    };
    reader.onerror = () => {
      toast.error('Failed to read file');
      setFallbackText('Failed to read file');
    };
    reader.readAsArrayBuffer(file);
    return () => {
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, [file]);

  return (
    <div
      style={{
        width: '100%',
        minHeight: 200,
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: 6,
        padding: 12,
        boxSizing: 'border-box',
        overflow: 'auto',
        position: 'relative',
      }}
    >
      {fallbackText ? (
        <div style={{ whiteSpace: 'pre-wrap', color: '#333', width: '100%' }}>
          {fallbackText}
        </div>
      ) : (
        <div
          ref={containerRef}
          style={{ width: '100%', minHeight: 176, overflow: 'auto' }}
        />
      )}
    </div>
  );
};

export default DocxPreview;
