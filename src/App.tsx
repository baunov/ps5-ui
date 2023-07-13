import './App.scss'
import {GameCard} from './GameCard/GameCard.tsx';
import {useEffect, useState} from 'react';
import {Howl} from 'howler';
import {CrossFader} from 'react-cross-fader';

interface Game {
    logo: string;
    name: string;
    bg?: string;
}

const games: Game[] = [
    {
        logo: '/games/fortnite.jpeg',
        name: 'Fortnite',
        bg: '/games/fortnite_bg.jpeg'
    },
    {
        logo: '/games/rdr2.jpeg',
        name: 'Red Dead Redemption 2',
        bg: '/games/rdr2_bg.jpeg'
    },
    {
        logo: '/games/skyrim.webp',
        name: 'The Elder Scrolls V: Skyrim',
        bg: '/games/skyrim_bg.jpeg'
    },
    {
        logo: '/games/witcher3.jpeg',
        name: 'The Witcher 3: Wild Hunt',
        bg: '/games/witcher3_bg.webp'
    },
    {
        logo: '/games/uncharted.jpeg',
        name: 'Uncharted 4',
        bg: '/games/uncharted_bg.jpeg'
    },
    {
        logo: '/games/spiderman.jpeg',
        name: 'Spider-man',
        bg: '/games/spiderman_bg.webp'
    },
    {
        logo: '/games/tekken.jpeg',
        name: 'Tekken 7',
        bg: '/games/tekken_bg.jpeg'
    }
];

const CARD_SIZE = 128;
const ACTIVE_CARD_SIZE = 220;
const CARD_GAP = 10;
const ACTIVE_CARD_GAP = 20;
const INITIAL_OFFSET = (CARD_SIZE + CARD_GAP) * 1.3;
const OFFSET_Y = 128;


const navigateSound = new Howl({
    src: ['/sounds/menu.mp3'],
    volume: 0.3
});

const loadSound = new Howl({
    src: ['/sounds/home_menu_load.mp3'],
    volume: 0.3
});

const backgroundMusic = new Howl({
    src: ['/sounds/background.mp3'],
    loop: true,
    volume: 0.2
});

function App() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        loadSound.play();
        backgroundMusic.play();
    }, []);

    const navigate = (index: number) => {
        if (index === active) {
            return;
        }
        navigateSound.play();
        setActive(index);
    };

    const offsets = games.map((_, i) => {
        const leftOffset = INITIAL_OFFSET - ((CARD_SIZE + CARD_GAP) * active);
        const gapDiff = ACTIVE_CARD_GAP - CARD_GAP;

        let curX = leftOffset;

        if (i < active) {
            curX += i * (CARD_SIZE + CARD_GAP);
        } else if (i === active) {
            curX += i * (CARD_SIZE + CARD_GAP) + gapDiff;
        } else if (i > active) {
            curX += (i - 1) * (CARD_SIZE + CARD_GAP) + (ACTIVE_CARD_SIZE + ACTIVE_CARD_GAP + gapDiff);
        }

        return curX;
    });

    const textOffsetX = offsets[active] + ACTIVE_CARD_SIZE + ACTIVE_CARD_GAP;
    const textOffsetY = ACTIVE_CARD_SIZE * 0.78;

  return (
    <div className='w-screen h-screen bg-black flex flex-col relative overflow-hidden'>
        <CrossFader className='game-bg-container'>
            <div className='game-bg' style={{backgroundImage: `url("${games[active].bg ?? games[active].logo}")`}}>
            </div>
        </CrossFader>

        <div className='z-40'>
            {
                games.map((g, i) => {
                    const offset = offsets[i];

                    return <GameCard onClick={() => navigate(i)}
                                     active={i === active}
                                     style={{position: 'absolute', transform: `translateY(${OFFSET_Y}px) translateX(${offset}px)`}}
                                     key={g.name} {...g}
                    />
                })
            }
        </div>

        <div className='play-container'>
            <CrossFader>
                <div>
                    <h1>{games[active].name}</h1>
                    <button className='play-btn'>Play</button>
                </div>
            </CrossFader>
        </div>


        <div className='game-card-title z-50 text-white text-2xl whitespace-nowrap'
             style={{position: 'absolute', transform: `translateX(${textOffsetX}px) translateY(${textOffsetY + OFFSET_Y}px)`}}>
            <CrossFader><span>{games[active].name}</span></CrossFader>
        </div>
    </div>
  )
}

export default App;
