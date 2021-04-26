import React, { FC } from 'react';
import { UploadFile } from './upload';
import Icon from './../Icon';
import Progress from '../Progress';

interface UploadListProps {
  fileList: UploadFile[];
  onRemove?: (_file: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;
  return (
    <ul className="jigsaw-upload-list">
      {fileList.map((item) => {
        return (
          <li className="jigsaw-upload-list-item" key={item.uid}>
            <Icon icon="file-alt" theme="secondary" />
            <span className="file-name">{item.name}</span>
            <span>X</span>
            <Progress percent={item.percent as number} />
          </li>
        );
      })}
    </ul>
  );
};
export default UploadList;
