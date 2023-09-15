import {GameCard} from "../GameCard/GameCard.tsx";
import {Game} from "../types/game.ts";
import {ACTIVE_CARD_GAP, ACTIVE_CARD_SIZE, CARD_GAP, CARD_SIZE, CARDS_OFFSET_X, CARDS_OFFSET_Y} from "../constants.ts";

interface GameCardsListProps {
    games: Game[];
    activeIndex: number;
    navigate?: (index: number) => void;
}

export function GameCardsList({games, activeIndex = 0, navigate}: GameCardsListProps) {
    const offsets = games.map((_, i) => {
        const leftOffset = CARDS_OFFSET_X - ((CARD_SIZE + CARD_GAP) * activeIndex);
        const gapDiff = ACTIVE_CARD_GAP - CARD_GAP;

        let curX = leftOffset;

        if (i < activeIndex) {
            curX += i * (CARD_SIZE + CARD_GAP);
        } else if (i === activeIndex) {
            curX += i * (CARD_SIZE + CARD_GAP) + gapDiff;
        } else if (i > activeIndex) {
            curX += (i - 1) * (CARD_SIZE + CARD_GAP) + (ACTIVE_CARD_SIZE + ACTIVE_CARD_GAP + gapDiff);
        }

        return curX;
    });
    return <>
        {
            games.map((g, i) => {
                const offset = offsets[i];

                return <GameCard onClick={() => navigate?.(i)}
                                 active={i === activeIndex}
                                 style={{position: 'absolute', transform: `translateY(${CARDS_OFFSET_Y}px) translateX(${offset}px)`}}
                                 key={g.name} {...g}
                />
            })
        }
    </>
}
