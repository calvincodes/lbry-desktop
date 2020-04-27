// @flow
import React, { useEffect } from 'react';
import Button from 'component/button';

type Props = {
  uri: string,
  thumbnail: ?string,
  claim: ?Claim,
  doResolveUri: string => void,
  doFetchCostInfoForUri: string => void,
  doSetFloatingUri: string => void,
};

export default function FileRenderFloating(props: Props) {
  const { uri, thumbnail = '', claim, doResolveUri, doFetchCostInfoForUri, doSetFloatingUri } = props;
  const hasResolvedUri = claim !== undefined;

  useEffect(() => {
    if (!hasResolvedUri) {
      doResolveUri(uri);
      doFetchCostInfoForUri(uri);
    }
  }, [uri, hasResolvedUri, doResolveUri, doFetchCostInfoForUri]);

  function handleClick() {
    doSetFloatingUri(uri);
  }

  return (
    <div
      role="button"
      className="embed__inline-button"
      onClick={handleClick}
      style={{ backgroundImage: `url('${thumbnail.replace(/'/g, "\\'")}')` }}
    >
      <Button onClick={handleClick} iconSize={30} title={__('Play')} className={'button--icon button--play'} />
    </div>
  );
}
