import cx from 'classnames';
import { Component } from 'react';
import { Modal } from 'react-overlays';
import { Link, NavLink, withRouter } from 'react-router-dom';
import logoLightMode from 'app/assets/logo-dark.png';
import logoDarkMode from 'app/assets/logo.png';
import { Flex } from 'app/components/Layout';
import LoadingIndicator from 'app/components/LoadingIndicator';
import {
  LoginForm,
  RegisterForm,
  ForgotPasswordForm,
} from 'app/components/LoginForm';
import type { UserEntity } from 'app/reducers/users';
import utilStyles from 'app/styles/utilities.css';
import { applySelectedTheme, getOSTheme, getTheme } from 'app/utils/themeUtils';
import Button from '../Button';
import Dropdown from '../Dropdown';
import NotificationsDropdown from '../HeaderNotifications';
import Icon from '../Icon';
import { ProfilePicture, Image } from '../Image';
import Search from '../Search';
import FancyNodesCanvas from './FancyNodesCanvas';
import styles from './Header.css';
import ToggleTheme from './ToggleTheme';
import type { MouseEventHandler } from 'react';

type Props = {
  searchOpen: boolean;
  toggleSearch: () => any;
  currentUser: UserEntity;
  loggedIn: boolean;
  login: () => Promise<any>;
  logout: () => void;
  notificationsData: Record<string, any>;
  fetchNotifications: () => void;
  notifications: Array<Record<string, any>>;
  markAllNotifications: () => Promise<void>;
  fetchNotificationData: () => Promise<void>;
  upcomingMeeting: string;
  loading: boolean;
  updateUserTheme: (username: string, theme: string) => Promise<void>;
};

enum LoginMode {
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgotPassword',
}

type State = {
  accountOpen: boolean;
  shake: boolean;
  mode: LoginMode;
};

type AccountDropdownItemsProps = {
  logout: () => void;
  onClose: () => void;
  username: string;
  updateUserTheme: (username: string, theme: string) => Promise<void>;
};

function AccountDropdownItems({
  logout,
  onClose,
  username,
  updateUserTheme,
}: AccountDropdownItemsProps) {
  return (
    <Dropdown.List>
      <Dropdown.ListItem>
        <NavLink
          to="/users/me"
          onClick={onClose}
          style={{
            color: 'var(--lego-color-gray)',
          }}
        >
          <strong>{username}</strong>
          <Icon name="person-circle-outline" size={24} />
        </NavLink>
      </Dropdown.ListItem>
      <Dropdown.Divider />
      <Dropdown.ListItem>
        <Link to="/users/me/settings/profile" onClick={onClose}>
          Innstillinger
          <Icon name="settings-outline" size={24} />
        </Link>
      </Dropdown.ListItem>
      <Dropdown.ListItem>
        <Link to="/meetings/" onClick={onClose}>
          Møteinnkallinger
          <Icon name="people-outline" size={24} />
        </Link>
      </Dropdown.ListItem>
      <Dropdown.Divider />
      <Dropdown.ListItem>
        <ToggleTheme
          loggedIn={true}
          updateUserTheme={updateUserTheme}
          username={username}
          className={styles.themeChange}
          isButton={false}
        >
          <strong>Endre tema</strong>
        </ToggleTheme>
      </Dropdown.ListItem>

      <Dropdown.Divider />
      <Dropdown.ListItem>
        <Button
          flat
          onClick={() => {
            logout();
            onClose();
          }}
        >
          Logg ut
          <Icon name="log-out-outline" size={24} />
        </Button>
      </Dropdown.ListItem>
    </Dropdown.List>
  );
}

class Header extends Component<Props, State> {
  state = {
    accountOpen: false,
    shake: false,
    mode: LoginMode.LOGIN,
  };

  toggleRegisterUser: MouseEventHandler<HTMLButtonElement> = (e) => {
    this.setState({
      mode: LoginMode.REGISTER,
    });
    e.stopPropagation();
  };

  toggleForgotPassword: MouseEventHandler<HTMLButtonElement> = (e) => {
    this.setState({
      mode: LoginMode.FORGOT_PASSWORD,
    });
    e.stopPropagation();
  };

  toggleBack: MouseEventHandler<HTMLButtonElement> = (e) => {
    this.setState({
      mode: LoginMode.LOGIN,
    });
    e.stopPropagation();
  };

