// @flow

import React from 'react';
import Button from 'app/components/Button';
import styles from './Poll.css';
import type { PollEntity, OptionEntity } from 'app/reducers/polls';
import { Link } from 'react-router';
import { sortBy } from 'lodash';
import Icon from 'app/components/Icon';
import { Flex } from 'app/components/Layout';
import Tooltip from 'app/components/Tooltip';

type Props = {
  poll: PollEntity,
  handleVote: (pollId: number, optionId: number) => Promise<*>,
  backgroundLight?: boolean,
  truncate?: number,
  details?: boolean
};

type State = {
  truncateOptions: boolean,
  allOptions: Array<OptionEntityRatio>,
  optionsToShow: Array<OptionEntityRatio>,
  expanded: boolean
};

type OptionEntityRatio = OptionEntity & {
  ratio: number
};

class Poll extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const options = this.optionsWithPerfectRatios(props.poll.options);
    if (props.truncate && options.length > props.truncate) {
      this.state = {
        truncateOptions: true,
        allOptions: options,
        optionsToShow: options.slice(0, props.truncate),
        expanded: false
      };
    } else {
      this.state = {
        truncateOptions: false,
        allOptions: options,
        optionsToShow: options,
        expanded: true
      };
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.poll.options !== this.props.poll.options) {
      const options = this.optionsWithPerfectRatios(this.props.poll.options);
      this.props.truncate && !this.state.expanded
        ? this.setState({
            allOptions: options,
            optionsToShow: options.slice(0, this.props.truncate)
          })
        : this.setState({
            allOptions: options,
            optionsToShow: options
          });
    }
  }

  toggleTruncate = () => {
    const { truncate } = this.props;
    const { expanded, allOptions } = this.state;
    expanded
      ? this.setState({
          optionsToShow: allOptions.slice(0, truncate),
          expanded: false
        })
      : this.setState({
          optionsToShow: allOptions,
          expanded: true
        });
  };

  optionsWithPerfectRatios = (options: Array<OptionEntity>) => {
    const totalVotes = options.reduce((a, option) => a + option.votes, 0);
    const ratios = options.map(option => {
      return { ...option, ratio: (option.votes / totalVotes) * 100 };
    });
    return this.perfectRatios(ratios);
  };

  // As described in: https://stackoverflow.com/questions/13483430/how-to-make-rounded-percentages-add-up-to-100
  perfectRatios = (options: Array<OptionEntityRatio>) => {
    const off =
      100 - options.reduce((a, option) => a + Math.floor(option.ratio), 0);
    return sortBy(options, o => Math.floor(o.ratio) - o.ratio)
      .map((option, index) => {
        return {
          ...option,
          ratio: Math.floor(option.ratio) + (index < off ? 1 : 0)
        };
      })
      .sort((a, b) => b.ratio - a.ratio);
  };

  shuffle = array => {
    let counter = array.length;

    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  };

  render() {
    const { poll, handleVote, backgroundLight, details } = this.props;
    const { truncateOptions, optionsToShow, expanded } = this.state;
    const { id, title, description, options, hasAnswered, totalVotes } = poll;
    const shuffledOptionsToShow = this.shuffle(optionsToShow);
    return (
      <div
        className={`${styles.poll} ${backgroundLight ? styles.pollLight : ''}`}
      >
        <Flex>
          <Link to={`/polls/${id}`} style={{ flex: 1 }}>
            <Icon name="stats" />
            <span className={styles.pollHeader}>{title}</span>
          </Link>
          <Tooltip content="Avstemningen er anonym." renderDirection="left">
            <Icon
              name="information-circle-outline"
              size={20}
              style={{ cursor: 'pointer' }}
            />
          </Tooltip>
        </Flex>
        {details && (
          <div>
            <p>{description}</p>
          </div>
        )}
        {hasAnswered && (
          <Flex column className={styles.optionWrapper}>
            <table className={styles.pollTable}>
              <tbody>
                {optionsToShow.map(({ id, name, votes, ratio }) => {
                  return (
                    <tr key={id}>
                      <td className={styles.textColumn}>{name}</td>
                      <td className={styles.graphColumn}>
                        {votes === 0 ? (
                          <span className={styles.noVotes}>Ingen stemmer</span>
                        ) : (
                          <div className={styles.fullGraph}>
                            <div
                              style={{
                                width: `${ratio}%`
                              }}
                            >
                              <div className={styles.pollGraph}>
                                {ratio >= 18 && <span>{`${ratio}%`}</span>}
                              </div>
                            </div>
                            {ratio < 18 && (
                              <span style={{ marginLeft: '2px' }}>
                                {`${ratio}%`}
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Flex>
        )}
        {!hasAnswered && (
          <Flex column className={styles.optionWrapper}>
            {!expanded && (
              <Flex
                className={styles.blurContainer}
                onClick={this.toggleTruncate}
              >
                <p className={styles.blurOverlay}>Klikk her for å stemme.</p>
                <Icon
                  className={`${styles.blurOverlay} ${styles.blurArrow}`}
                  size={60}
                  name={expanded ? 'arrow-up' : 'arrow-down'}
                />
              </Flex>
            )}
            {options &&
              shuffledOptionsToShow.map(option => (
                <Flex
                  className={`${styles.alignItems} ${
                    expanded ? '' : styles.blurEffect
                  }`}
                  key={option.id}
                >
                  <Button
                    className={styles.voteButton}
                    onClick={() => handleVote(poll.id, option.id)}
                  >
                    {option.name}
                  </Button>
                </Flex>
              ))}
          </Flex>
        )}
        <div style={{ height: '29px' }}>
          <div className={styles.moreOptionsLink}>
            <span>{`Stemmer: ${totalVotes}`}</span>
            {truncateOptions && (
              <div className={styles.alignItems}>
                <Icon
                  onClick={this.toggleTruncate}
                  className={styles.arrow}
                  size={20}
                  name={expanded ? 'arrow-up' : 'arrow-down'}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Poll;
