import React from 'react'
import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from 'react-tsparticles';
import {loadFull} from 'tsparticles'
import { tsParticles } from "tsparticles-engine";
import { loadAbsorbersPlugin } from "tsparticles-plugin-absorbers";

loadAbsorbersPlugin(tsParticles);


function Particel() {
    const particlesInit = useCallback(async (engine: Engine) => {
        console.log(engine);

        // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        await console.log(container);
    }, []);
    
    return (
            <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={
                {
                fullScreen: {
                    zIndex: -1
                },
                background: {
                    color: {
                        value: "#fff",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 10,
                        },
                        repulse: {
                            distance: 100,
                            duration: 1,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#000",
                    },
                    links: {
                        color: "#000",
                        distance: 150,
                        enable: true,
                        opacity: 0.3,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 2,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 1000,
                        },
                        value: 100,
                    },
                    opacity: {
                        value: 0.3,
                    },
                    shape: {
                        type: "star",
                    },
                    size: {
                        value: { min: 1, max: 2},
                    },
                },
                detectRetina: true,
            }}
        />
    )
}

export default Particel

