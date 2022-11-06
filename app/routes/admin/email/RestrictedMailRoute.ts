import { compose } from 'redux';
import { connect } from 'react-redux';
import loadingIndicator from 'app/utils/loadingIndicator';
import RestrictedMailEditor from './components/RestrictedMailEditor';
import { fetchRestrictedMail } from 'app/actions/RestrictedMailActions';
import { selectRestrictedMailById } from 'app/store/slices/restrictedMailsSlice';
import withPreparedDispatch from 'app/utils/withPreparedDispatch';

const mapStateToProps = (state, { match: { params } }) => {
  const restrictedMail = selectRestrictedMailById(state, {
    restrictedMailId: params.restrictedMailId,
  });
  return {
    restrictedMail,
    restrictedMailId: params.restrictedMailId,
    fetching: state.restrictedMails.fetching,
    initialValues: {
      ...restrictedMail,
      groups: (restrictedMail.groups || []).map((groups) => ({
        label: groups.name,
        value: groups.id,
      })),
      meetings: (restrictedMail.meetings || []).map((meeting) => ({
        label: meeting.name,
        value: meeting.id,
      })),
      events: (restrictedMail.events || []).map((event) => ({
        label: event.title,
        value: event.id,
      })),
      // Raw Sauce
      rawAddresses: (restrictedMail.rawAddresses || []).map((rawAddresses) => ({
        label: rawAddresses,
        value: rawAddresses,
      })),
      users: (restrictedMail.users || []).map((user) => ({
        label: user.fullName,
        value: user.id,
      })),
    },
  };
};

export default compose(
  withPreparedDispatch(
    'fetchRestrictedMail',
    (props, dispatch) =>
      dispatch(fetchRestrictedMail(props.match.params.restrictedMailId)),
    (props) => [props.match.params.restrictedMailId]
  ),
  connect(mapStateToProps, {}),
  loadingIndicator(['restrictedMail.id'])
)(RestrictedMailEditor);
