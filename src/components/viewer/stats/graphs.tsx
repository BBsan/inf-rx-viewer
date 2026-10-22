import type { CSSProperties } from "react";
import {
  initialStatsDetail,
  type RefluxStats,
  type StatsDetail,
} from "@/lib/types";

export function TotalGraph({
  mode,
  data,
}: {
  mode: string;
  data: RefluxStats;
}) {
  const stats: StatsDetail = { ...initialStatsDetail };
  for (let i = 1; i <= 12; i++) {
    stats.no_play += data[`${mode}_${i}`].no_play;
    stats.failed += data[`${mode}_${i}`].failed;
    stats.assisted += data[`${mode}_${i}`].assisted;
    stats.easy += data[`${mode}_${i}`].easy;
    stats.clear += data[`${mode}_${i}`].clear;
    stats.hard += data[`${mode}_${i}`].hard;
    stats.ex_hard += data[`${mode}_${i}`].ex_hard;
    stats.full_combo += data[`${mode}_${i}`].full_combo;
    stats.dj_f += data[`${mode}_${i}`].dj_f;
    stats.dj_e += data[`${mode}_${i}`].dj_e;
    stats.dj_d += data[`${mode}_${i}`].dj_d;
    stats.dj_c += data[`${mode}_${i}`].dj_c;
    stats.dj_b += data[`${mode}_${i}`].dj_b;
    stats.dj_a += data[`${mode}_${i}`].dj_a;
    stats.dj_aa += data[`${mode}_${i}`].dj_aa;
    stats.dj_aaa += data[`${mode}_${i}`].dj_aaa;
  }
  return (
    <div className="select-none flex flex-row gap-4">
      <div>
        <span className="text-3xl">DJ Level</span>
        <GraphPanel>
          <LetterBarGraph data={stats} />
        </GraphPanel>
      </div>
      <div>
        <span className="text-3xl">Clear Lamp</span>
        <GraphPanel>
          <LampBarGraph data={stats} />
        </GraphPanel>
      </div>
    </div>
  );
}

export function ByLevelGraph({
  mode,
  data,
}: {
  mode: string;
  data: RefluxStats;
}) {
  const stats = {} as RefluxStats;
  for (let i = 1; i <= 12; i++) {
    stats[`${mode}_${i}`] = { ...data[`${mode}_${i}`] };
  }
  return (
    <div className="select-none flex flex-row gap-4">
      <div>
        <span className="text-3xl">DJ Level</span>
        <GraphPanel>
          {Object.keys(stats).map((key) => {
            return (
              <LetterBarGraph
                key={`letter-graph-${key}`}
                data={stats[key]}
                label={`★${key.split("_")[1]}`}
              />
            );
          })}
        </GraphPanel>
      </div>
      <div>
        <span className="text-3xl">Clear Lamp</span>
        <GraphPanel>
          {Object.keys(stats).map((key) => {
            return (
              <LampBarGraph
                key={`lamp-graph-${key}`}
                data={stats[key]}
                label={`★${key.split("_")[1]}`}
              />
            );
          })}
        </GraphPanel>
      </div>
    </div>
  );
}

export function ByChartGraph({
  mode,
  data,
}: {
  mode: string;
  data: RefluxStats;
}) {
  const stats = {} as RefluxStats;
  if (mode === "sp") {
    stats[`${mode}b`] = { ...data[`${mode}b`] };
  }
  stats[`${mode}n`] = { ...data[`${mode}n`] };
  stats[`${mode}h`] = { ...data[`${mode}h`] };
  stats[`${mode}a`] = { ...data[`${mode}a`] };
  stats[`${mode}l`] = { ...data[`${mode}l`] };
  return (
    <div className="select-none flex flex-row gap-4">
      <div>
        <span className="text-3xl">DJ Level</span>
        <GraphPanel>
          {Object.keys(stats).map((key) => {
            return (
              <LetterBarGraph
                key={`letter-graph-${key}`}
                data={stats[key]}
                label={key.toUpperCase()}
              />
            );
          })}
        </GraphPanel>
      </div>
      <div>
        <span className="text-3xl">Clear Lamp</span>
        <GraphPanel>
          {Object.keys(stats).map((key) => {
            return (
              <LampBarGraph
                key={`lamp-graph-${key}`}
                data={stats[key]}
                label={key.toUpperCase()}
              />
            );
          })}
        </GraphPanel>
      </div>
    </div>
  );
}

