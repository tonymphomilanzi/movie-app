const tabs = [
  { label: 'Trending', value: 'trending' },
  { label: 'Popular', value: 'popular' },
  { label: 'Latest', value: 'now_playing' },
];

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-4 mt-6">
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            activeTab === tab.value
              ? 'bg-netflix-red text-white'
              : 'bg-netflix-grayDark text-netflix-grayLight hover:bg-netflix-grayLight hover:text-white'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
