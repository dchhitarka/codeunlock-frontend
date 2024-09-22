import React from 'react';

console.log(process.env.REACT_APP_ENV);
// Make sure to only include the library in development
if (process.env.REACT_APP_ENV === "development") {
    
    const whyDidYouRender = require("@welldone-software/why-did-you-render");
    console.log(whyDidYouRender);
    
    whyDidYouRender(React, {
      trackAllPureComponents: true
    });
}
