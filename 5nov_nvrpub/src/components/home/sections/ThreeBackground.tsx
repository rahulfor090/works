'use client'

import React from 'react'

// Note: This component requires @react-three/fiber, @react-three/drei, and maath packages
// Install them with: npm install @react-three/fiber @react-three/drei maath three
// Temporarily disabled to allow build to complete

/* 
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

const Particles = (props: any) => {
    const ref = useRef<any>()
    const matRef = useRef<any>()
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))

    useFrame((state: any, delta: any) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10
            ref.current.rotation.y -= delta / 15
        }
        if (matRef.current) {
            // Cycle color over time
            const time = state.clock.getElapsedTime()
            // Use HSL for smooth transitions: Hue 0-1, Saturation 0.8, Lightness 0.6
            // 0.1 speed factor means full cycle every ~10 seconds
            const hue = (time * 0.1) % 1
            matRef.current.color.setHSL(hue, 0.8, 0.6)
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    ref={matRef}
                    transparent
                    color="#EF4444"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    )
}
*/

const ThreeBackground = () => {
    // Temporarily disabled - requires Three.js dependencies
    // Install with: npm install @react-three/fiber @react-three/drei maath three
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            {/* <Canvas camera={{ position: [0, 0, 1] }}>
                <Particles />
            </Canvas> */}
        </div>
    )
}

export default ThreeBackground
