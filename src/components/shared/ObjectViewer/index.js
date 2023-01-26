import React from 'react';
import ObjectNode from './ObjectNode';
import objectType from './utils';

const JsonViewer = ({ data }) => {
  const nodeType = objectType(data);

  switch (nodeType) {
    case 'Iterable':
      return <ObjectNode data={data} />;
    default:
      return null;
  }
};

export default JsonViewer;
