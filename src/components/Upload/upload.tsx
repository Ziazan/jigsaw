import React, { ChangeEvent, FC, useRef, RefObject } from 'react';
import axios from 'axios';
import Button from './../Button';
import Icon from './../Icon';

/* <Upload
  action="https://upload!"
  beforeUplaod={() => {}}
  onProgress={() => {}}
  onChange={() => {}}
  onSuccess={() => {}}
  onError={() => {}}
  onRemoved={() => {}}
>
  <Button>click to upload</Button>
</Upload>; */

export interface UploadProps {
  /** 上传地址  */
  action: string;
  /** 接受文件的类型  */
  accept?: string;
  /** 文件上传前的处理 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /** 文件修改 */
  onChange?: (File: File) => void;
  /** 文件上传进度 */
  onProgress?: (precentage: number, file: File) => void;
  /** 上传成功 */
  onSuccess?: (data: any, file: File) => void;
  /** 上传失败 */
  onError?: (error: Error, file: File) => void;
}

const Upload: FC<UploadProps> = (props) => {
  const { action, beforeUpload, onChange, onProgress, onSuccess, onError } = props;
  const fileInput = useRef(null);

  const handleClick = () => {
    if (fileInput) {
      const _fileInput = (fileInput.current as unknown) as HTMLInputElement;
      _fileInput.click();
    }
  };

  const handleFileChang = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('%c  handleFileChang:', 'color: #0e93e0;background: #aaefe5;', handleFileChang);
    if (!e.target.files) {
      return;
    }
    upLoadFiles(e.target.files);
  };

  /**
   * 上传文件
   * @param fileList
   */
  const upLoadFiles = (fileList: FileList) => {
    const _files = Array.from(fileList);
    _files.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };

  const post = (file: File) => {
    const formData = new FormData();
    formData.append(file.name, file);
    axios
      .post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: any) => {
          const percentage = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          onProgress && onProgress(percentage, file);
        },
      })
      .then(({ data }) => {
        onSuccess && onSuccess(data, file);
        onChange && onChange(file);
      })
      .catch((error) => {
        onError && onError(error, file);
        onChange && onChange(file);
      });
  };

  return (
    <div className="jigsaw-upload-wrap">
      <Button btnType="primary" onClick={handleClick}>
        <Icon icon="upload" />
        上传文件
      </Button>
      <input
        className="jigsaw-input"
        style={{ display: 'none' }}
        type="file"
        ref={fileInput}
        name="filename"
        onChange={handleFileChang}
      />
    </div>
  );
};

export default Upload;
