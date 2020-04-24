import { connect } from 'react-redux';
import { doHideModal } from 'redux/actions/app';
import {
  makeSelectClaimForUri,
  makeSelectTitleForUri,
  selectBalance,
  selectMyChannelClaims,
  doRepost,
  selectRepostError,
  selectRepostLoading,
  doClearRepostError,
  doToast,
  selectMyClaimsWithoutChannels,
  doFetchClaimListMine,
  doCheckPublishNameAvailability,
} from 'lbry-redux';
import ModalRepost from './view';

const select = (state, props) => ({
  channels: selectMyChannelClaims(state),
  claim: makeSelectClaimForUri(props.uri)(state),
  title: makeSelectTitleForUri(props.uri)(state),
  balance: selectBalance(state),
  error: selectRepostError(state),
  reposting: selectRepostLoading(state),
  myClaims: selectMyClaimsWithoutChannels(state),
});

export default connect(select, {
  doHideModal,
  doRepost,
  doClearRepostError,
  doToast,
  doFetchClaimListMine,
  doCheckPublishNameAvailability,
})(ModalRepost);
