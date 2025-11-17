// components/Tabs.js
import React, { useState } from 'react';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('tab1'); // Initial active tab

  const renderContent = () => {
    switch (activeTab) {
      case 'tab1':
        return <div>Content for Tab 1</div>;
      case 'tab2':
        return <div>Content for Tab 2</div>;
      case 'tab3':
        return <div>Content for Tab 3</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="tab-list">
        <button
          className={activeTab === 'tab1' ? 'active-tab-button' : 'tab-button'}
          onClick={() => setActiveTab('tab1')}
        >
          Tab 1
        </button>
        <button
          className={activeTab === 'tab2' ? 'active-tab-button' : 'tab-button'}
          onClick={() => setActiveTab('tab2')}
        >
          Tab 2
        </button>
        <button
          className={activeTab === 'tab3' ? 'active-tab-button' : 'tab-button'}
          onClick={() => setActiveTab('tab3')}
        >
          Tab 3
        </button>
      </div>
      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Tabs;