import React, { FC } from 'react';
import { ThemeProps } from '../Icon';

export interface ProgressProps {
  /** 进度百分比 */
  percent: number;
  /** 高度 */
  strokeHeight?: number;
  /** 显示文案 */
  showText?: boolean;
  /** 进度条样式 */
  styles?: React.CSSProperties;
  /** 主题 */
  theme?: ThemeProps;
}

const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, styles, theme } = props;
  return (
    <div className="jigsaw-progress-bar" style={styles}>
      <div className="jigsaw-progress-bar-outer" style={{ height: `${strokeHeight}px` }}>
        <div className={`jigsaw-progress-bar-inner color-${theme}`} style={{ width: `${percent}%` }}>
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: 'primaty',
};

export default Progress;
