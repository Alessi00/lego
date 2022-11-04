import { compose } from 'redux';
import { connect } from 'react-redux';
import StudentConfirmation from './components/StudentConfirmation';
import { push } from 'connected-react-router';
import qs from 'qs';
import {
  sendStudentConfirmationEmail,
  confirmStudentUser,
} from 'app/actions/UserActions';
import withPreparedDispatch from 'app/utils/withPreparedDispatch';

const loadData = ({ location: { search } }, dispatch) => {
  const { token } = qs.parse(search, {
    ignoreQueryPrefix: true,
  });

  if (token) {
    return dispatch(confirmStudentUser(token));
  }
};

const StudentConfirmationRoute = (props) => {
  return <StudentConfirmation {...props} />;
};

const mapStateToProps = (state, props) => {
  return {
    studentConfirmed: state.auth.studentConfirmed,
    isStudent: props.currentUser && props.currentUser.isStudent,
  };
};

const mapDispatchToProps = {
  sendStudentConfirmationEmail,
  push,
};
export default compose(
  withPreparedDispatch('fetchStudentConfirmation', loadData),
  connect(mapStateToProps, mapDispatchToProps)
)(StudentConfirmationRoute);
