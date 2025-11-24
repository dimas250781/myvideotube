import React from 'react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="32"
        height="32"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
        aria-label="MyVideoTube Logo"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M42.4371 13.8459C41.9566 12.131 40.6698 10.8442 38.9549 10.3637C35.7998 9.5 24 9.5 24 9.5C24 9.5 12.2002 9.5 9.04509 10.3637C7.33023 10.8442 6.04343 12.131 5.56291 13.8459C4.7 17.001 4.7 24 4.7 24C4.7 24 4.7 30.999 5.56291 34.1541C6.04343 35.869 7.33023 37.1558 9.04509 37.6363C12.2002 38.5 24 38.5 24 38.5C24 38.5 35.7998 38.5 38.9549 37.6363C40.6698 37.1558 41.9566 35.869 42.4371 34.1541C43.3 30.999 43.3 24 43.3 24C43.3 24 43.3 17.001 42.4371 13.8459ZM19.55 30.5V17.5L31.1 24L19.55 30.5Z"
          fill="currentColor"
        />
      </svg>
      <div>
        <span className="text-xl font-bold tracking-tighter">MyVideoTube</span>
        <p className="text-xs text-muted-foreground">Created By. DimzM01</p>
      </div>
    </div>
  );
}
