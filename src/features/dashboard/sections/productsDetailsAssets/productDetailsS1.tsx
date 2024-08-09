import React from 'react';

interface ProductDetailsProps {
  product: any;
}

const ProductDetailsOne: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.heading}>Produktinformationen</h2>
        <p style={styles.info}><span>Kategorie:</span> {product.productCategory?.isFood ? 'Food' : 'Non-Food'}</p>
        <p style={styles.info}><span>Subkategorie:</span> {product.productCategory?.id || 'N/A'}</p>
        <p style={styles.info}><span>Darstellung-Display:</span> {product.showInPopularProducts ? 'Beliebt' : 'Standard'}</p>
      </div>
      <hr style={styles.paddingBorder} />
      <div style={styles.section}>
        <h2 style={styles.heading}>Allergen</h2>
        {product.allergies && product.allergies.length > 0 ? (
          product.allergies.map((allergy: any, index: number) => (
            <p style={styles.info} key={index}>{allergy.id}</p>
          ))
        ) : (
          <p style={styles.info}>Keine Allergene vorhanden</p>
        )}
      </div>
      <hr style={styles.paddingBorder} />
      <div style={styles.section}>
        <h2 style={styles.heading}>Schlagworte & Übersetzung</h2>
        <div style={styles.tagsContainer}>
          {product.keywords && Array.isArray(product.keywords) && product.keywords.length > 0 ? (
            product.keywords.map((keyword: string, index: number) => (
              <span style={styles.tag} key={index}>{keyword.trim()}</span>
            ))
          ) : (
            <span style={styles.tag}>Keine Schlagworte vorhanden</span>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'inter, sans-serif',
    color: '#333',
    width: '100%'
  },
  section: {
    marginBottom: '40px',
    width: '100%'
  },
  heading: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '5px 0',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  tag: {
    margin: '0 10px 10px 0',
    padding: '5px',
    border: '1px solid #ddd',
  },
  paddingBorder: {
    background: 'rgba(231, 231, 225, 1)',
    margin: '40px auto',
    height: '2px',
    display: 'block',
    width: '80%',
    border: 'none',
  },
};

export default ProductDetailsOne;
