const beneficiarySvg = ({ color }: { color: string }) => {
  const svgData = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_13_6919)">
    <path d="M10 13.3333C9.34073 13.3333 8.69626 13.1378 8.1481 12.7716C7.59994 12.4053 7.17269 11.8847 6.9204 11.2756C6.66811 10.6665 6.6021 9.9963 6.73072 9.3497C6.85933 8.7031 7.1768 8.10915 7.64298 7.64298C8.10915 7.1768 8.7031 6.85933 9.3497 6.73072C9.9963 6.6021 10.6665 6.66811 11.2756 6.9204C11.8847 7.1727 12.4053 7.59994 12.7716 8.1481C13.1378 8.69627 13.3333 9.34073 13.3333 10C13.3333 10.8841 12.9821 11.7319 12.357 12.357C11.7319 12.9821 10.8841 13.3333 10 13.3333ZM10 8.33333C9.67036 8.33333 9.34813 8.43108 9.07405 8.61422C8.79997 8.79735 8.58635 9.05765 8.4602 9.3622C8.33405 9.66674 8.30105 10.0019 8.36536 10.3252C8.42967 10.6485 8.5884 10.9454 8.82149 11.1785C9.05458 11.4116 9.35155 11.5703 9.67485 11.6346C9.99815 11.699 10.3333 11.6659 10.6378 11.5398C10.9423 11.4137 11.2026 11.2 11.3858 10.926C11.5689 10.6519 11.6667 10.3296 11.6667 10C11.6667 9.55797 11.4911 9.13405 11.1785 8.82149C10.8659 8.50893 10.442 8.33333 10 8.33333ZM15 19.1667C15 17.8406 14.4732 16.5688 13.5355 15.6311C12.5979 14.6935 11.3261 14.1667 10 14.1667C8.67392 14.1667 7.40215 14.6935 6.46447 15.6311C5.52678 16.5688 5 17.8406 5 19.1667C5 19.3877 5.0878 19.5996 5.24408 19.7559C5.40036 19.9122 5.61232 20 5.83333 20C6.05435 20 6.26631 19.9122 6.42259 19.7559C6.57887 19.5996 6.66667 19.3877 6.66667 19.1667C6.66667 18.2826 7.01786 17.4348 7.64298 16.8096C8.2681 16.1845 9.11594 15.8333 10 15.8333C10.8841 15.8333 11.7319 16.1845 12.357 16.8096C12.9821 17.4348 13.3333 18.2826 13.3333 19.1667C13.3333 19.3877 13.4211 19.5996 13.5774 19.7559C13.7337 19.9122 13.9457 20 14.1667 20C14.3877 20 14.5996 19.9122 14.7559 19.7559C14.9122 19.5996 15 19.3877 15 19.1667ZM15 6.66667C14.3407 6.66667 13.6963 6.47117 13.1481 6.1049C12.5999 5.73863 12.1727 5.21803 11.9204 4.60895C11.6681 3.99986 11.6021 3.32964 11.7307 2.68303C11.8593 2.03643 12.1768 1.44249 12.643 0.976312C13.1092 0.510137 13.7031 0.192668 14.3497 0.0640506C14.9963 -0.0645668 15.6665 0.00144427 16.2756 0.253736C16.8847 0.506029 17.4053 0.93327 17.7716 1.48143C18.1378 2.0296 18.3333 2.67406 18.3333 3.33334C18.3333 4.21739 17.9821 5.06524 17.357 5.69036C16.7319 6.31548 15.8841 6.66667 15 6.66667ZM15 1.66667C14.6704 1.66667 14.3481 1.76442 14.074 1.94755C13.8 2.13069 13.5863 2.39099 13.4602 2.69553C13.3341 3.00007 13.301 3.33518 13.3654 3.65849C13.4297 3.98179 13.5884 4.27876 13.8215 4.51185C14.0546 4.74493 14.3515 4.90367 14.6748 4.96798C14.9982 5.03229 15.3333 4.99928 15.6378 4.87313C15.9423 4.74699 16.2026 4.53337 16.3858 4.25929C16.5689 3.9852 16.6667 3.66297 16.6667 3.33334C16.6667 2.89131 16.4911 2.46738 16.1785 2.15482C15.8659 1.84226 15.442 1.66667 15 1.66667ZM20 12.5C19.9987 11.1743 19.4715 9.90333 18.5341 8.96593C17.5967 8.02853 16.3257 7.50133 15 7.5C14.779 7.5 14.567 7.5878 14.4107 7.74408C14.2545 7.90036 14.1667 8.11232 14.1667 8.33333C14.1667 8.55435 14.2545 8.76631 14.4107 8.92259C14.567 9.07887 14.779 9.16667 15 9.16667C15.8841 9.16667 16.7319 9.51786 17.357 10.143C17.9821 10.7681 18.3333 11.6159 18.3333 12.5C18.3333 12.721 18.4211 12.933 18.5774 13.0893C18.7337 13.2455 18.9457 13.3333 19.1667 13.3333C19.3877 13.3333 19.5996 13.2455 19.7559 13.0893C19.9122 12.933 20 12.721 20 12.5ZM5 6.66667C4.34073 6.66667 3.69626 6.47117 3.1481 6.1049C2.59994 5.73863 2.17269 5.21803 1.9204 4.60895C1.66811 3.99986 1.6021 3.32964 1.73072 2.68303C1.85933 2.03643 2.1768 1.44249 2.64298 0.976312C3.10915 0.510137 3.7031 0.192668 4.3497 0.0640506C4.9963 -0.0645668 5.66652 0.00144427 6.27561 0.253736C6.8847 0.506029 7.40529 0.93327 7.77156 1.48143C8.13784 2.0296 8.33333 2.67406 8.33333 3.33334C8.33333 4.21739 7.98214 5.06524 7.35702 5.69036C6.7319 6.31548 5.88405 6.66667 5 6.66667ZM5 1.66667C4.67036 1.66667 4.34813 1.76442 4.07405 1.94755C3.79997 2.13069 3.58635 2.39099 3.4602 2.69553C3.33405 3.00007 3.30105 3.33518 3.36536 3.65849C3.42967 3.98179 3.5884 4.27876 3.82149 4.51185C4.05458 4.74493 4.35155 4.90367 4.67485 4.96798C4.99815 5.03229 5.33326 4.99928 5.63781 4.87313C5.94235 4.74699 6.20265 4.53337 6.38578 4.25929C6.56892 3.9852 6.66667 3.66297 6.66667 3.33334C6.66667 2.89131 6.49107 2.46738 6.17851 2.15482C5.86595 1.84226 5.44203 1.66667 5 1.66667ZM1.66667 12.5C1.66667 11.6159 2.01786 10.7681 2.64298 10.143C3.2681 9.51786 4.11594 9.16667 5 9.16667C5.22101 9.16667 5.43297 9.07887 5.58926 8.92259C5.74554 8.76631 5.83333 8.55435 5.83333 8.33333C5.83333 8.11232 5.74554 7.90036 5.58926 7.74408C5.43297 7.5878 5.22101 7.5 5 7.5C3.67432 7.50133 2.40332 8.02853 1.46593 8.96593C0.528533 9.90333 0.00132369 11.1743 0 12.5C0 12.721 0.0877974 12.933 0.244078 13.0893C0.400358 13.2455 0.61232 13.3333 0.833333 13.3333C1.05435 13.3333 1.26631 13.2455 1.42259 13.0893C1.57887 12.933 1.66667 12.721 1.66667 12.5Z" fill=${color}/>
    </g>
    <defs>
    <clipPath id="clip0_13_6919">
    <rect width="20" height="20" fill="white"/>
    </clipPath>
    </defs>
    </svg> `;

  return svgData;
};

export default beneficiarySvg;
