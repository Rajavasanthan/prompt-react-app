import React from 'react';

const PromptCard = ({ title, prompt, onClick, likes, totalVotes, author, onLike, onDislike }) => {
    return (
        <div
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col gap-3"
        >
            <div className="flex justify-between items-start">
                <h3
                    onClick={onClick}
                    className="font-bold text-lg text-gray-800 cursor-pointer hover:text-[#7CA9A0] transition-colors"
                >
                    {title}
                </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {prompt}
            </p>

            <div className="mt-auto pt-4 flex justify-end items-center gap-3 text-gray-400 text-xs">
                <span
                    onClick={(e) => { e.stopPropagation(); onLike(); }}
                    className="flex items-center gap-1 hover:text-[#7CA9A0] transition-colors cursor-pointer"
                >
                    👍 {likes}
                </span>
                <span
                    onClick={(e) => { e.stopPropagation(); onDislike(); }}
                    className="flex items-center gap-1 hover:text-[#FF9D9D] transition-colors cursor-pointer"
                >
                    👎 {totalVotes - likes}
                </span>
                <span className="flex items-center gap-1 hover:text-gray-600 transition-colors">
                    📋
                </span>
                <span className="flex items-center gap-1 hover:text-gray-600 transition-colors">
                    {author}
                </span>
            </div>
        </div>
    );
};

export default PromptCard;
