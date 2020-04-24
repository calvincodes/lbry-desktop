// @flow
import React, { useEffect } from 'react';
import Button from 'component/button';
import ClaimList from 'component/claimList';
import Page from 'component/page';
import Paginate from 'component/common/paginate';
import { PAGE_SIZE } from 'constants/claim';
import WebUploadList from 'component/webUploadList';
import Spinner from 'component/spinner';
import Card from 'component/common/card';
// import { FormField } from '../../component/common/form-components/form-field';
// import { toCapitalCase } from '../../util/string';
// import classnames from 'classnames';

type Props = {
  checkPendingPublishes: () => void,
  clearPublish: () => void,
  fetchClaimListMinePage: (page, PAGE_SIZE_DEFAULT) => void,
  fetching: boolean,
  urls: Array<string>,
  urlTotal: ?number,
  history: { replace: string => void, push: string => void },
  page: number,
  pageSize: number,
};

function FileListPublished(props: Props) {
  const {
    checkPendingPublishes,
    clearPublish,
    fetchClaimListMinePage,
    fetching,
    urls,
    urlTotal,
    page,
    pageSize,
  } = props;

  console.log('urlt', urlTotal);
  const PAGE = 'page';
  // const PAGE_SIZE = 'page_size';
  const PAGE_SIZE_DEFAULT = 10;
  // const TYPE = 'type';
  // const ALL = 'all';
  // const TYPES = ['video', 'audio'];

  const currentUrlParams = {
    page,
    pageSize,
  };

  const params = {};

  if (currentUrlParams.page) params[PAGE] = Number(page);
  if (currentUrlParams.pageSize) params[PAGE_SIZE] = Number(pageSize);

  const paramsString = JSON.stringify(params);
  console.log('ps', paramsString);

  useEffect(() => {
    checkPendingPublishes();
  }, [checkPendingPublishes]);

  useEffect(() => {
    if (paramsString && fetchClaimListMinePage) {
      const params = JSON.parse(paramsString);
      fetchClaimListMinePage(params.page, params.page_size);
    }
  }, [paramsString, fetchClaimListMinePage]);

  // ENABLE FOR FILTERING
  // function handleChange(delta: Delta) {
  //   const url = updateUrl(delta);
  //   history.push(url);
  // }

  // function updateUrl(delta: Delta) {
  //   const newUrlParams = new URLSearchParams();
  //   switch (delta.dkey) {
  //     case PAGE:
  //       if (currentUrlParams.type) {
  //         newUrlParams.set(TYPE, currentUrlParams.type);
  //       }
  //       newUrlParams.set(PAGE, delta.value);
  //       break;
  //     case TYPE:
  //       newUrlParams.set(TYPE, delta.value);
  //       newUrlParams.set(PAGE, String(1));
  //       newUrlParams.set(PAGE_SIZE, currentUrlParams.pageSize);
  //       break;
  //   }
  //
  //   return `?${newUrlParams.toString()}`;
  // }

  return (
    <Page>
      <WebUploadList />
      <Card
        title={__('Publishes')}
        titleActions={
          <div className="card__actions--inline">
            <Button
              button="secondary"
              label={__('Refresh')}
              onClick={() => fetchClaimListMinePage(params.page, params.page_size)}
            />
          </div>
        }
        body={
          <div>
            {/*<div className="card__body-actions">*/}
            {/*  <div className="card__actions">*/}
            {/*    <div>*/}
            {/*      <FormField*/}
            {/*        type="select"*/}
            {/*        name="type"*/}
            {/*        label={__('Type')}*/}
            {/*        value={type || 'all'}*/}
            {/*        onChange={e => handleChange({ dkey: TYPE, value: e.target.value })}*/}
            {/*      >*/}
            {/*        {Object.values(TYPES).map(v => {*/}
            {/*          const stringV = String(v);*/}
            {/*          return (*/}
            {/*            <option key={stringV} value={stringV}>*/}
            {/*              {stringV && __(toCapitalCase(stringV))}*/}
            {/*            </option>*/}
            {/*          );*/}
            {/*        })}*/}
            {/*      </FormField>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <ClaimList
              header={__('Your Publishes')}
              loading={fetching}
              persistedStorageKey="claim-list-published"
              uris={urls}
              headerAltControls={
                <Button button="link" label={__('New Publish')} navigate="/$/publish" onClick={() => clearPublish()} />
              }
            />
            <Paginate totalPages={Math.ceil(urlTotal / Number(PAGE_SIZE_DEFAULT))} />
          </div>
        }
      />
      {!(urls && urls.length) && (
        <React.Fragment>
          {!fetching ? (
            <section className="main--empty">
              <div className=" section--small">
                <h2 className="section__title--large">{__('Nothing published to LBRY yet.')}</h2>
                <div className="section__actions">
                  <Button
                    button="primary"
                    navigate="/$/publish"
                    label={__('Publish something new')}
                    onClick={() => clearPublish()}
                  />
                </div>
              </div>
            </section>
          ) : (
            <section className="main--empty">
              <div className=" section--small">
                <h2 className="section__title--small">
                  {__('Checking your publishes')}
                  <Spinner type="small" />
                </h2>
              </div>
            </section>
          )}
        </React.Fragment>
      )}
    </Page>
  );
}

export default FileListPublished;
