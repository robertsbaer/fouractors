// BuyMeACoffeeButton.js

import React from 'react';

const BuyMeACoffeeButton = () => {
  return (
    <a href="https://www.buymeacoffee.com/robertbaer" target='_blank'>
      <img 
        src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=robertbaer&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" 
        alt="Buy Me a Coffee"
        style={{ height: '60px', width: '217px', paddingTop: '30px' }} 
      />
    </a>
  );
};

export default BuyMeACoffeeButton;
