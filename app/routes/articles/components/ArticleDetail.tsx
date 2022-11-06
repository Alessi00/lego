import styles from './ArticleDetail.css';
import { Content } from 'app/components/Content';
import CommentView from 'app/components/Comments/CommentView';
import Tag from 'app/components/Tags/Tag';
import Tags from 'app/components/Tags';
import LegoReactions from 'app/components/LegoReactions';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';
import DisplayContent from 'app/components/DisplayContent';
import type { ArticleEntity } from 'app/store/slices/articlesSlice';
import type { UserEntity } from 'app/store/slices/usersSlice';
import type { CommentEntity } from 'app/store/slices/commentsSlice';
import type { EmojiEntity } from 'app/store/slices/emojisSlice';
import type { ReactionEntity } from 'app/store/slices/reactionsSlice';
import type { ID } from 'app/models';
import NavigationTab, { NavigationLink } from 'app/components/NavigationTab';
type Props = {
  article: ArticleEntity;
  comments: Array<CommentEntity>;
  loggedIn: boolean;
  author: UserEntity;
  currentUser: UserEntity;
  deleteComment: (id: ID, contentTarget: string) => Promise<any>;
  emojis: Array<EmojiEntity>;
  addReaction: (arg0: { emoji: string; contentTarget: string }) => Promise<any>;
  reactionsGrouped: Array<ReactionEntity>;
  deleteReaction: (arg0: {
    reactionId: ID;
    contentTarget: string;
  }) => Promise<any>;
  fetchEmojis: () => Promise<any>;
  fetchingEmojis: boolean;
};

const ArticleDetail = ({
  article,
  author,
  loggedIn,
  currentUser,
  comments,
  deleteComment,
  emojis,
  addReaction,
  deleteReaction,
  fetchEmojis,
  fetchingEmojis,
}: Props) => {
  return (
    <Content
      banner={article.cover}
      bannerPlaceholder={article.coverPlaceholder}
      youtubeUrl={article.youtubeUrl}
    >
      <NavigationTab
        headerClassName={styles.headerClassName}
        className={styles.articleHeader}
        title={article.title}
      >
        {(article.actionGrant || []).includes('edit') && (
          <NavigationLink to={`/articles/${article.id}/edit`}>
            Rediger
          </NavigationLink>
        )}
      </NavigationTab>

      <div className={styles.articleDetails}>
        <span className={styles.detail}>
          Skrevet av
          <Link to={`/users/${author.username}`}> {author.fullName}</Link>
        </span>
        <span className={styles.detail}>
          {moment(article.createdAt).format('lll')}
        </span>
      </div>

      <DisplayContent content={article.content} />

      <Tags>
        {article.tags.map((tag) => (
          <Tag tag={tag} key={tag} link={'/articles/?tag=' + tag} />
        ))}
      </Tags>

      <div className={styles.articleReactions}>
        <LegoReactions
          emojis={emojis}
          fetchEmojis={fetchEmojis}
          fetchingEmojis={fetchingEmojis}
          addReaction={addReaction}
          deleteReaction={deleteReaction}
          parentEntity={article}
          loggedIn={loggedIn}
        />
      </div>

      {article.contentTarget && (
        <CommentView
          formEnabled
          user={currentUser}
          contentTarget={article.contentTarget}
          loggedIn={loggedIn}
          comments={comments}
          deleteComment={deleteComment}
        />
      )}
    </Content>
  );
};

export default ArticleDetail;
