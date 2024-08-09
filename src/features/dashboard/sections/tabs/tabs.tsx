// components/Tabs.tsx
import React, { useState, useMemo } from 'react';

interface Tab {
  label: string;
  value: string;
  Component: React.FC<any>;
}

interface TabsProps {
  tabs: Tab[];
  product: any;
}

const Tabs: React.FC<TabsProps> = ({ tabs, product }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const ActiveComponent = useMemo(() => {
    return tabs.find(tab => tab.value === activeTab)?.Component;
  }, [activeTab, tabs]);

  return (
    <div style={styles.info}>
      <div style={styles.tabContainer}>
        {tabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            style={tab.value === activeTab ? styles.activeTab : styles.tab}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={styles.componentContainer}>
        {ActiveComponent && <ActiveComponent product={product} />}
      </div>
    </div>
  );
};

const styles = {
  tabContainer: {
    display: 'flex',
    backgroundColor: '#F8F8F8',
    padding: '10px',
    borderRadius: '8px',
  },
  tab: {
    marginRight: '20px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '12px',
    backgroundColor: '#F8F8F8',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#000000',
     width:'100%'
  },
  activeTab: {
    marginRight: '20px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '12px',
    backgroundColor: '#0D0D2B',
    color: '#FFFFFF',
    cursor: 'pointer',
    fontWeight: 'bold',
     width:'100%'
  },
  info:{
   width:'100%'
  },
  componentContainer: {
    marginTop: '20px',
  },
};

export default Tabs;
