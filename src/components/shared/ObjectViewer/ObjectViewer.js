import React from 'react';
import ObjectNode from './ObjectNode';
import objectType from './utils/ObjectViewer.utils';

const ObjectViewer = ({ data, style }) => {
  const nodeType = objectType(data);

  switch (nodeType) {
    case 'Iterable':
      return <ObjectNode data={data} style={style} />;
    default:
      return null;
  }
};

export default ObjectViewer;
