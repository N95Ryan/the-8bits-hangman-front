interface Game {
  id: string;
  lettersGuessed: string[];
  attemptsLeft: number;
  status: 'in_progress' | 'playing' | 'won' | 'lost';
  maskedWord: string;
}

interface GuessRequest {
  letter: string;
}

// URL de base de l'API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
// Force le mode simulation en développement local pour éviter les erreurs CORS
const USE_REAL_API = false; // Temporairement désactivé à cause des erreurs CORS

// Crée une nouvelle partie
export async function createNewGame(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): Promise<Game> {
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
    // Nombre de vies selon la difficulté
    const livesMap = {
      'easy': 5,
      'medium': 3,
      'hard': 2 
    };
    
    return {
      id: Math.floor(Math.random() * 999999).toString(),
      lettersGuessed: [],
      attemptsLeft: livesMap[difficulty],
      status: 'playing',
      maskedWord: getRandomMaskedWord(difficulty),
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
export async function makeGuess(gameId: string, letter: string, currentGame: Game): Promise<Game> {
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