  render() {
    const { loggedIn, currentUser, loading } = this.props;
    const isLogin = this.state.mode === LoginMode.LOGIN;
    let title, form;

    if (
      __CLIENT__ &&
      loggedIn &&
      currentUser &&
      currentUser.selectedTheme &&
      (currentUser.selectedTheme === 'auto'
        ? getTheme() !== getOSTheme()
        : getTheme() !== currentUser.selectedTheme)
    ) {
      applySelectedTheme(currentUser.selectedTheme || 'light');
    }

    switch (this.state.mode) {
      case LoginMode.LOGIN:
        title = 'Logg inn';
        form = <LoginForm />;
        break;

      case LoginMode.REGISTER:
        title = 'Register';
        form = <RegisterForm />;
        break;

      case LoginMode.FORGOT_PASSWORD:
        title = 'Glemt passord';
        form = <ForgotPasswordForm />;
        break;

      default:
        break;
    }

    const MeetingButton = withRouter(({ history }) => (
      <button
        type="button"
        onClick={() => {
          history.push(`/meetings/${this.props.upcomingMeeting}`);
        }}
      >
        <Icon name="people" className={styles.meetingIcon} />
      </button>
    ));
    return (
      <header>
        <FancyNodesCanvas height={300} />
        <div className={styles.content}>
          <Link to="/">
            <LoadingIndicator loading={loading}>
              <div className={styles.logo}>
                <Image
                  src={logoLightMode}
                  className={styles.logoLightMode}
                  alt=""
                />
                <Image
                  src={logoDarkMode}
                  className={styles.logoDarkMode}
                  alt=""
                />
              </div>
            </LoadingIndicator>
          </Link>

          <div className={styles.menu}>
            <div className={styles.navigation}>
              <NavLink to="/events" activeClassName={styles.activeItem}>
                Arrangementer
              </NavLink>
              {!loggedIn ? (
                <NavLink
                  to="/pages/bedrifter/for-bedrifter"
                  activeClassName={styles.activeItem}
                >
                  For bedrifter
                </NavLink>
              ) : (
                <NavLink to="/joblistings" activeClassName={styles.activeItem}>
                  Karriere
                </NavLink>
              )}
              <NavLink
                to="/pages/info-om-abakus"
                activeClassName={styles.activeItem}
              >
                Om Abakus
              </NavLink>
            </div>

            <div className={styles.buttonGroup}>
              <ToggleTheme
                loggedIn={loggedIn}
                updateUserTheme={this.props.updateUserTheme}
                username={currentUser?.username}
                className={cx(loggedIn && utilStyles.hiddenOnMobile)}
              />

              {loggedIn && (
                <NotificationsDropdown
                  notificationsData={this.props.notificationsData}
                  fetchNotifications={this.props.fetchNotifications}
                  notifications={this.props.notifications}
                  markAllNotifications={this.props.markAllNotifications}
                  fetchNotificationData={this.props.fetchNotificationData}
                />
              )}

              {loggedIn && this.props.upcomingMeeting && <MeetingButton />}

              {loggedIn && (
                <Dropdown
                  show={this.state.accountOpen}
                  toggle={() =>
                    this.setState((state) => ({
                      accountOpen: !state.accountOpen,
                    }))
                  }
                  triggerComponent={
                    <ProfilePicture
                      size={24}
                      alt="user"
                      user={currentUser}
                      style={{
                        verticalAlign: 'middle',
                      }}
                    />
                  }
                >
                  <AccountDropdownItems
                    onClose={() =>
                      this.setState({
                        accountOpen: false,
                      })
                    }
                    username={currentUser.username}
                    logout={this.props.logout}
                    updateUserTheme={this.props.updateUserTheme}
                  />
                </Dropdown>
              )}

              {!loggedIn && (
                <Dropdown
                  show={this.state.accountOpen}
                  toggle={() =>
                    this.setState((state) => ({
                      accountOpen: !state.accountOpen,
                      shake: false,
                    }))
                  }
                  closeOnContentClick
                  contentClassName={cx(
                    this.state.shake ? 'animated shake' : '',
                    styles.dropdown
                  )}
                  triggerComponent={<Icon name="person-circle-outline" />}
                >
                  <div
                    style={{
                      padding: 10,
                    }}
                  >
                    <Flex
                      component="h2"
                      justifyContent="space-between"
                      alignItems="center"
                      className="u-mb"
                      style={{
                        whitespace: 'nowrap',
                      }}
                    >
                      {title}
                      {isLogin && (
                        <div>
                          <button
                            onClick={this.toggleForgotPassword}
                            className={styles.toggleButton}
                          >
                            Glemt passord
                          </button>
                          <span className={styles.toggleButton}>&bull;</span>
                          <button
                            onClick={this.toggleRegisterUser}
                            className={styles.toggleButton}
                          >
                            Jeg er ny
                          </button>
                        </div>
                      )}

                      {!isLogin && (
                        <button
                          onClick={this.toggleBack}
                          className={styles.toggleButton}
                        >
                          Tilbake
                        </button>
                      )}
                    </Flex>
                    {form}
                  </div>
                </Dropdown>
              )}

              <button onClick={this.props.toggleSearch}>
                <Icon name="menu" className={styles.searchIcon} />
              </button>
            </div>
          </div>

          <Modal
            show={this.props.searchOpen}
            onHide={this.props.toggleSearch}
            renderBackdrop={(props) => (
              <div {...props} className={styles.backdrop} />
            )}
            className={styles.modal}
          >
            <Search
              loggedIn={loggedIn}
              onCloseSearch={this.props.toggleSearch}
              updateUserTheme={this.props.updateUserTheme}
              username={this.props.currentUser?.username}
            />
          </Modal>
        </div>
      </header>
    );
  }
}

export default Header;
