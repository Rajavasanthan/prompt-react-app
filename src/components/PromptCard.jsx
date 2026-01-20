import React from 'react';

const PromptCard = ({ title, prompt, onClick, likes, totalVotes }) => {
    return (
        <div
            onClick={onClick}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 flex flex-col gap-3"
        >
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-gray-800">{title}</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {prompt}
            </p>

            <div className="mt-auto pt-4 flex justify-end items-center gap-3 text-gray-400 text-xs">
                <span className="flex items-center gap-1 hover:text-gray-600 transition-colors">
                    👍 {likes}
                </span>
                <span className="flex items-center gap-1 hover:text-gray-600 transition-colors">
                    👎 {totalVotes - likes}
                </span>
                <span className="flex items-center gap-1 hover:text-gray-600 transition-colors">
                    📋
                </span>
            </div>
        </div>
    );
};

export default PromptCard;
