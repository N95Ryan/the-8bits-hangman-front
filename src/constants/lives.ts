/**
 * Constantes partagées pour le jeu du pendu
 */

// Nombre de vies par difficulté
export const LIVES_BY_DIFFICULTY = {
  easy: 5,
  medium: 3,
  hard: 2,
} as const;

// Types pour la difficulté
export type Difficulty = keyof typeof LIVES_BY_DIFFICULTY;

// Statuts de jeu possibles
export const GAME_STATUS = {
  PLAYING: 'playing',
  WON: 'won',
  LOST: 'lost',
  IN_PROGRESS: 'in_progress',
} as const;

export type GameStatus = typeof GAME_STATUS[keyof typeof GAME_STATUS];
