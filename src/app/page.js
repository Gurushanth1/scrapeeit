'use client';
import Table from "@/components/Table";
import { useState, useEffect } from "react";

export default function Home() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [selectedSite, setSelectedSite] = useState(false);
  const [loading, setLoading] = useState(false);
const[  scraping,setScraping] = useState(false);


  // const { toast } = useToast();
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setError('');
    setScraping(true);
    const response = await fetch('/api/url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    if (data.message && !data.data) {
      setError(data.message);
      setScraping(false);
      return;
    }
    fetchData();
    setUrl('');
    setScraping(false);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await fetch('/api/url');
    const data = await response.json();
    setData(data);
  };
  return (
    <div className="bg-black min-h-screen max-h-full">
      <header className="py-6 px-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
              Scrapeit</h1>
          </div>
          <div>
            <p className="text-base text-gray-500 font-light">Extract insights from any URL</p>
          </div>
        </div>
      </header>
      <div className=" p-8 shadow-sm flex items-center justify-center">
        <div className="max-w-3xl">
          <div className="text-center space-y-2">
            <h1 className="max-w-3xl text-5xl font-bold text-white">Discover insights with AI-powered content analysis</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 py-10">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter website URL (e.g., https://example.com)"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError('');
                }}
                className={`sm: p-2 md:p-5 text-xl flex-1 ${error ? 'border-red-500' : ''} border-2 border-amber-50 rounded-full outline-0 text-white `}
              />
              <button
                type="submit"
                className="px-6 text-white rounded-full cursor-pointer text-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:bg-blue-700  "
              >
               {scraping ? 
               "Scraping..." 
               :"Scrape"} 
              </button>
            </div>
            {error && <p className="text-sm text-red-500 mt-1 text-center">{error}</p>}
            <p className="text-xs text-gray-500 text-center">
              Supports most public websites
            </p>
          </form>
        </div>
      </div>
      {/* filters and search */}
        <div className="flex items-center justify-between max-w-5xl mx-auto px-8 py-8 hidden sm:flex">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-white ">Extracted Content</h2>
          </div>
          <div className="flex items-center gap-4">
       
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="border-2 border-gray-300 rounded-full px-4 py-2 text-white"
            />
            <button   onClick={(e) => {
         
              setData(data.filter(item => item.title.toLowerCase().includes(search.toLowerCase())));

            }} className="text-white rounded-full cursor-pointer text-xl  pl-3">
              Filter
            </button>
     
        </div>
      </div>
      {loading ? 
        <div className="flex items-center justify-center py-10">
          <svg className="animate-spin h-10 w-10 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
            <path className="opacity-75" fill="none" d="M4 12a8 8 0 1 1 16 0A8 8 0 1 1 4 12z" />
          </svg>
        </div>
      :  <Table items={data} onDelete={(id) => {

        fetch(`/api/url/${id}`, {
          method: 'DELETE',
        })
          .then(() => {
            setData((data)=>data.filter(item => item.id !== id));
          })
      }} onOpen={(item) => {
        setSelectedSite(item);
      }} />}

      {selectedSite && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-200 text-black rounded-lg p-6 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-4">{selectedSite.title}</h2>
            <p className="mb-4">{selectedSite.data.summary}</p>
            <h3 className="font-semibold mb-2">Key Points:</h3>
            <ul className="list-disc list-inside mb-4">
              {selectedSite.data.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            <button
              onClick={() => setSelectedSite(false)}
              className="bg-orange-400 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>

      )}
      <footer className="py-6 px-8">
        <div className="text-center text-gray-500">
          &copy; 2023 Scrapeit. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
