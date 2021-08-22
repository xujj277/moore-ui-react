import React from 'react';
import IconExample from './icon.example';
import Demo from '../../demo'

const IconDemo = () => {
  return (
    <div>
      <Demo code={require('!!raw-loader!./icon.example.tsx').default}>
        <IconExample></IconExample>
      </Demo>
    </div>
  );
};

export default IconDemo; 