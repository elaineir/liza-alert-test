import './Button.css';

interface ButtonProps {
  text: string;
  handleClick: () => void;
  classMix: string;
}

function Button({ text, handleClick, classMix }: ButtonProps): JSX.Element {
  return (
    <button type="button" className={`button ${classMix}`} onClick={handleClick}>
      {text}
    </button>
  );
}

export default Button;
