type Props = {
  color: string;
};

const AddReactionEmoji = ({ color }: Props) => (
  <svg
    width="18px"
    height="18px"
    viewBox="0 0 24 24"
    id="add-reaction"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      id="Rectangle_3"
      data-name="Rectangle 3"
      width="24"
      height="24"
      fill="none"
    />
    <path
      id="Oval"
      d="M8.4,0a8.4,8.4,0,0,0,0,16.8h0a8.4,8.4,0,0,0,8.4-8.4"
      transform="translate(2.4 4.8)"
      fill="none"
      stroke={color}
      strokeMiterlimit="10"
      strokeWidth="1.5"
    />
    <path
      id="Oval-2"
      data-name="Oval"
      d="M0,0A4.807,4.807,0,0,0,1.042,1.557,4.785,4.785,0,0,0,4.436,2.963h0A4.785,4.785,0,0,0,7.83,1.557,4.807,4.807,0,0,0,8.872,0"
      transform="translate(6.364 15.037)"
      fill="none"
      stroke={color}
      strokeMiterlimit="10"
      strokeWidth="1.5"
    />
    <circle
      id="Oval-3"
      data-name="Oval"
      cx="1.2"
      cy="1.2"
      r="1.2"
      transform="translate(7.2 9.6)"
      fill="#ffffff"
      stroke={color}
      strokeWidth="1"
    />
    <circle
      id="Oval-4"
      data-name="Oval"
      cx="1.2"
      cy="1.2"
      r="1.2"
      transform="translate(12 9.6)"
      fill="#ffffff"
      stroke={color}
      strokeWidth="1"
    />
    <path
      id="Line"
      d="M1.2,0V7.2"
      transform="translate(18 1.2)"
      fill="none"
      stroke={color}
      strokeLinecap="square"
      strokeMiterlimit="10"
      strokeWidth="1.5"
    />
    <path
      id="Line-2"
      data-name="Line"
      d="M0,1.2H7.2"
      transform="translate(15.6 3.6)"
      fill="none"
      stroke={color}
      strokeLinecap="square"
      strokeMiterlimit="10"
      strokeWidth="1.5"
    />
  </svg>
);

AddReactionEmoji.defaultProps = {
  color: '#6a737d',
};
export default AddReactionEmoji;
