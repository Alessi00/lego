type Props = {
  /** Radius of circle in px */
  size?: number;

  /** Circle color */
  color?: string;

  /** Extra css */
  style?: any;
};

/**
 * A basic Cirlce component
 *
 */
function Circle({ size = 10, color = 'var(--color-gray-4)', style }: Props) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        display: 'inline-block',
        ...style,
      }}
    />
  );
}

export default Circle;
