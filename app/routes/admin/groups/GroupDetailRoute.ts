import { compose } from 'redux';
import { connect } from 'react-redux';
import GroupView from './components/GroupView';
import { fetchGroup } from 'app/actions/GroupActions';
import { selectGroup } from 'app/store/slices/groupsSlice';
import withPreparedDispatch from 'app/utils/withPreparedDispatch';

function mapStateToProps(state, props) {
  const { groupId } = props.match.params;
  const { match } = props;
  return {
    group: selectGroup(state, {
      groupId,
    }),
    groupId,
    match,
  };
}

export default compose(
  withPreparedDispatch(
    'fetchGroupDetail',
    (props, dispatch) => dispatch(fetchGroup(props.match.params.groupId)),
    (props) => [props.match.params.groupId]
  ),
  connect(mapStateToProps, {})
)(GroupView);
