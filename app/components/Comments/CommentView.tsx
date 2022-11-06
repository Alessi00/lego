import { generateTreeStructure } from 'app/utils';
import LoadingIndicator from 'app/components/LoadingIndicator';
import CommentForm from 'app/components/CommentForm';
import { Flex } from 'app/components/Layout';
import type { UserEntity } from 'app/store/slices/usersSlice';
import CommentTree from './CommentTree';
import type { CommentEntity } from 'app/store/slices/commentsSlice';
import type { ID } from 'app/models';
type Props = {
  comments: Array<CommentEntity>;
  formDisabled?: boolean;
  contentTarget: string;
  user: UserEntity;
  loggedIn: boolean;
  displayTitle?: boolean;
  style?: Record<string, any>;
  newOnTop?: boolean;
  deleteComment: (id: ID, contentTarget: string) => Promise<any>;
};

const Title = ({ displayTitle }: { displayTitle: boolean }) =>
  displayTitle && <h3>Kommentarer</h3>;

const CommentView = (props: Props) => {
  const {
    comments,
    formDisabled = false,
    contentTarget,
    user,
    loggedIn,
    style,
    displayTitle = true,
    newOnTop = false,
    deleteComment,
  } = props;
  const commentFormProps = {
    contentTarget,
    user,
    loggedIn,
  };
  const tree = generateTreeStructure(comments);
  return (
    <div style={style}>
      <Title displayTitle={displayTitle} />
      <Flex
        style={{
          flexDirection: newOnTop ? 'column-reverse' : 'column',
        }}
      >
        <LoadingIndicator loading={!comments}>
          {comments && (
            <CommentTree
              comments={newOnTop ? tree.reverse() : tree}
              commentFormProps={commentFormProps}
              deleteComment={deleteComment}
              user={user}
              contentTarget={contentTarget}
            />
          )}
        </LoadingIndicator>

        {!formDisabled && (
          <div>
            <CommentForm {...commentFormProps} />
          </div>
        )}
      </Flex>
    </div>
  );
};

export default CommentView;
