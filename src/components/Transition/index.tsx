import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-left';

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
};
const Transition: React.FC<TransitionProps> = (props) => {
  const { animation, classNames, children, ...restProps } = props;
  return (
    <div>
      <CSSTransition {...restProps} classNames={classNames ? classNames : animation}>
        {children}
      </CSSTransition>
    </div>
  );
};

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};

export default Transition;
