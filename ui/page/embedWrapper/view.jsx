// @flow
import React, { useEffect, useState } from 'react';
import FileRender from 'component/fileRender';

type Props = {
  uri: string,
  resolveUri: string => void,
  claim: Claim,
  triggerAnalyticsView: string => Promise<any>,
};
// $FlowFixMe apparently flow thinks this is wrong.
export const EmbedContext = React.createContext();
const EmbedWrapperPage = (props: Props) => {
  const { resolveUri, claim, uri, triggerAnalyticsView } = props;
  const [hasRecordedView, setHasRecordedView] = useState(false);

  function onStartedCallback() {
    if (!hasRecordedView && uri && claim) {
      triggerAnalyticsView(uri).then(() => {
        setHasRecordedView(true);
      });
    }
  }

  useEffect(() => {
    if (resolveUri && uri) {
      resolveUri(uri);
    }
  }, []);

  return (
    <div className={'embed__wrapper'}>
      {claim && (
        <EmbedContext.Provider value>
          <FileRender uri={uri} embedded onStartedCallback={onStartedCallback} />
        </EmbedContext.Provider>
      )}
    </div>
  );
};

export default EmbedWrapperPage;
