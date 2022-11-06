import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  addSubmission,
  fetchUserSubmission,
} from '../../actions/SurveySubmissionActions';
import { fetchSurvey } from 'app/actions/SurveyActions';
import SubmissionContainer from './components/SubmissionEditor/SubmissionContainer';
import { selectSurveyById } from 'app/store/slices/surveysSlice';
import { selectSurveySubmissionForUser } from 'app/store/slices/surveySubmissionsSlice';
import { LoginPage } from 'app/components/LoginForm';
import replaceUnlessLoggedIn from 'app/utils/replaceUnlessLoggedIn';
import loadingIndicator from 'app/utils/loadingIndicator';
import withPreparedDispatch from 'app/utils/withPreparedDispatch';

const mapStateToProps = (state, props) => {
  const surveyId = Number(props.match.params.surveyId);
  const survey = selectSurveyById(state, {
    surveyId,
  });
  const currentUser = props.currentUser;
  const submission = selectSurveySubmissionForUser(state, {
    surveyId,
    currentUser,
  });
  const notFetching = state.surveySubmissions.fetching;
  return {
    survey,
    surveyId,
    submission,
    currentUser,
    notFetching,
    actionGrant: survey.actionGrant,
    initialValues: {
      answers: [],
    },
  };
};

const mapDispatchToProps = {
  submitFunction: addSubmission,
};
export default compose(
  replaceUnlessLoggedIn(LoginPage),
  withPreparedDispatch(
    'fetchAddSubmissions',
    (props, dispatch) =>
      Promise.all([
        dispatch(fetchSurvey(props.match.params.surveyId)),
        props.currentUser.id &&
          dispatch(
            fetchUserSubmission(
              props.match.params.surveyId,
              props.currentUser.id
            )
          ),
      ]),
    (props) => [
      props.match.params.surveyId,
      props.currentUser.id,
      props.notFetching,
    ]
  ),
  connect(mapStateToProps, mapDispatchToProps),
  loadingIndicator(['survey.questions', 'survey.event'])
)(SubmissionContainer);
