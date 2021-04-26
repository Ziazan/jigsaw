import React, { ChangeEvent, FC, useRef, useState } from 'react';
import axios from 'axios';
import Button from './../Button';
import Icon from './../Icon';
import UploadList from './uploadList';

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

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  /** 上传地址  */
  action: string;
  /** 接受文件的类型  */
  accept?: string;
  /** 默认展示的文件列表 */
  defaultFileList?: UploadFile[];
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
  /** 移除文件 */
  onRemove?: (file: UploadFile) => void;
}

const Upload: FC<UploadProps> = (props) => {
  const { action, defaultFileList, beforeUpload, onChange, onProgress, onSuccess, onError, onRemove } = props;
  const fileInput = useRef(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

  /** 更新文件的值 */
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    //hook 支持传一个函数，可以获取上一次的值
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };

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

  /** 列表删除file */
  const handleOnRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    onRemove && onRemove(file);
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

  /** 上传文件 */
  const post = (file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList([_file, ...fileList]); //当前的放在最前面
    const formData = new FormData();
    formData.append(file.name, file);
    axios
      .post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: any) => {
          const percentage = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: 'uploading' });
          }
          onProgress && onProgress(percentage, file);
        },
      })
      .then(({ data }) => {
        updateFileList(_file, { response: data, status: 'success' }); //更新文件状态
        onSuccess && onSuccess(data, file);
        onChange && onChange(file);
      })
      .catch((error) => {
        updateFileList(_file, { error: error, status: 'error' });
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
      <UploadList fileList={fileList} onRemove={handleOnRemove} />
    </div>
  );
};

export default Upload;
