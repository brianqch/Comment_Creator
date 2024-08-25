import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Credit: React.FC = () => {
    const githubUrl = 'https://github.com/brianqch';

    return (
        <div className="flex items-center justify-center p-4 rounded-lg gap-3 border-white border mb-10">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-gray-400">
                <FaGithub className="mr-2" /> {/* GitHub icon */}
                <span className="text-white justify-center hover:text-gray-400">Created by <strong>Brian Quach</strong></span>
            </a>
        </div>
    );
};

export default Credit;
