import { connect } from 'react-redux';
import { compose } from 'redux';
import replaceUnlessLoggedIn from 'app/utils/replaceUnlessLoggedIn';
import { LoginPage } from 'app/components/LoginForm';
import {
  selectCompanySemesters,
  selectCompanySemestersForInterestForm,
} from 'app/store/slices/companySemestersSlice';
import {
  addSemester,
  editSemester,
  fetchSemesters,
} from 'app/actions/CompanyActions';
import CompanySemesterGUI from './components/CompanySemesterGUI';
import withPreparedDispatch from 'app/utils/withPreparedDispatch';

const mapStateToProps = (state) => {
  const semesters = selectCompanySemesters(state);
  const activeSemesters = selectCompanySemestersForInterestForm(state);
  return {
    initialValues: {
      semester: 'spring',
    },
    semesters,
    activeSemesters,
  };
};

const mapDispatchToProps = {
  addSemester,
  editSemester,
};
export default compose(
  replaceUnlessLoggedIn(LoginPage),
  withPreparedDispatch('fetchCompanySemesterGUI', (props, dispatch) =>
    dispatch(fetchSemesters())
  ),
  connect(mapStateToProps, mapDispatchToProps)
)(CompanySemesterGUI);
