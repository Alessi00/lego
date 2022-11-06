import { connect } from 'react-redux';
import {
  fetchAllAdmin,
  addSemesterStatus,
  editSemesterStatus,
  fetchSemesters,
  addSemester,
} from '../../actions/CompanyActions';
import BdbPage from './components/BdbPage';
import { compose } from 'redux';
import { selectCompanies } from 'app/store/slices/companiesSlice';
import { LoginPage } from 'app/components/LoginForm';
import replaceUnlessLoggedIn from 'app/utils/replaceUnlessLoggedIn';
import { selectCompanySemesters } from 'app/store/slices/companySemestersSlice';
import { push } from 'connected-react-router';
import qs from 'qs';
import withPreparedDispatch from 'app/utils/withPreparedDispatch';

const mapStateToProps = (state, props) => ({
  companies: selectCompanies(state, props),
  companySemesters: selectCompanySemesters(state, props),
  query: qs.parse(props.location.search, {
    ignoreQueryPrefix: true,
  }),
  fetching: state.companies.fetching,
});

const mapDispatchToProps = {
  editSemesterStatus,
  addSemesterStatus,
  addSemester,
  push,
};
export default compose(
  replaceUnlessLoggedIn(LoginPage),
  withPreparedDispatch('fetchBdb', (props, dispatch) =>
    dispatch(fetchSemesters()).then(() => dispatch(fetchAllAdmin()))
  ),
  connect(mapStateToProps, mapDispatchToProps)
)(BdbPage);
