import { shallow } from 'enzyme';
import Comment from '../Comment';

const comment = {
  id: 1,
  text: 'this is a nice comment',
  createdAt: '2016-02-02T22:17:21.838103Z',
  author: {
    id: 1,
    username: 'cat',
    fullName: 'Cat Catson',
    gender: 'female',
    firstName: 'Cat',
    lastName: 'Catson',
    profilePicture: 'picture',
  },
};
describe('components', () => {
  describe('Comment', () => {
    it('should show a comment', () => {
      // eslint-disable-next-line
      // @ts-ignore
      const wrapper = shallow(<Comment comment={comment} />);
      expect(wrapper.contains(comment.author.fullName)).toBe(true);
      expect(wrapper.find('#comment-text').html()).toContain(comment.text);
    });
  });
});
