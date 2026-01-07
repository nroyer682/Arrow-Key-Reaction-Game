import { describe, it, expect } from 'vitest';
import { incrementScore, loseLife, startCountdown } from './script';

describe('Game Functions', () => {
  it('incrementScore should add 10 points', () => {
    incrementScore();
    const scoreDisplay = document.querySelector('.score');
    expect(scoreDisplay.textContent).toBe('Score: 10');
  });

  it('loseLife should decrease lives by 1', () => {
    loseLife();
    const livesDisplay = document.querySelector('.lives');
    expect(livesDisplay.textContent).toBe('Lives: ❤️❤️');
  });

  it('startCountdown should start at 3', () => {
    const callback = vi.fn();
    startCountdown(callback);
    const countdown = document.querySelector('.countdown');
    expect(countdown.textContent).toBe('3');
  });


});