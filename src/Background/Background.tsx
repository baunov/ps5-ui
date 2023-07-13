import './Background.scss';
import {useEffect, useRef} from 'react';

let curX = 0;
let curY = 0;
let tgX = 0;
let tgY = 0;

window.addEventListener('mousemove', (event) => {
    tgX = event.clientX;
    tgY = event.clientY;
});

export function Background() {
    const interBubbleRef = useRef<HTMLDivElement>(null);
    function move() {
        if (!interBubbleRef.current) {
            requestAnimationFrame(() => {
                move();
            });
            return;
        }
        curX += (tgX - curX) / 50;
        curY += (tgY - curY) / 50;
        interBubbleRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(() => {
            move();
        });
    }

    useEffect(() => {
        move();
    }, []);


    return (
        <div className="gradient-bg">
            <svg xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                                       result="goo"/>
                        <feBlend in="SourceGraphic" in2="goo"/>
                    </filter>
                </defs>
            </svg>
            <div className="gradients-container">
                <div className="g1"></div>
                <div className="g2"></div>
                <div className="g3"></div>
                <div className="g4"></div>
                <div className="g5"></div>
                <div className="interactive" ref={interBubbleRef}></div>
            </div>
        </div>
    );
}
