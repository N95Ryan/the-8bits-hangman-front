import { useState, useCallback, useEffect } from 'react';
import { 
  createNewGame, 
  makeGuess, 
  getHint, 
  getGame,
  abandonGame,
  getLeaderboard,
  submitScore,
  type Game,
  type LeaderboardEntry
} from '@/services/gameService';
import { isAuthenticated } from '@/services/api';
import { LIVES_BY_DIFFICULTY } from '@/constants/lives';
import type { Difficulty, GameStatus } from '@/constants/lives';

export interface HangmanGameState {
  gameId: string;
  maskedWord: string;
  guessedLetters: string[];
  lives: number;
  maxLives: number;
  difficulty: Difficulty;
  gameStatus: GameStatus;
  hint: string;
  showHint: boolean;
  isLoading: boolean;
  score: number;
  playerName: string;
  leaderboard: LeaderboardEntry[];
  isAuthenticated: boolean;
}

export function useHangmanGame() {
  const [state, setState] = useState<HangmanGameState>({
    gameId: '',
    maskedWord: '',
    guessedLetters: [],
    lives: LIVES_BY_DIFFICULTY.medium,
    maxLives: LIVES_BY_DIFFICULTY.medium,
    difficulty: 'medium',
    gameStatus: 'in_progress',
    hint: '',
    showHint: false,
    isLoading: false,
    score: 0,
    playerName: 'Player',
    leaderboard: [],
    isAuthenticated: isAuthenticated()
  });

  // Function to update game state from API response
  const updateGameState = useCallback((gameData: Game) => {
    setState(prevState => ({
      ...prevState,
      gameId: gameData.id,
      maskedWord: gameData.maskedWord,
      guessedLetters: gameData.guesses || gameData.lettersGuessed || [],
      lives: gameData.remaining || gameData.attemptsLeft || prevState.lives,
      gameStatus: gameData.status,
      hint: gameData.hint || prevState.hint,
      score: gameData.score || 0,
      difficulty: gameData.difficulty || prevState.difficulty,
      isLoading: false
    }));
  }, []);

  // Start a new game
  const startNewGame = useCallback(async (
    playerName: string = 'Player',
    selectedDifficulty: Difficulty = 'medium'
  ) => {
    try {
      setState(prevState => ({ 
        ...prevState, 
        isLoading: true,
        playerName: playerName 
      }));
      
      const maxLives = LIVES_BY_DIFFICULTY[selectedDifficulty];
      
      const newGame = await createNewGame(playerName, selectedDifficulty);
      
      setState(prevState => ({
        ...prevState,
        gameId: newGame.id,
        maskedWord: newGame.maskedWord,
        guessedLetters: newGame.guesses || newGame.lettersGuessed || [],
        lives: newGame.remaining || newGame.attemptsLeft || maxLives,
        maxLives,
        difficulty: selectedDifficulty,
        gameStatus: newGame.status,
        hint: newGame.hint || '',
        showHint: false,
        isLoading: false,
        score: newGame.score || 0
      }));
      
      return newGame;
    } catch (error) {
      console.error('Error creating new game:', error);
      setState(prevState => ({ ...prevState, isLoading: false }));
      throw error;
    }
  }, []);

  // Récupérer une partie existante
  const fetchGame = useCallback(async (gameId: string) => {
    try {
      setState(prevState => ({ ...prevState, isLoading: true }));
      
      const game = await getGame(gameId);
      updateGameState(game);
      
      return game;
    } catch (error) {
      console.error('Erreur lors de la récupération de la partie:', error);
      setState(prevState => ({ ...prevState, isLoading: false }));
      throw error;
    } finally {
      setState(prevState => ({ ...prevState, isLoading: false }));
    }
  }, [updateGameState]);

  // Fetch leaderboard data
  const fetchLeaderboard = useCallback(async (difficulty?: string) => {
    try {
      setState(prevState => ({ ...prevState, isLoading: true }));
      const leaderboardData = await getLeaderboard(difficulty);
      setState(prevState => ({ 
        ...prevState, 
        leaderboard: leaderboardData,
        isLoading: false 
      }));
      return leaderboardData;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setState(prevState => ({ ...prevState, isLoading: false }));
      throw error;
    }
  }, []);

  // Make a letter guess
  const handleGuess = useCallback(async (letter: string) => {
    if (state.gameStatus !== 'in_progress' || state.isLoading) return;

    try {
      setState(prevState => ({ ...prevState, isLoading: true }));

      const updatedGame = await makeGuess(state.gameId, letter, {
        id: state.gameId,
        lettersGuessed: state.guessedLetters,
        attemptsLeft: state.lives,
        status: state.gameStatus,
        maskedWord: state.maskedWord,
        guesses: state.guessedLetters,
        remaining: state.lives,
        hint: state.hint,
        score: state.score,
        difficulty: state.difficulty
      });
      updateGameState(updatedGame);

      // If game ended, fetch leaderboard
      if (updatedGame.status === 'won' || updatedGame.status === 'lost') {
        fetchLeaderboard();
      }
      
      return updatedGame;
    } catch (error) {
      console.error('Error making guess:', error);
      setState(prevState => ({ ...prevState, isLoading: false }));
      throw error;
    }
  }, [state.gameId, state.gameStatus, state.isLoading, state.difficulty, state.guessedLetters, state.hint, state.lives, state.maskedWord, state.score, updateGameState, fetchLeaderboard]);

  // Get a hint
  const fetchHint = useCallback(async () => {
    if (!state.gameId || state.gameStatus !== 'in_progress') return;

    try {
      setState(prevState => ({ ...prevState, isLoading: true }));
      const hintText = await getHint(state.gameId);
      
      setState(prevState => ({ 
        ...prevState, 
        hint: hintText,
        showHint: true,
        isLoading: false
      }));
      
      return hintText;
    } catch (error) {
      console.error('Error fetching hint:', error);
      setState(prevState => ({ ...prevState, isLoading: false }));
      throw error;
    }
  }, [state.gameId, state.gameStatus]);

  // Abandon current game
  const handleAbandonGame = useCallback(async () => {
    if (!state.gameId) return;

    try {
      setState(prevState => ({ ...prevState, isLoading: true }));
      await abandonGame(state.gameId);
      setState(prevState => ({ 
        ...prevState, 
        gameStatus: 'lost',
        isLoading: false
      }));
      
      // Fetch leaderboard after abandoning
      fetchLeaderboard();
    } catch (error) {
      console.error('Error abandoning game:', error);
      setState(prevState => ({ ...prevState, isLoading: false }));
      throw error;
    }
  }, [state.gameId, fetchLeaderboard]);

  // Reset game state
  const resetGame = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      gameId: '',
      maskedWord: '',
      guessedLetters: [],
      lives: LIVES_BY_DIFFICULTY.medium,
      maxLives: LIVES_BY_DIFFICULTY.medium,
      difficulty: 'medium',
      gameStatus: 'in_progress',
      hint: '',
      showHint: false,
      isLoading: false,
      score: 0
    }));
  }, []);

  // Basculer l'affichage de l'indice
  const toggleHint = useCallback(() => {
    setState(prevState => ({ ...prevState, showHint: !prevState.showHint }));
  }, []);

  // Submit score to leaderboard
  const handleSubmitScore = useCallback(async (userId: string) => {
    if (!state.gameId || state.gameStatus !== 'won') return;

    try {
      setState(prevState => ({ ...prevState, isLoading: true }));
      await submitScore(state.gameId, userId);
      // Refresh leaderboard after submitting score
      await fetchLeaderboard();
    } catch (error) {
      console.error('Error submitting score:', error);
      setState(prevState => ({ ...prevState, isLoading: false }));
      throw error;
    }
  }, [state.gameId, state.gameStatus, fetchLeaderboard]);

  // Update authentication status when it changes
  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      isAuthenticated: isAuthenticated()
    }));
  }, []);

  return {
    ...state,
    startNewGame,
    fetchGame,
    handleGuess,
    fetchHint,
    handleAbandonGame,
    resetGame,
    toggleHint,
    fetchLeaderboard,
    handleSubmitScore
  };
}
