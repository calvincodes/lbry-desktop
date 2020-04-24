import { connect } from 'react-redux';
import {
  selectIsFetchingMyClaimsPage,
  selectMyClaimsPage,
  selectMyClaimsPageItemCount,
  selectFetchingMyClaimsPageError,
  doClearPublish,
  doFetchClaimListMinePage,
} from 'lbry-redux';
import { doCheckPendingPublishesApp } from 'redux/actions/publish';
import FileListPublished from './view';
import { withRouter } from 'react-router';

const PAGE = 'page';
const PAGE_SIZE = 'page_size';
const PAGE_SIZE_DEFAULT = 10;
// const TYPE = 'type';
// const ALL = 'all';
// const TYPES = ['video', 'audio'];

const select = (state, props) => {
  const { search } = props.location;
  const urlParams = new URLSearchParams(search);
  const page = Number(urlParams.get(PAGE)) || 1;
  const pageSize = urlParams.get(PAGE_SIZE) || String(PAGE_SIZE_DEFAULT);

  return {
    page,
    pageSize,
    fetching: selectIsFetchingMyClaimsPage(state),
    urls: selectMyClaimsPage(state),
    urlTotal: selectMyClaimsPageItemCount(state),
    error: selectFetchingMyClaimsPageError(state),
  };
};

const perform = dispatch => ({
  checkPendingPublishes: () => dispatch(doCheckPendingPublishesApp()),
  fetchClaimListMinePage: (page, pageSize) => dispatch(doFetchClaimListMinePage(page, pageSize)),
  clearPublish: () => dispatch(doClearPublish()),
});

export default withRouter(connect(select, perform)(FileListPublished));
