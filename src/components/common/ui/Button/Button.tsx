import './Button.css';

interface ButtonProps {
  text: string;
  handleClick: () => void;
  classMix?: string;
  color?: string;
}

function Button({ text, handleClick, classMix = '', color = 'primary' }: ButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className={`button button_color_${color} ${classMix}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  classMix: '',
  color: 'primary',
};

export default Button;
