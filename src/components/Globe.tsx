import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import '../styles/Globe.css';

interface Location {
    name: string;
    position: [number, number]; // [latitude, longitude]
    content: React.ReactNode;
    icon?: string;
}

interface GlobeProps {
    onLocationSelect: (location: Location) => void;
    currentLocation?: Location;
}

export const Globe = ({ onLocationSelect, currentLocation }: GlobeProps) => {
    const globeRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState<Location | null>(null);
    const [earthTexture] = useState(() => new THREE.TextureLoader().load('/textures/earth_texture.jpg'));
    const [bumpTexture] = useState(() => new THREE.TextureLoader().load('/textures/earth_normal.jpg'));
    const [specularTexture] = useState(() => new THREE.TextureLoader().load('/textures/earth_specular.jpg'));
    const [cloudsTexture] = useState(() => new THREE.TextureLoader().load('/textures/earth_clouds.jpg'));
    const [paperTexture] = useState(() => {
        const texture = new THREE.TextureLoader().load('/textures/old_paper.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 2);
        texture.offset.set(0, 0);
        texture.anisotropy = 16;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        return texture;
    });

    useEffect(() => {
        // Configure textures
        earthTexture.wrapS = earthTexture.wrapT = THREE.RepeatWrapping;
        bumpTexture.wrapS = bumpTexture.wrapT = THREE.RepeatWrapping;
        specularTexture.wrapS = specularTexture.wrapT = THREE.RepeatWrapping;
        cloudsTexture.wrapS = cloudsTexture.wrapT = THREE.RepeatWrapping;
    }, [earthTexture, bumpTexture, specularTexture, cloudsTexture]);

    return (
        <group>
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.5}
                minPolarAngle={Math.PI * 0.2}
                maxPolarAngle={Math.PI * 0.8}
            />

            {/* Paper background */}
            <Sphere args={[90, 64, 64]}>
                <meshBasicMaterial
                    map={paperTexture}
                    side={THREE.BackSide}
                    transparent={true}
                    opacity={0.9}
                    color={new THREE.Color('#D4A76A')}
                />
            </Sphere>

            {/* Main Earth sphere */}
            <Sphere ref={globeRef} args={[1, 64, 64]}>
                <meshPhongMaterial
                    map={earthTexture}
                    bumpMap={bumpTexture}
                    bumpScale={0.008}
                    specularMap={specularTexture}
                    specular={new THREE.Color('#4A90E2')}
                    shininess={15}
                />
            </Sphere>

            {/* Cloud layer */}
            <Sphere args={[1.01, 64, 64]}>
                <meshPhongMaterial
                    map={cloudsTexture}
                    transparent={true}
                    opacity={0.3}
                    depthWrite={false}
                />
            </Sphere>

            {/* Enhanced lighting setup for all-around brightness */}
            <ambientLight intensity={1.2} color="#FFFFFF" />

            {/* Main directional light (sun-like) */}
            <directionalLight
                position={[5, 3, 5]}
                intensity={2}
                color="#FFF5E0"
            />

            {/* Fill lights for even illumination */}
            <directionalLight
                position={[-5, 3, -5]}
                intensity={1.5}
                color="#E6F3FF"
            />
            <directionalLight
                position={[0, -5, 0]}
                intensity={1}
                color="#FFFFFF"
            />

            {/* Additional point lights for highlights */}
            <pointLight
                position={[10, 10, 10]}
                intensity={0.8}
                color="#FFD700"
            />
            <pointLight
                position={[-10, -10, -10]}
                intensity={0.8}
                color="#87CEEB"
            />
            <pointLight
                position={[0, 10, -10]}
                intensity={0.8}
                color="#FFFFFF"
            />
        </group>
    );
};
