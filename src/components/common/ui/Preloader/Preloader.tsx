import './Preloader.css';

interface PreloaderProps {
  classMix?: string;
}

function Preloader({ classMix = '' }: PreloaderProps) {
  return (
    <div className={`preloader ${classMix}`}>
      <div className="preloader__container">
        <div className="preloader__block" />
        <div className="preloader__block" />
      </div>
    </div>
  );
}

Preloader.defaultProps = {
  classMix: '',
};

export default Preloader;
