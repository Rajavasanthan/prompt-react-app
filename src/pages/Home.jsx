import { useEffect, useState } from 'react';
import PromptCard from '../components/PromptCard';
import Modal from '../components/Modal';
import AddPromptForm from '../components/AddPromptForm';
import config from '../../config';
import { useAuth } from '../context/AuthContext'; // Added for Logout button

function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [prompts, setPrompts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    const { logout } = useAuth(); // Destructure logout

    const fetchPrompts = async (query) => {
        setIsLoading(true);
        setHasSearched(true);
        try {
            const response = await fetch(`${config.api}/prompt/search-prompt?search=${encodeURIComponent(query)}`,
                {
                    headers: {
                        'Authorization': `${localStorage.getItem('token')}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setPrompts(Array.isArray(data) ? data : (data.prompts || []));
        } catch (error) {
            console.error("Failed to fetch prompts:", error);
            setPrompts([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPrompts('');
    }, []);

    const handleSearch = () => {
        fetchPrompts(searchQuery);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleAddSuccess = () => {
        setIsAddModalOpen(false);
        fetchPrompts('');
    };

    return (
        <div className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto font-sans relative">
            {/* Logout Button - Absolute top right or nicely integrated */}
            <button
                onClick={logout}
                className="absolute top-6 right-6 md:top-12 md:right-12 text-sm text-gray-400 hover:text-[#FF9D9D] transition-colors"
            >
                Logout
            </button>

            {/* Header */}
            <header className="flex justify-between items-center mb-16 md:mb-24 mt-8 md:mt-0">
                <div className="flex-1"></div>

                {/* Logo Area */}
                <div className="text-center flex-1">
                    <h1 className="text-4xl md:text-5xl font-black text-[#FF9D9D] mb-2 tracking-wide">PROMPTIFY</h1>
                    <p className="text-gray-500 font-serif italic text-lg">your prompt search ends here...</p>
                </div>

                <div className="flex-1 flex justify-end items-center gap-4">
                    {/* Add Prompt Button */}
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-[#7CA9A0] hover:bg-[#6b968d] text-white px-6 py-2 rounded shadow-sm transition-colors cursor-pointer font-medium"
                    >
                        + Add your prompt
                    </button>
                    {/* Profile Placeholder */}
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                </div>
            </header>

            {/* Search Section */}
            <div className="mb-12 max-w-3xl mx-auto relative group">
                <div className="flex shadow-sm rounded-lg overflow-hidden relative">
                    <input
                        type="text"
                        placeholder="Search your prompt here..."
                        className="w-full bg-[#CDE8E3] text-gray-700 px-6 py-4 outline-none placeholder-gray-500 disabled:opacity-75"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSearch}
                        disabled={isLoading}
                        className="bg-[#7CA9A0] hover:bg-[#6b968d] text-white px-8 py-4 font-bold transition-colors cursor-pointer w-32 flex justify-center items-center disabled:bg-[#7CA9A0]/80 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            "Search"
                        )}
                    </button>
                </div>
            </div>

            {/* Prompts Grid */}
            <main className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
                {prompts.map(prompt => (
                    <PromptCard
                        key={prompt.id || Math.random()}
                        title={prompt.title}
                        prompt={prompt.prompt}
                        likes={prompt.likes}
                        author={prompt.author_id?.name}
                        totalVotes={prompt.totalVotes}
                        onClick={() => setSelectedPrompt(prompt)}
                    />
                ))}
                {hasSearched && !isLoading && prompts.length === 0 && (
                    <div className="text-center text-gray-400 py-12">No prompts found matching your search.</div>
                )}
                {!hasSearched && prompts.length === 0 && (
                    <div className="text-center text-gray-400 py-12 italic">Type something and search to find prompts...</div>
                )}
            </main>

            {/* Modals */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Prompt"
            >
                <AddPromptForm
                    onSuccess={handleAddSuccess}
                    onCancel={() => setIsAddModalOpen(false)}
                />
            </Modal>

            <Modal
                isOpen={!!selectedPrompt}
                onClose={() => setSelectedPrompt(null)}
                title={selectedPrompt?.title}
            >
                <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed p-4 bg-gray-50 rounded-lg border border-gray-100">
                        {selectedPrompt?.prompt}
                    </p>
                    <div className="h-20 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg text-sm">
                        Details & Comments Placeholder
                    </div>
                </div>
            </Modal>

        </div>
    );
}

export default Home;
