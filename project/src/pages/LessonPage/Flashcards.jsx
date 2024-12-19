import React, { memo } from 'react';
import {
  FlashcardsSection,
  FlashcardContainer,
  Flashcard,
  CardFront,
  CardBack
} from './style';

const Flashcards = memo(({ flashcards, flippedCards, onFlipCard }) => {
  return (
    <FlashcardsSection>
      <h3>Review Flashcards</h3>
      {flashcards.map((card, index) => (
        <FlashcardContainer key={index}>
          <Flashcard
            isFlipped={flippedCards[index]}
            onClick={() => onFlipCard(index)}
          >
            <CardFront isFront={true}>
              <h4>{card.front}</h4>
            </CardFront>
            <CardBack>
              <p>{card.back}</p>
            </CardBack>
          </Flashcard>
        </FlashcardContainer>
      ))}
    </FlashcardsSection>
  );
});

export default memo(Flashcards);