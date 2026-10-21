import { createContext, useContext, useState } from "react";

import {
  initialStats,
  type RefluxContextType,
  type RefluxStats,
  type Track,
  initialTrackData,
  PLAY_MODES,
  DIFFICULTY_LETTERS,
} from "@/lib/types";

const defaultContextValue: RefluxContextType = {
  headers: [],
  tracks: [],
  stats: { ...initialStats() },
  // @ts-ignore
  handleDragOver: (e) => {},
  // @ts-ignore
  handleDrop: (e) => {},
  // @ts-ignore
  handleFileChange: (e) => {},
  isTSVLoaded: () => false,
  isLoading: false,
  loadDemoData: () => {},
  isDemo: false,
};

const RefluxContext = createContext(defaultContextValue);

export function RefluxContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [headers, setHeaders] = useState<string[]>([]);
  const [loadedData, setLoadedData] = useState<Track[]>([]);
  const [stats, setStats] = useState<RefluxStats>({
    ...initialStats(),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  function reset() {
    setHeaders([]);
    setLoadedData([]);
    setIsLoading(false);
  }
  const [isDemo, setIsDemo] = useState<boolean>(false);
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    loadFile(file);
  }
  function handleDragOver(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
  }
  function handleDrop(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file) {
      return;
    }
    loadFile(file);
  }
  function loadFile(file: File) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text !== "string") {
        reset();
        return;
      }
      const result = parseTSV(text);
      if (typeof result === "boolean") {
        reset();
        return;
      }
      const [tsvHeaders, parseData, addUpStats] = [...result];
      setIsDemo(false);
      setHeaders(tsvHeaders);
      setLoadedData(parseData);
      setStats(addUpStats);
      setIsLoading(false);
    };
    setIsLoading(true);
    reader.readAsText(file, "UTF-8");
  }
  async function loadDemoData() {
    setIsLoading(true);
    const res = await fetch("./tracker.tsv");
    if (!res.ok) {
      reset();
      return;
    }
    const text = await res.text();
    const result = parseTSV(text);
    if (typeof result === "boolean") {
      reset();
      return;
    }
    const [tsvHeaders, parseData, addUpStats] = [...result];
    setIsDemo(true);
    setHeaders(tsvHeaders);
    setLoadedData(parseData);
    setStats(addUpStats);
    setIsLoading(false);
  }
  function isTSVLoaded() {
    return loadedData?.length > 0;
  }
  return (
    <RefluxContext.Provider
      value={{
        headers,
        tracks: loadedData,
        stats,
        handleFileChange,
        handleDragOver,
        handleDrop,
        isTSVLoaded,
        isLoading,
        loadDemoData,
        isDemo,
      }}
    >
      {children}
    </RefluxContext.Provider>
  );
}

function parseTSV(tsvText: string): boolean | [string[], Track[], RefluxStats] {
  const rows = tsvText.split(/\r?\n/).filter((row) => row.trim() !== "");
  if (rows.length === 0) {
    return false;
  }
  const tsvHeaders = rows[0].toLowerCase().replaceAll(" ", "_").split("\t");
  if (tsvHeaders.length !== 80) {
    return false;
  }
  const addUpStats: RefluxStats = { ...initialStats() };
  const parseData = rows.slice(1).map((row) => {
    const columns = row.split("\t");
    const rowObj: Track = { ...initialTrackData };
    tsvHeaders.forEach((header, index) => {
      rowObj[header] = columns[index];
    });
    addUpRefluxStats(rowObj, addUpStats);
    return rowObj;
  });
  return [tsvHeaders, parseData, addUpStats];
}

function addUpRefluxStats(data: Track, stats: RefluxStats) {
  PLAY_MODES.forEach((mode) => {
    DIFFICULTY_LETTERS.forEach((difficulty) => {
      const chart = mode + difficulty;
      if (chart === "dpb" || !data[`${chart}_note_count`]) {
        return;
      }
      const level = `${mode}_${data[`${chart}_rating`]}`;
      const lamp = getLampName(data[`${chart}_lamp`]);
      stats[level][lamp] += 1;
      stats[chart][lamp] += 1;
      if (data[`${chart}_lamp`] !== "NP") {
        const letter = `dj_${data[`${chart}_letter`].toLowerCase()}`;
        stats[level][letter] += 1;
        stats[chart][letter] += 1;
        const [letter_diff, score_diff, score_rate] = getScoreMetadata(
          +data[`${chart}_ex_score`],
          +data[`${chart}_note_count`],
        );
        data[`${chart}_score_rate`] = score_rate;
        data[`${chart}_letter_diff`] = letter_diff;
        data[`${chart}_score_diff`] = "" + score_diff;
        stats[level][letter_diff.toLowerCase()] += 1;
      }
    });
  });
}

