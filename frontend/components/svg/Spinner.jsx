const Spinner = () => {
    return (
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <g transform="rotate(0 50 50)"><circle cx="50" cy="50" r="40" stroke="#fff" stroke-width="8" fill="none"><animate attributeName="stroke-dasharray" values="0, 200; 100, 200; 200, 200" dur="1.5s" repeatCount="indefinite"/><animate attributeName="stroke-dashoffset" values="0; -40; -100" dur="1.5s" repeatCount="indefinite" /></circle></g>
        </svg> 
    )
}

export default Spinner