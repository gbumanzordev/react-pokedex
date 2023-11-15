import './StatProgressBar.scss';

const StatProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="stat">
      <span>{progress}%</span>
      <div className="progress">
        <div
          className={'progress-indicator ' + (progress <= 50 ? 'red' : 'green')}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatProgressBar;
