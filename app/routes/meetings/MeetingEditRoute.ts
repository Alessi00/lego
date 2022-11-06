import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { compose } from 'redux';
import MeetingEditor from './components/MeetingEditor';
import {
  editMeeting,
  fetchMeeting,
  inviteUsersAndGroups,
  deleteMeeting,
} from 'app/actions/MeetingActions';
import { selectMeetingById } from 'app/store/slices/meetingsSlice';
import { selectUserById } from 'app/store/slices/usersSlice';
import { selectMeetingInvitationsForMeeting } from 'app/store/slices/meetingInvitationsSlice';
import { LoginPage } from 'app/components/LoginForm';
import replaceUnlessLoggedIn from 'app/utils/replaceUnlessLoggedIn';
import withPreparedDispatch from 'app/utils/withPreparedDispatch';

const mapStateToProps = (state, props) => {
  const { meetingId } = props.match.params;
  const meeting = selectMeetingById(state, {
    meetingId,
  });
  if (!meeting)
    return {
      meetingId,
    };
  const meetingInvitations = selectMeetingInvitationsForMeeting(state, {
    meetingId,
  });
  const reportAuthor = selectUserById(state, {
    userId: meeting.reportAuthor,
  });
  return {
    user: props.currentUser,
    initialValues: {
      ...meeting,
      reportAuthor: reportAuthor && {
        id: reportAuthor.id,
        value: reportAuthor.username,
        label: reportAuthor.fullName,
      },
      report: meeting.report,
      description: meeting.description ?? '',
      mazemapPoi: meeting.mazemapPoi && {
        label: meeting.location,
        value: meeting.mazemapPoi,
      },
      useMazemap: meeting.mazemapPoi > 0,
    },
    meeting,
    meetingId,
    meetingInvitations,
  };
};

const mapDispatchToProps = {
  handleSubmitCallback: editMeeting,
  inviteUsersAndGroups,
  deleteMeeting,
  push,
};
export default compose(
  replaceUnlessLoggedIn(LoginPage),
  withPreparedDispatch('fetchMeetingEdit', (props, dispatch) =>
    dispatch(fetchMeeting(props.match.params.meetingId))
  ),
  connect(mapStateToProps, mapDispatchToProps)
)(MeetingEditor);
