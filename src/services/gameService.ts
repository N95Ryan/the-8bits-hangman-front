export interface Game {
  id: string;
  lettersGuessed: string[];
  attemptsLeft: number;
  status: 'in_progress' | 'playing' | 'won' | 'lost';
  maskedWord: string;
  // Propriétés supplémentaires pour la compatibilité
  guesses?: string[];
  remaining?: number;
  hint?: string;
  score?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface LeaderboardEntry {
  player_id: string;
  player_name: string;
  score: number;
  word_length: number;
  remaining_attempts: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface GuessRequest {
  letter: string;
}

// URL de base de l'API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
// Force le mode simulation en développement local pour éviter les erreurs CORS
const USE_REAL_API = false; // Temporairement désactivé à cause des erreurs CORS

import { LIVES_BY_DIFFICULTY } from '@/constants/lives';
import type { Difficulty } from '@/constants/lives';

// Crée une nouvelle partie
export async function createNewGame(playerName: string = 'Player', difficulty: Difficulty = 'medium'): Promise<Game> {
  if (USE_REAL_API) {
    const response = await fetch(`${API_URL}/game/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la création d\'une nouvelle partie');
    }
    
    return response.json();
  } else {
    // Version simulée pour le développement sans backend
    console.log(`Creating new game for player: ${playerName} with difficulty: ${difficulty}`);
    return {
      id: Math.floor(Math.random() * 999999).toString(),
      lettersGuessed: [],
      attemptsLeft: LIVES_BY_DIFFICULTY[difficulty],
      status: 'playing',
      maskedWord: getRandomMaskedWord(difficulty),
      // Propriétés supplémentaires pour la compatibilité
      guesses: [],
      remaining: LIVES_BY_DIFFICULTY[difficulty],
      hint: '',
      score: 0,
      difficulty: difficulty
    };
  }
}

// Récupère l'état actuel d'une partie
export async function getGame(gameId: string): Promise<Game> {
  if (USE_REAL_API) {
    const response = await fetch(`${API_URL}/game/${gameId}`);
    
    if (!response.ok) {
      throw new Error('Partie non trouvée');
    }
    
    return response.json();
  } else {
    // Version simulée
    throw new Error('Non implémenté en mode simulation');
  }
}

// Fait une tentative de devinette
export async function makeGuess(gameId: string, letter: string, currentGame?: Game): Promise<Game> {
  if (USE_REAL_API) {
    const request: GuessRequest = { letter };
    
    const response = await fetch(`${API_URL}/game/${gameId}/guess`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la tentative');
    }
    
    return response.json();
  } else {
    // Version simulée pour le développement sans backend
    if (!currentGame) {
      throw new Error('Game state required for simulation');
    }
    return simulateGuess(letter, currentGame);
  }
}

// Liste de mots pour la simulation
const wordList = [
  "mario", "zelda", "link", "donkey", "pikachu",
  "sonic", "tetris", "pacman", "arcade", "retro",
  "console", "manette", "pixel", "sprite", "joystick"
];

// Mot actuel pour la simulation (choisi aléatoirement)
let currentSimulatedWord = '';

// Génère un mot masqué aléatoire pour la simulation selon la difficulté
function getRandomMaskedWord(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): string {
  // Filtrer les mots selon la difficulté
  let filteredWords = wordList;
  
  if (difficulty === 'easy') {
    // Mots courts (4-6 lettres)
    filteredWords = wordList.filter(word => word.length >= 4 && word.length <= 6);
  } else if (difficulty === 'medium') {
    // Mots moyens (7-9 lettres)
    filteredWords = wordList.filter(word => word.length >= 7 && word.length <= 9);
  } else {
    // Mots longs (10+ lettres)
    filteredWords = wordList.filter(word => word.length >= 10);
  }
  
  // Si aucun mot ne correspond aux critères, utiliser la liste complète
  if (filteredWords.length === 0) {
    filteredWords = wordList;
  }
  
  const randomIndex = Math.floor(Math.random() * filteredWords.length);
  currentSimulatedWord = filteredWords[randomIndex];
  return '_'.repeat(currentSimulatedWord.length);
}

// Simule une tentative de devinette
function simulateGuess(letter: string, game: Game): Game {
  // Vérifie si la lettre a déjà été devinée
  if (game.lettersGuessed.includes(letter)) {
    return { ...game };
  }

  // Copie le jeu actuel
  const updatedGame = { 
    ...game,
    lettersGuessed: [...game.lettersGuessed, letter]
  };

  // Vérifie si la lettre est dans le mot
  if (currentSimulatedWord.includes(letter)) {
    // Met à jour le mot masqué
    const maskedWordArray = updatedGame.maskedWord.split('');
    for (let i = 0; i < currentSimulatedWord.length; i++) {
      if (currentSimulatedWord[i] === letter) {
        maskedWordArray[i] = letter;
      }
    }
    updatedGame.maskedWord = maskedWordArray.join('');

    // Vérifie si le joueur a gagné
    if (!updatedGame.maskedWord.includes('_')) {
      updatedGame.status = 'won';
    }
  } else {
    // Lettre incorrecte, diminue le nombre de tentatives
    updatedGame.attemptsLeft -= 1;
    
    // Vérifie si le joueur a perdu
    if (updatedGame.attemptsLeft <= 0) {
      updatedGame.status = 'lost';
    }
  }

  return updatedGame;
}

// Récupère un indice pour la partie
export async function getHint(gameId: string): Promise<string> {
  if (USE_REAL_API) {
    const response = await fetch(`${API_URL}/game/${gameId}/hint`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération de l\'indice');
    }
    
    const data = await response.json();
    return data.hint || '';
  } else {
    // Version simulée - retourne un indice basé sur le mot actuel
    return `Le mot contient ${currentSimulatedWord.length} lettres et commence par "${currentSimulatedWord[0]}"`;
  }
}

// Abandonne la partie en cours
export async function abandonGame(gameId: string): Promise<void> {
  if (USE_REAL_API) {
    const response = await fetch(`${API_URL}/game/${gameId}/abandon`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de l\'abandon de la partie');
    }
  } else {
    // Version simulée - ne fait rien
    console.log('Game abandoned in simulation mode');
  }
}

// Récupère le classement
export async function getLeaderboard(difficulty?: string): Promise<LeaderboardEntry[]> {
  if (USE_REAL_API) {
    const url = difficulty ? `${API_URL}/leaderboard?difficulty=${difficulty}` : `${API_URL}/leaderboard`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du classement');
    }
    
    return response.json();
  } else {
    // Version simulée - retourne des données fictives
    return [
      {
        player_id: '1',
        player_name: 'Player1',
        score: 1000,
        word_length: 5,
        remaining_attempts: 3,
        difficulty: 'easy'
      },
      {
        player_id: '2',
        player_name: 'Player2',
        score: 800,
        word_length: 7,
        remaining_attempts: 1,
        difficulty: 'medium'
      },
      {
        player_id: '3',
        player_name: 'Player3',
        score: 600,
        word_length: 10,
        remaining_attempts: 0,
        difficulty: 'hard'
      }
    ];
  }
}

// Soumet un score au classement
export async function submitScore(gameId: string, userId: string): Promise<void> {
  if (USE_REAL_API) {
    const response = await fetch(`${API_URL}/score`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameId, userId }),
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la soumission du score');
    }
  } else {
    // Version simulée - ne fait rien
    console.log('Score submitted in simulation mode');
  }
}
