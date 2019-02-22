/* eslint-disable react/no-danger */
// @flow

import React, { Component } from 'react';
import styles from './Sidebar.css';
import PageHierarchy from './PageHierarchy';
import cx from 'classnames';

import type { HierarchySectionEntity } from './PageHierarchy';

type State = {
  isOpen: boolean
};

type Props = {
  categorySelected: string,
  currentUrl: string,
  pageHierarchy: Array<HierarchySectionEntity>,
  isOpen: boolean,
  handleClose: any
};

class Sidebar extends Component<Props, State> {
  render() {
    const {
      categorySelected,
      currentUrl,
      pageHierarchy,
      isOpen,
      handleClose
    }: Props = this.props;
    const pictureLabel = 'Listingløpet 1985';

    return (
      <div
        className={isOpen ? styles.sidebarWrapper : undefined}
        onClick={handleClose}
      >
        <div
          className={cx(styles.side, isOpen && styles.isOpen)}
          onClick={event => {
            // Ask someone about this (or just use gogle) <3
            event.stopPropagation();
          }}
        >
          <aside className={styles.sidebar}>
            <div className={styles.sidebarTop}>
              <h3 className={styles.sidebarHeader}>Om Abakus</h3>
              <h4 className={styles.sidebarSubtitle}>{categorySelected}</h4>

              <div className={styles.sidebarPicture}>
                <h4 className={styles.pictureHeader}> {"Abakus' Fortid"}</h4>
                <a href="https://abakus.no/photos/183/picture/460">
                  <img
                    alt={pictureLabel}
                    className={styles.oldImg}
                    src="https://thumbor.abakus.no/BT--sOMt9dTlSr93y_D3fCso9YE=/0x700/smart/scan713_OcOF51m.jpg"
                  />
                  <span className={styles.pictureInfo}>{pictureLabel}</span>
                </a>
              </div>
            </div>

            <div className={styles.sidebarBottom}>
              <PageHierarchy
                pageHierarchy={pageHierarchy}
                currentUrl={currentUrl}
              />
            </div>
          </aside>
        </div>
      </div>
    );
  }
}

export default Sidebar;
