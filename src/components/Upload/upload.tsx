import React, { ChangeEvent, FC, useRef } from 'react';
import axios from 'axios';
import Button from './../Button';
import Icon from './../Icon';

export interface UploadProps {
  /** 上传地址  */
  action: string;
  /** 接受文件的类型  */
  accept?: string;
  /** 文件上传前的处理 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /** 文件修改 */
  onChange?: (info: any, File: File) => void;
  /** 文件上传进度 */
  onProgress?: (precentage: number, file: File) => void;
  /** 上传成功 */
  onSuccess?: (file: File) => void;
  /** 上传失败 */
  onError?: (error: Error, file: File) => void;
}

const Upload: FC<UploadProps> = (props) => {
  const { action, onChange, onProgress, onError } = props;
  const fileInput = useRef(null);
  const handleFileChang = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('%c  handleFileChang:', 'color: #0e93e0;background: #aaefe5;', handleFileChang);
    if (!e.target.files) {
      return;
    }
    onUpload(e.target.files);
  };

  const onUpload = (fileList: FileList) => {
    const _files = Array.from(fileList);
    _files.forEach((file) => {
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
          console.log('%c  data:', 'color: #0e93e0;background: #aaefe5;', data);
          onChange && onChange(data, file);
        })
        .catch((error) => {
          onChange && onChange(null, file);
          onError && onError(error, file);
        });
    });
  };

  return (
    <div>
      <Button btnType="primary">
        <Icon icon="upload" />
        click me to upload
      </Button>
      <input type="file" ref={fileInput} name="filename" onChange={handleFileChang} />
    </div>
  );
};

export default Upload;
