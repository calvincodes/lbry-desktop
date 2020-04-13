// @flow
import React from 'react';

type Props = {
  source: string,
};

function ImageViewer(props: Props) {
  const { source } = props;
  return (
    <div className="file-viewer">
      <img src={source} />
    </div>
  );
}

export default ImageViewer;
