interface Game {
  id: string;
  lettersGuessed: string[];
  attemptsLeft: number;
  status: 'playing' | 'won' | 'lost';
  maskedWord: string;
}

interface GuessRequest {
  letter: string;
}

// URL de base de l'API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const USE_REAL_API = import.meta.env.VITE_USE_REAL_API === 'true';

// Crée une nouvelle partie
export async function createNewGame(): Promise<Game> {
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
    return {
      id: Math.floor(Math.random() * 999999).toString(),
      lettersGuessed: [],
      attemptsLeft: 6,
      status: 'playing',
      maskedWord: getRandomMaskedWord(),
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

// Génère un mot masqué aléatoire pour la simulation
function getRandomMaskedWord(): string {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  currentSimulatedWord = wordList[randomIndex];
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
