import { useState } from "react";


const useToggleOpen = (init) => {

    const [isPanelOpen, setIsPanelOpen] = useState(init);

    const handlePanelToggle = (e) => {
        if (e) {
            e.stopPropagation();
        }
        setIsPanelOpen(prev => !prev);
    };
    
    return [isPanelOpen, handlePanelToggle];
};

export default useToggleOpen;