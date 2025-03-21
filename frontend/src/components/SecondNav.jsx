import React from 'react';

const NavBar = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}><a href="#women">Women</a></li>
        <li style={styles.li}><a href="#men">Men</a></li>
        <li style={styles.li}><a href="#designer">Designer</a></li>
        <li style={styles.li}><a href="#kids">Kids</a></li>
        <li style={styles.li}><a href="#home">Home</a></li>
       </ul>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#f8f9fa',
    padding: '10px',
  },
  ul: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap', // Allow items to wrap on smaller screens
  },
  li: {
    display: 'inline',
    margin: '5px 10px', // Add margin for spacing
    '@media (max-width: 568px)': {
      display: 'block', // Stack items vertically on small screens
      textAlign: 'center', // Center-align text
    },
  },
};

export default NavBar;