function GraphPanel({ children }: { children?: React.ReactNode }) {
  return (
    <div className="bg-(image:--track-item-bg) rounded-lg p-4 flex flex-col gap-2">
      {children}
    </div>
  );
}

const GRAPH_WIDTH = 468;
function StatsGraphFrame({ children }: { children?: React.ReactNode }) {
  return (
    <div
      style={{ width: `${GRAPH_WIDTH}px` }}
      className="bg-gray-900 relative flex flex-row"
    >
      <div
        style={{ "--target-width": `${GRAPH_WIDTH}px` } as CSSProperties}
        className="score-bar flex flex-row content-start"
      >
        {children}
      </div>
    </div>
  );
}

function BarSegment({
  numerator,
  denominator,
  type,
}: {
  numerator: number;
  denominator: number;
  type: string;
}) {
  return (
    <div
      style={{
        width: `${GRAPH_WIDTH * (numerator / denominator)}px`,
      }}
      className={`bg-${type}`}
    >
      &nbsp;
    </div>
  );
}

function getGraphDenominator(arg: { [x: string]: number }) {
  return Object.values(arg).reduce((sum, value) => sum + value, 0);
}

function LampBarGraph({ data, label }: { data?: StatsDetail; label?: string }) {
  if (!data) {
    return null;
  }
  const { no_play, failed, assisted, easy, clear, hard, ex_hard, full_combo } =
    data;
  const denominator = getGraphDenominator({
    no_play,
    failed,
    assisted,
    easy,
    clear,
    hard,
    ex_hard,
    full_combo,
  });
  return (
    <div className="flex flex-row">
      {label && <span className="w-8">{label}</span>}
      <StatsGraphFrame>
        <BarSegment
          numerator={full_combo}
          denominator={denominator}
          type="fc"
        />
        <BarSegment
          numerator={ex_hard}
          denominator={denominator}
          type="ex-hard"
        />
        <BarSegment numerator={hard} denominator={denominator} type="hard" />
        <BarSegment numerator={clear} denominator={denominator} type="clear" />
        <BarSegment numerator={easy} denominator={denominator} type="easy" />
        <BarSegment
          numerator={assisted}
          denominator={denominator}
          type="assisted"
        />
        <BarSegment
          numerator={failed}
          denominator={denominator}
          type="failed"
        />
        <BarSegment
          numerator={no_play}
          denominator={denominator}
          type="no-play"
        />
      </StatsGraphFrame>
    </div>
  );
}

function LetterBarGraph({
  data,
  label,
}: {
  data?: StatsDetail;
  label?: string;
}) {
  if (!data) {
    return null;
  }
  const { no_play, dj_f, dj_e, dj_d, dj_c, dj_b, dj_a, dj_aa, dj_aaa } = data;
  console.log(no_play);
  
  const denominator = getGraphDenominator({
    no_play,
    dj_f,
    dj_e,
    dj_d,
    dj_c,
    dj_b,
    dj_a,
    dj_aa,
    dj_aaa,
  });
  return (
    <div className="flex flex-row">
      {label && <span className="w-8">{label}</span>}
      <StatsGraphFrame>
        <BarSegment numerator={dj_aaa} denominator={denominator} type="aaa" />
        <BarSegment numerator={dj_aa} denominator={denominator} type="aa" />
        <BarSegment numerator={dj_a} denominator={denominator} type="a" />
        <BarSegment numerator={dj_b} denominator={denominator} type="b" />
        <BarSegment numerator={dj_c} denominator={denominator} type="c" />
        <BarSegment numerator={dj_d} denominator={denominator} type="d" />
        <BarSegment numerator={dj_e} denominator={denominator} type="e" />
        <BarSegment numerator={dj_f} denominator={denominator} type="f" />
        <BarSegment numerator={no_play} denominator={denominator} type="no_play" />
      </StatsGraphFrame>
    </div>
  );
}
