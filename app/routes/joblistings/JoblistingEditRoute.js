// @flow
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fetchJoblisting, editJoblisting } from 'app/actions/JoblistingActions';
import { dispatched } from 'react-prepare';
import fetchOnUpdate from 'app/utils/fetchOnUpdate';
import JoblistingEditor
  from 'app/routes/joblistings/components/JoblistingEditor';
import { selectJoblistingById } from 'app/reducers/joblistings';
import { autocomplete } from 'app/actions/SearchActions';
import { selectAutocomplete } from 'app/reducers/search';
import { debounce } from 'lodash';
import { formValueSelector } from 'redux-form';
import { selectCompanyById } from 'app/reducers/companies';
import { fetch } from 'app/actions/companyActions';

function mapDispatchToProps(dispatch) {
  return {
    submitJoblisting: joblisting => dispatch(editJoblisting(joblisting)),
    fetchJoblisting: id => dispatch(fetchJoblisting(id)),
    onQueryChanged: debounce(
      query => dispatch(autocomplete(query, ['companies.company'])),
      30
    ),
    fetchCompany: id => dispatch(fetch(id))
  };
}

function loadData({ joblistingId }, props) {
  props.fetchJoblisting(joblistingId);
}

function mapStateToProps(state, props) {
  const { joblistingId } = props.params;
  const formSelector = formValueSelector('joblistingEditor');
  const company = formSelector(state, 'company');
  const joblisting = selectJoblistingById(state, { joblistingId });
  return {
    joblisting,
    initialValues: {
      ...joblisting,
      responsible: joblisting.responsible,
      workplaces: joblisting.workplaces
        .map(workplace => workplace.town)
        .join(',')
    },
    joblistingId,
    results: selectAutocomplete(state),
    company: company
      ? selectCompanyById(state, { companyId: company.id })
      : null
  };
}

export default compose(
  dispatched(
    ({ params: { joblistingId } }, dispatch) =>
      dispatch(fetchJoblisting(Number(joblistingId))),
    {
      componentWillReceiveProps: false
    }
  ),
  connect(mapStateToProps, mapDispatchToProps)
)(JoblistingEditor);
