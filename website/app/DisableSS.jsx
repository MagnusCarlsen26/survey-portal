import { useEffect } from 'react';

const DisableScreenshot = () => {
  useEffect(() => {
    document.addEventListener('keyup', (e) => {
        if (e.key == 'PrintScreen') {
            alert('Taking screenshots is prohibited.');
        }
    });
    
    /** TO DISABLE PRINTS WHIT CTRL+P **/
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key == 'p') {
            alert('This section is not allowed to print or export to PDF');
            e.cancelBubble = true;
            e.preventDefault();
            e.stopImmediatePropagation();
        }
    });
  }, []);

  return null; // This component does not render anything
};

export default DisableScreenshot;