function getLampName(refluxLamp: string) {
  switch (refluxLamp) {
    case "NP":
      return "no_play";
    case "F":
      return "failed";
    case "AC":
      return "assisted";
    case "EC":
      return "easy";
    case "NC":
      return "clear";
    case "HC":
      return "hard";
    case "EX":
      return "ex_hard";
    case "FC":
      return "full_combo";
  }
  return "no_play";
}

function getScoreMetadata(
  score: number,
  notes: number,
): [string, number, string] {
  const theoretical = notes * 2;
  const rate = score / theoretical;
  const percentage = (rate * 100).toFixed(2);
  let letter: string, diff: number;
  if (score === theoretical) {
    [letter, diff] = ["MAX", 0];
  } else if (rate >= 17.0 / 18.0) {
    [letter, diff] = ["MAX-", theoretical - score];
  } else if (rate >= 16.0 / 18.0) {
    [letter, diff] = [
      "AAA+",
      getScoreDiffByDJLevelThreshold(score, theoretical, 8.0, 9.0),
    ];
  } else if (rate >= 15.0 / 18.0) {
    [letter, diff] = [
      "AAA-",
      getScoreDiffByDJLevelThreshold(score, theoretical, 8.0, 9.0),
    ];
  } else if (rate >= 14.0 / 18.0) {
    [letter, diff] = [
      "AA+",
      getScoreDiffByDJLevelThreshold(score, theoretical, 7.0, 9.0),
    ];
  } else if (rate >= 13.0 / 18.0) {
    [letter, diff] = [
      "AA-",
      getScoreDiffByDJLevelThreshold(score, theoretical, 7.0, 9.0),
    ];
  } else if (rate >= 12.0 / 18.0) {
    [letter, diff] = [
      "A+",
      getScoreDiffByDJLevelThreshold(score, theoretical, 6.0, 9.0),
    ];
  } else if (rate >= 11.0 / 18.0) {
    [letter, diff] = [
      "A-",
      getScoreDiffByDJLevelThreshold(score, theoretical, 6.0, 9.0),
    ];
  } else if (rate >= 10.0 / 18.0) {
    [letter, diff] = [
      "B+",
      getScoreDiffByDJLevelThreshold(score, theoretical, 5.0, 9.0),
    ];
  } else if (rate >= 9.0 / 18.0) {
    [letter, diff] = [
      "B-",
      getScoreDiffByDJLevelThreshold(score, theoretical, 5.0, 9.0),
    ];
  } else if (rate >= 8.0 / 18.0) {
    [letter, diff] = [
      "C+",
      getScoreDiffByDJLevelThreshold(score, theoretical, 4.0, 9.0),
    ];
  } else if (rate >= 7.0 / 18.0) {
    [letter, diff] = [
      "C-",
      getScoreDiffByDJLevelThreshold(score, theoretical, 4.0, 9.0),
    ];
  } else if (rate >= 6.0 / 18.0) {
    [letter, diff] = [
      "D+",
      getScoreDiffByDJLevelThreshold(score, theoretical, 3.0, 9.0),
    ];
  } else if (rate >= 5.0 / 18.0) {
    [letter, diff] = [
      "D-",
      getScoreDiffByDJLevelThreshold(score, theoretical, 3.0, 9.0),
    ];
  } else if (rate >= 4.0 / 18.0) {
    [letter, diff] = [
      "E+",
      getScoreDiffByDJLevelThreshold(score, theoretical, 2.0, 9.0),
    ];
  } else {
    [letter, diff] = [
      "E-",
      getScoreDiffByDJLevelThreshold(score, theoretical, 2.0, 9.0),
    ];
  }
  return [letter, diff, percentage];
}

export function getScoreDiffByDJLevelThreshold(
  score: number,
  theoretical: number,
  numerator: number,
  denominator: number,
) {
  const threshold = Math.ceil(theoretical * (numerator / denominator));
  return Math.abs(score - threshold);
}

export function useRefluxContext() {
  return useContext(RefluxContext);
}
