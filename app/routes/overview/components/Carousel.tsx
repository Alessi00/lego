import type { Node } from 'react';
import { Component } from 'react';
import styles from './Carousel.css';
type MenuItem = {
  item: Record<string, any>;
  isActive: boolean;
  onClick: () => void;
};
type Props = {
  items: Array<Record<string, any>>;
  renderMenuItem: (arg0: MenuItem) => Node;
  renderContent: (arg0: Record<string, any>) => Node;
};
type State = {
  selectedIndex: number;
};

class Carousel extends Component<Props, State> {
  state = {
    selectedIndex: 0,
  };
  static defaultProps = {
    renderMenuItem: () => <div />,
  };

  render() {
    const { items, renderMenuItem, renderContent } = this.props;
    return (
      <div className={styles.carousel}>
        <div className={styles.left}>
          {items.map((item, index) =>
            renderMenuItem({
              item,
              isActive: this.state.selectedIndex === index,
              onClick: () =>
                this.setState({
                  selectedIndex: index,
                }),
            })
          )}
        </div>
        <div className={styles.right}>
          {renderContent({
            item: items[this.state.selectedIndex],
          })}
        </div>
      </div>
    );
  }
}

export default Carousel;