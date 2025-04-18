import React from 'react';

const Signpost = ({ position, label, onClick }) => {
    return (
        <mesh position={position} onClick={onClick}>
            <boxGeometry args={[0.5, 0.2, 0.1]} />
            <meshStandardMaterial color="orange" />
            {/* Add text label here using Drei's Text component */}
        </mesh>
    );
};

export default Signpost;
