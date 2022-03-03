import './Button.css';

interface ButtonProps {
  text: string;
  handleClick: () => void;
  classMix?: string;
  color?: string;
  isArrow?: boolean;
}

function Button({
  text,
  handleClick,
  classMix = '',
  color = 'primary',
  isArrow = false,
}: ButtonProps): JSX.Element {
  if (isArrow) {
    return (
      <button
        type="button"
        className={`button button_type_arrow ${classMix}`}
        onClick={handleClick}
        title={text}
      >
        <svg
          className={`button__arrow button__arrow_color_${color}`}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M50,11A39,39,0,1,0,89,50,39.05,39.05,0,0,0,50,11ZM62,53H45.24l3.88,3.88a3,3,0,0,1,0,4.24,3,3,0,0,1-4.24,0l-9-9a3.44,3.44,0,0,1-.38-.46l-.12-.22c-.05-.1-.11-.19-.15-.29s-.06-.2-.09-.3a2.58,2.58,0,0,1-.08-.26,2.93,2.93,0,0,1,0-1.18,2.58,2.58,0,0,1,.08-.26c0-.1,0-.2.09-.3s.1-.19.15-.29l.12-.22a3.44,3.44,0,0,1,.38-.46l9-9a3,3,0,0,1,4.24,4.24L45.24,47H62a3,3,0,0,1,0,6Z" />
        </svg>
      </button>
    );
  }

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
  isArrow: false,
};

export default Button;
