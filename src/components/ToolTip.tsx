import React, { useState, ReactNode } from 'react';

interface TooltipProps {
    children: ReactNode;
    text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="relative inline-block">
            <div
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
            >
                {children}
            </div>
            {visible && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gray-800 text-white text-sm rounded py-1 px-2 w-40">
                        {text}
                    </div>
                    <div className="border-solid border-l-8 border-r-8 border-b-8 border-gray-800 border-t-0 absolute bottom-full left-1/2 transform -translate-x-1/2"></div>
                </div>
            )}
        </div>
    );
};

export default Tooltip;
