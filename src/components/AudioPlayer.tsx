import React, { useEffect } from 'react';
import { Howl } from 'howler';

const AudioPlayer = ({ src }) => {
    useEffect(() => {
        const sound = new Howl({ src: [src], loop: true });
        sound.play();
        return () => sound.stop();
    }, [src]);

    return null;
};

export default AudioPlayer;
