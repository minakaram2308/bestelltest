import React, { useState } from 'react';
import { css } from 'styled-system/css';
import classNames from 'classnames';
import { Button, Card, Icon, InputWithIcon } from '@/components';

const searchResultItemStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px',
  backgroundColor: '#fff',
  textAlign: 'left',
  borderRadius: '8px',
  marginBottom: '10px',
});

const imageStyle = css({
  width: '60px',
  height: '60px',
  borderRadius: '50%', // Make the image round
  marginRight: '10px',
});

const infoStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  maxWidth: '300px',
});

const titleStyle = css({
  fontWeight: 'bold',
  fontSize: '1rem',
});

const priceStyle = css({
  fontSize: '0.875rem',
  color: '#888',
});

const actionButtonStyle = css({
  backgroundColor: '#ff6600',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '0.875rem',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const searchData = css({
  display: 'flex',
  gap: '10px'
});

const searchClasses = css({
  borderRadius: '12px',
  padding: '16px',
  minWidth: { base: 'auto', lg: '500px' },
  border: '1px solid #ddd',
  backgroundColor: '#f9f9f9',
  fontSize: '1rem',
});

interface SearchResultItemProps {
  artNr: string;
  image: string;
  name: string;
  price: string;
  onAdd: () => void;
  className?: string; // Add className as optional prop
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ artNr, image, name, price, onAdd, className }) => (
  <div className={classNames(searchResultItemStyle, className)}>
    <div className={searchData}>
      <div className={imageStyle}>
        <img src={image} alt={name} style={{ width: '100%', height: '100%' }} />
      </div>
      <div className={infoStyle}>
        <span>Art.-Nr {artNr}</span>
        <span className={titleStyle}>{name}</span>
        <span className={priceStyle}>{price}</span>
      </div>
    </div>
    <button className={actionButtonStyle} onClick={onAdd}>
      + Hinzufügen
    </button>
  </div>
);

export default SearchResultItem;
