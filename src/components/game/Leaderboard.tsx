import { useState } from "react";
import type { LeaderboardEntry } from "@/services/gameService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
}

export function Leaderboard({ leaderboard }: LeaderboardProps) {
  const [filter, setFilter] = useState<string>("all");

  // Filter leaderboard entries by difficulty
  const filteredLeaderboard =
    filter === "all"
      ? leaderboard
      : leaderboard.filter((entry) => entry.difficulty === filter);

  // Sort by score (descending)
  const sortedLeaderboard = [...filteredLeaderboard].sort(
    (a, b) => b.score - a.score
  );

  // Get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/20 text-green-500";
      case "medium":
        return "bg-blue-500/20 text-blue-500";
      case "hard":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-gray-500/20 text-gray-500";
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Leaderboard</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm">Filter:</span>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {sortedLeaderboard.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No scores available for this difficulty level.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-left">Rank</th>
                <th className="py-2 px-4 text-left">Player</th>
                <th className="py-2 px-4 text-left">Score</th>
                <th className="py-2 px-4 text-left">Word</th>
                <th className="py-2 px-4 text-left">Lives</th>
                <th className="py-2 px-4 text-left">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {sortedLeaderboard.map((entry, index) => (
                <tr
                  key={`${entry.player_id}-${index}`}
                  className="border-b border-gray-800 hover:bg-gray-800/50"
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4 font-medium">{entry.player_name}</td>
                  <td className="py-2 px-4 font-bold text-amber-400">
                    {entry.score}
                  </td>
                  <td className="py-2 px-4">{entry.word_length} letters</td>
                  <td className="py-2 px-4">
                    {entry.remaining_attempts} /
                    {entry.difficulty === "easy"
                      ? 8
                      : entry.difficulty === "hard"
                      ? 5
                      : 6}
                  </td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(
                        entry.difficulty
                      )}`}
                    >
                      {entry.difficulty}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
