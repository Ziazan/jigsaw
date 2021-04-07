import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-left';

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
  wrapper?: boolean; //避免transition冲突 包一层div
};
const Transition: React.FC<TransitionProps> = (props) => {
  const { animation, classNames, children, wrapper, ...restProps } = props;
  return (
    <div>
      <CSSTransition {...restProps} classNames={classNames ? classNames : animation}>
        {wrapper ? <div>{children}</div> : children}
      </CSSTransition>
    </div>
  );
};

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
  wrapper: false,
};

export default Transition;
