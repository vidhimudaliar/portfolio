import React from 'react';

const LocationPanel = ({ location }) => {
    switch (location) {
        case 'india':
            return <div>About Me content styled with Desi theme</div>;
        case 'florida':
            return <div>Experience content with Florida visuals</div>;
        default:
            return null;
    }
};

export default LocationPanel;
