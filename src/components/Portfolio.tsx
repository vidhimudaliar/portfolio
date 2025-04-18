import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Globe } from './Globe';

interface Location {
    name: string;
    position: [number, number];
    content: React.ReactNode;
    icon?: string;
}

const locations: Location[] = [
    {
        name: 'About Me',
        position: [20.5937, 78.9629], // India coordinates
        icon: '🎨',
        content: (
            <div className="content-card indian-theme">
                <h2>About Me</h2>
                <div className="profile-section">
                    <div className="profile-image">
                        {/* Add your profile image here */}
                    </div>
                    <div className="profile-info">
                        <h3>Hello, Fellow Adventurers! 👋</h3>
                        <p>I'm a passionate developer from India, crafting digital experiences that inspire and delight.</p>
                        <div className="adventure-stats">
                            <div className="stat">
                                <span className="stat-icon">🚀</span>
                                <span className="stat-label">Projects Launched</span>
                                <span className="stat-value">15+</span>
                            </div>
                            <div className="stat">
                                <span className="stat-icon">💡</span>
                                <span className="stat-label">Technologies</span>
                                <span className="stat-value">20+</span>
                            </div>
                            <div className="stat">
                                <span className="stat-icon">🌍</span>
                                <span className="stat-label">Countries Reached</span>
                                <span className="stat-value">10+</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
    {
        name: 'Experience',
        position: [27.6648, -81.5158], // Florida coordinates
        icon: '🗺️',
        content: (
            <div className="content-card">
                <h2>My Journey</h2>
                <div className="experience-timeline">
                    <div className="timeline-entry">
                        <div className="entry-content">
                            <h3>Senior Developer</h3>
                            <p className="company">Adventure Tech Co.</p>
                            <p className="period">2021 - Present</p>
                            <ul className="achievements">
                                <li>Led development of innovative web applications</li>
                                <li>Mentored junior developers</li>
                                <li>Implemented modern tech solutions</li>
                            </ul>
                        </div>
                    </div>
                    {/* Add more experience entries */}
                </div>
            </div>
        ),
    },
    {
        name: 'Projects',
        position: [35.6762, 139.6503], // Tokyo coordinates
        icon: '🏗️',
        content: (
            <div className="content-card">
                <h2>Adventures in Code</h2>
                <div className="projects-grid">
                    {/* Add your projects here */}
                </div>
            </div>
        ),
    },
    {
        name: 'Skills',
        position: [-33.8688, 151.2093], // Sydney coordinates
        icon: '⚡',
        content: (
            <div className="content-card">
                <h2>My Tools</h2>
                <div className="skills-container">
                    {/* Add your skills here */}
                </div>
            </div>
        ),
    },
];

export const Portfolio = () => {
    const [selectedLocation, setSelectedLocation] = useState<Location | undefined>();
    const [showContent, setShowContent] = useState(false);

    const handleLocationSelect = (location: Location) => {
        setSelectedLocation(location);
        setTimeout(() => setShowContent(true), 2000); // Show content after globe animation
    };

    const handleBack = () => {
        setShowContent(false);
        setSelectedLocation(undefined);
    };

    return (
        <div className="portfolio-container">
            <div className="compass-decoration"></div>
            <div className="globe-container">
                <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
                    <ambientLight intensity={0.1} />
                    <directionalLight position={[5, 3, 5]} intensity={1} />
                    <pointLight position={[-5, 0, -5]} intensity={0.2} color="#ffffff" />
                    <Stars
                        radius={100}
                        depth={50}
                        count={5000}
                        factor={4}
                        saturation={0}
                        fade
                    />
                    <Globe
                        locations={locations}
                        onLocationSelect={handleLocationSelect}
                        currentLocation={selectedLocation}
                    />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        enabled={!selectedLocation}
                        minPolarAngle={Math.PI * 0.2}
                        maxPolarAngle={Math.PI * 0.8}
                    />
                </Canvas>
            </div>

            {showContent && selectedLocation && (
                <div className="content-overlay">
                    <button className="back-button" onClick={handleBack}>
                        Back to Globe
                    </button>
                    {selectedLocation.content}
                </div>
            )}
        </div>
    );
}; 