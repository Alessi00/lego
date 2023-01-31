import { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from 'app/components/Card';
import { Image } from 'app/components/Image';
import type { Article } from 'app/models';
import truncateString from 'app/utils/truncateString';
import styles from './ArticleItem.css';

type Props = {
  item: Article;
  url: string;
  meta: Record<string, any>;
};

class ArticleItem extends Component<Props, any> {
  render() {
    const { item, url, meta } = this.props;
    const TITLE_MAX_LENGTH = 45;
    const DESC_MAX_LENGTH = 100;
    return (
      <Card className={styles.body}>
        <Link to={url} className={styles.link}>
          <Image
            className={styles.image}
            src={item.cover}
            placeholder={item.coverPlaceholder}
            height="110"
            alt="Article cover"
          />
          <div className={styles.infoWrapper}>
            <h2 className={styles.articleTitle}>
              {truncateString(item.title, TITLE_MAX_LENGTH)}
            </h2>
            <span className={styles.articleMeta}>
              Publisert - {meta.props.children[0]}
            </span>
          </div>
          <p className={styles.articleDescription}>
            {truncateString(item.description, DESC_MAX_LENGTH)}
          </p>
        </Link>
      </Card>
    );
  }
}

export default ArticleItem;
