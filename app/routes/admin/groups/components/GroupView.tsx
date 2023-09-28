import { LoadingIndicator } from '@webkom/lego-bricks';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import { useParams, CompatRoute } from 'react-router-dom-v5-compat';
import { fetchGroup } from 'app/actions/GroupActions';
import RouteWrapper from 'app/components/RouteWrapper';
import { selectGroup } from 'app/reducers/groups';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import ConnectedGroupMembers from '../components/GroupMembers';
import GroupPermissions from '../components/GroupPermissions';
import GroupSettings from './GroupSettings';

type GroupModel = {
  name: string;
  description: string;
  text: string | null | undefined;
};

type GroupProps = {
  group: GroupModel;
  path: string;
};

const Group = ({ path, group }: GroupProps) => {
  return (
    <div>
      <Helmet title={group.name} />
      <header>
        <h2>{group.name}</h2>
        <span>{group.description || ''}</span>
      </header>

      <Switch>
        <Route path={`${path}/settings`} component={GroupSettings} />
        <Route path={`${path}/members`} component={ConnectedGroupMembers} />
        <Route path={`${path}/permissions`} component={GroupPermissions} />
      </Switch>
    </div>
  );
};

const GroupView = () => {
  const { groupId } = useParams();
  const group = useAppSelector((state) => selectGroup(state, { groupId }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGroup(groupId));
  }, [dispatch, groupId]);

  const { path } = useRouteMatch();

  // We're loading a detailed representation of a group,
  // so make sure that the text field is there:
  const loading = !group || group.text == null;

  return (
    <section>
      <LoadingIndicator loading={loading}>
        {group && <Group group={group} path={path} />}
      </LoadingIndicator>
    </section>
  );
};

export default GroupView;
