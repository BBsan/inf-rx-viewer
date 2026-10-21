import type { CSSProperties } from "react";

import {
  DIFFICULTY_LETTERS,
  type Chart,
  type DifficultyLetter,
  type PlayMode,
  type Track,
} from "@/lib/types";

export default function TrackListItem({
  data,
  mode,
}: {
  data?: Partial<Track>;
  mode: PlayMode;
}) {
  if (!data) {
    return null;
  }
  return (
    <div className="bg-(image:--track-item-bg) p-2 px-4 rounded-lg select-none">
      <span className="text-3xl">{data.title}</span>
      {DIFFICULTY_LETTERS.map((letter) => (
        <ChartScore
          key={`vis-${letter}`}
          data={data}
          mode={mode}
          letter={letter}
        />
      ))}
    </div>
  );
}

function ChartScore({
  data,
  mode,
  letter,
}: {
  data: Partial<Track>;
  mode: PlayMode;
  letter: DifficultyLetter;
}) {
  const chart = (mode + letter) as "dpb" & Chart;
  if (chart === "dpb" || !data[`${chart}_rating`]) {
    return null;
  }
  if (data[`${chart}_lamp`] === "NP") {
    return (
      <ScoreDetail
        chart={chart}
        rating={data[`${chart}_rating`] as string}
        lamp={data[`${chart}_lamp`] as string}
        letter="-"
        missCount="-"
      />
    );
  }
  return (
    <ScoreDetail
      chart={chart}
      rating={data[`${chart}_rating`] as string}
      lamp={data[`${chart}_lamp`] as string}
      letter={data[`${chart}_letter`] as string}
      missCount={data[`${chart}_miss_count`] as string}
      score={data[`${chart}_ex_score`]}
      scoreRate={data[`${chart}_score_rate`]}
      letterDiff={data[`${chart}_letter_diff`]}
      scoreDiff={data[`${chart}_score_diff`]}
    />
  );
}

function ScoreDetail({
  chart,
  rating,
  lamp,
  letter,
  missCount,
  score,
  scoreRate,
  letterDiff,
  scoreDiff,
}: {
  chart: Chart;
  rating: string;
  lamp: string;
  letter: string;
  missCount: string;
  score?: string;
  scoreRate?: string;
  letterDiff?: string;
  scoreDiff?: string;
}) {
  return (
    <div className="flex flex-row gap-2 py-0.5">
      <span className={`w-7 ${getDifficultyCssName(chart)}`}>★{rating}</span>
      <span className="w-16">{getClearLampFullName(lamp)}</span>
      <div className={`w-67 bg-gray-900 relative`}>
        <ScoreBar
          chart={chart}
          score={score}
          scoreRate={scoreRate}
          letterDiff={letterDiff}
          scoreDiff={scoreDiff}
        />
      </div>
      <span className="w-8">{letter}</span>
      <span className="w-16">Miss: {missCount}</span>
    </div>
  );
}

const BAR_LENGTH = 268;
const AAA_BORDER = BAR_LENGTH - BAR_LENGTH * (8 / 9);
const AA_BORDER = BAR_LENGTH - BAR_LENGTH * (7 / 9);
const A_BORDER = BAR_LENGTH - BAR_LENGTH * (6 / 9);

function ScoreBar({
  chart,
  score,
  scoreRate,
  letterDiff,
  scoreDiff,
}: {
  chart: Chart;
  score?: string;
  scoreRate?: string;
  letterDiff?: string;
  scoreDiff?: string;
}) {
  if (!score || !scoreRate || !letterDiff || !scoreDiff) {
    return <ScoreLetterTick />;
  }
  const barWidth = BAR_LENGTH * (+scoreRate / 100);
  return (
    <>
      <ScoreLetterTick />;
      <div
        style={
          {
            backgroundColor: `var(--${getDifficultyCssName(chart)}-bg-color)`,
            width: `${barWidth}px`,
            "--target-width": `${barWidth}px`,
          } as CSSProperties
        }
        className="score-bar text-nowrap overflow-hidden flex flex-row justify-between px-1 absolute top-0 left-0"
      >
        <div className="flex flex-row gap-2">
          <span className="w-9">{score}</span>
          <span>{scoreRate}%</span>
        </div>
        <span>
          {letterDiff} {scoreDiff}
        </span>
      </div>
    </>
  );
}

function ScoreLetterTick() {
  return (
    <>
      <div
        style={{ width: `${AAA_BORDER}px` }}
        className="absolute top-0 right-0 border-l border-gray-700"
      >
        &nbsp;
      </div>
      <div
        style={{ width: `${AA_BORDER}px` }}
        className="absolute top-0 right-0 border-l border-gray-700"
      >
        &nbsp;
      </div>
      <div
        style={{ width: `${A_BORDER}px` }}
        className="absolute top-0 right-0 border-l border-gray-700"
      >
        &nbsp;
      </div>
    </>
  );
}

function getDifficultyCssName(chart: Chart) {
  switch (chart) {
    case "spb":
      return "beginner";
    case "spn":
    case "dpn":
      return "normal";
    case "sph":
    case "dph":
      return "hyper";
    case "spa":
    case "dpa":
      return "another";
    case "spl":
    case "dpl":
      return "leggendaria";
  }
}

function getClearLampFullName(lamp: string) {
  switch (lamp) {
    case "F":
      return <span className="failed">FAILED</span>;
    case "AC":
      return <span className="assisted">A-CLEAR</span>;
    case "EC":
      return <span className="easy">E-CLEAR</span>;
    case "NC":
      return <span className="clear">CLEAR</span>;
    case "HC":
      return <span className="hard">H-CLEAR</span>;
    case "EX":
      return <span className="ex-hard">EX-CLEAR</span>;
    case "FC":
      return <span className="fc">F-COMBO</span>;
  }
  return <span className="no-play">NO PLAY</span>;
}
