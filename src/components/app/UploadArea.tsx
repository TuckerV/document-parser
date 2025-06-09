import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import styles from './UploadArea.module.scss';
import { setUploadedContent, setUploadError } from 'reducers/appReducer';
import { toast } from 'react-toastify';
import mammoth from 'mammoth';

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onFileSelect }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const readFile = (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext === 'docx') {
      // Use mammoth to extract text
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const arrayBuffer = reader.result as ArrayBuffer;
          const { value } = await mammoth.extractRawText({ arrayBuffer });
          dispatch(setUploadedContent(value));
          toast.warn('DOCX file uploaded successfully');
        } catch (e: any) {
          toast.error(`Failed to parse DOCX: ${e?.message || e}`);
          dispatch(setUploadError(`Failed to parse DOCX: ${e?.message || e}`));
        }
      };
      reader.onerror = () => {
        toast.error(`Failed to read DOCX file: ${reader.error?.message}`);
        dispatch(
          setUploadError(`Failed to read DOCX file: ${reader.error?.message}`),
        );
      };
      reader.readAsArrayBuffer(file);
      return;
    }

    // For text files, read as text
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        toast.success('Text file uploaded successfully');
        dispatch(setUploadedContent(reader.result));
      }
    };
    reader.onerror = () => {
      toast.error(`Failed to read file: ${reader.error?.message}`);
      dispatch(setUploadError(`Failed to read file: ${reader.error?.message}`));
    };
    reader.readAsText(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileSelect(file);
      readFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onFileSelect(file);
      readFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className={styles.uploadArea}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button
        className={styles.uploadButton}
        onClick={() => fileInputRef.current?.click()}
      >
        Upload Word Document
      </button>
      <div className={styles.dragDropText}>
        or drag and drop your Word document here
      </div>
    </div>
  );
};

export default UploadArea;
