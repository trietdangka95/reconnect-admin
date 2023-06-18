import styles from './BaseSpinner.module.css';

interface Props {
  fullScreen?: boolean;
  loadingComponent?: boolean;
  textLoading?: string;
}
const BaseSpinner = ({
  fullScreen,
  loadingComponent = false,
  textLoading
}: Props): JSX.Element => {
  if (!loadingComponent) {
    return (
      <div
        className={`flex justify-center items-center bg-black bg-opacity-30 ${
          fullScreen
            ? 'h-screen w-screen fixed top-0 left-0 z-1002'
            : 'absolute h-full w-full fixed top-0 left-0 z-1002 border-shadow-container'
        }`}
      >
        {textLoading ? (
          <p className='color-white'>{textLoading}</p>
        ) : (
          <svg className={styles['spinner']} viewBox='0 0 50 50'>
            <circle
              className={styles['path']}
              cx='25'
              cy='25'
              r='20'
              fill='none'
              strokeWidth='5'
            />
          </svg>
        )}
      </div>
    );
  } else {
    return (
      <div
        className={`flex justify-center items-center bg-black bg-opacity-30 h-full w-full absolute top-0 left-0 z-1002 rounded-lg`}
      >
        <svg className={styles['spinner']} viewBox='0 0 50 50'>
          <circle
            className={styles['path']}
            cx='25'
            cy='25'
            r='20'
            fill='none'
            strokeWidth='5'
          />
        </svg>
      </div>
    );
  }
};

export default BaseSpinner;
