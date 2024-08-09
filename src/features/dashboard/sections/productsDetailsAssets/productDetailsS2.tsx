// components/ProductInformation.tsx
import React from 'react';

interface ProductInformationProps {
  category: string;
  subCategory: string;
  display: string;
  allergens: string[];
  tags: string[];
}

const ProductInformation: React.FC<ProductInformationProps> = ({ category, subCategory, display, allergens, tags }) => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div>
        <h2 style={{ fontSize: '18px' }}>Produktinformationen</h2>
        <p><strong>Kategorie:</strong> {category}</p>
        <p><strong>Subkategorie:</strong> {subCategory}</p>
        <p><strong>Darstellung-Display:</strong> {display}</p>
      </div>
      <div>
        <h2 style={{ fontSize: '18px' }}>Allergen</h2>
        {allergens.map((allergen, index) => (
          <p key={index}>{allergen}</p>
        ))}
      </div>
      <div>
        <h2 style={{ fontSize: '18px' }}>Schlagworte & Übersetzung</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {tags.map((tag, index) => (
            <span key={index} style={{ margin: '0 10px 10px 0', padding: '5px', border: '1px solid #ddd' }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;
