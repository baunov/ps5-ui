import {ForwardedRef, forwardRef, HTMLAttributes} from 'react';
import './GameCard.scss';

interface GameCardProps extends HTMLAttributes<HTMLDivElement> {
    logo: string;
    name: string;
    active?: boolean;
}
export const GameCard = forwardRef(
    function GameCard({logo, name, active, ...props}: GameCardProps, ref: ForwardedRef<HTMLDivElement>) {
    return (
        <div ref={ref} {...props} className={`game-card ${active ? 'active' : ''}`}>
            {active && <div className='animated-border'></div>}
            <div className='game-card-img'>
                <img src={logo} alt={name}/>
            </div>
        </div>
    )
});
