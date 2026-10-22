import type { CSSProperties } from "react";
import { Link } from "@tanstack/react-router";

import {
  initialStatsDetail,
  type RefluxStats,
  type StatsDetail,
} from "@/lib/types";
import Table from "@/components/UI/table";

export function SubdivideStatsTable({
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
    <Table>
      <thead>
        <Table.TR>
          <Table.TH className="w-16">LEVEL</Table.TH>
          <Table.TH className="w-16">E-</Table.TH>
          <Table.TH className="w-16">E+</Table.TH>
          <Table.TH className="w-16">D-</Table.TH>
          <Table.TH className="w-16">D+</Table.TH>
          <Table.TH className="w-16">C-</Table.TH>
          <Table.TH className="w-16">C+</Table.TH>
          <Table.TH className="w-16">B-</Table.TH>
          <Table.TH className="w-16">B+</Table.TH>
          <Table.TH className="w-16">A-</Table.TH>
          <Table.TH className="w-16">A+</Table.TH>
          <Table.TH className="w-16">AA-</Table.TH>
          <Table.TH className="w-16">AA+</Table.TH>
          <Table.TH className="w-16">AAA-</Table.TH>
          <Table.TH className="w-16">AAA+</Table.TH>
          <Table.TH className="w-16">MAX-</Table.TH>
          <Table.TH className="w-16">MAX</Table.TH>
        </Table.TR>
      </thead>
      <tbody>
        {Object.keys(stats).map((key) => {
          const rating = key.split("_")[1];
          const firstCell = "★" + rating;
          return (
            <Table.TR key={`subdivide-${key}`}>
              <Table.TD center>{firstCell}</Table.TD>
              <Table.TD center>
                <FilterLink mode={mode} rating={rating} letter="e-">
                  {stats[key]?.["e-"]}
                </FilterLink>
              </Table.TD>
              <Table.TD center>
                <FilterLink mode={mode} rating={rating} letter="e+">
                  {stats[key]?.["e+"]}
                </FilterLink>
              </Table.TD>
              <Table.TD center>
                <FilterLink mode={mode} rating={rating} letter="d-">
                  {stats[key]?.["d-"]}
                </FilterLink>
              </Table.TD>
              <Table.TD center>
                <FilterLink mode={mode} rating={rating} letter="d+">
                  {stats[key]?.["d+"]}
                </FilterLink>
              </Table.TD>
              <Table.TD center>
                <FilterLink mode={mode} rating={rating} letter="c-">
                  {stats[key]?.["c-"]}
                </FilterLink>
              </Table.TD>
              <Table.TD center>
                <FilterLink mode={mode} rating={rating} letter="c+">
                  {stats[key]?.["c+"]}
                </FilterLink>
              </Table.TD>
              <Table.TD center>
                <FilterLink mode={mode} rating={rating} letter="b-">
                  {stats[key]?.["b-"]}
                </FilterLink>
              </Table.TD>
              <Table.TD center>
                <FilterLink mode={mode} rating={rating} letter="b+">
                  {stats[key]?.["b+"]}
                </FilterLink>
              </Table.TD>
              <Table.TD center>
                <FilterLink mode={mode} rating={rating} letter="a-">
                  {stats[key]?.["a-"]}
                </FilterLink>
              </Table.TD>
              <Table.TD center>
                <FilterLink mode={mode} rating={rating} letter="a+">
                  {stats[key]?.["a+"]}
                </FilterLink>
              </Table.TD>
              <Table.TD center>
                <FilterLink mode={mode} rating={rating} letter="aa-">
                  {stats[key]?.["aa-"]}
                </FilterLink>
              </Table.TD>
              <Table.TD center>
                <FilterLink mode={mode} rating={rating} letter="aa+">
                  {stats[key]?.["aa+"]}
                </FilterLink>
              </Table.TD>
              <Table.TD center>
                <FilterLink mode={mode} rating={rating} letter="aaa-">
                  {stats[key]?.["aaa-"]}
                </FilterLink>
              </Table.TD>
              <Table.TD center>
                <FilterLink mode={mode} rating={rating} letter="aaa+">
                  {stats[key]?.["aaa+"]}
                </FilterLink>
              </Table.TD>
              <Table.TD center>
                <FilterLink mode={mode} rating={rating} letter="max-">
                  {stats[key]?.["max-"]}
                </FilterLink>
              </Table.TD>
              <Table.TD center>
                <FilterLink mode={mode} rating={rating} letter="max">
                  {stats[key]?.max}
                </FilterLink>
              </Table.TD>
            </Table.TR>
          );
        })}
      </tbody>
    </Table>
  );
}

export function TotalTable({
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
    <div className="flex flex-col gap-4 justify-start items-start">
      <div>
        <h3 className="text-3xl">DJ Level</h3>
        <StatsCommonTable
          mode={mode}
          data={{ total: stats }}
          dataType="dj-level"
        />
      </div>
      <div>
        <h3 className="text-3xl">Clear Lamp</h3>
        <StatsCommonTable mode={mode} data={{ total: stats }} dataType="lamp" />
      </div>
    </div>
  );
}

export function ByLevelTable({
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
    <div className="flex flex-col gap-4 justify-start items-start">
      <div>
        <h3 className="text-3xl">DJ Level</h3>
        <StatsCommonTable
          mode={mode}
          data={stats}
          dataType="dj-level"
          view="level"
        />
      </div>
      <div>
        <h3 className="text-3xl">Clear Lamp</h3>
        <StatsCommonTable
          mode={mode}
          data={stats}
          dataType="lamp"
          view="level"
        />
      </div>
    </div>
  );
}

export function ByChartTable({
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
    <div className="flex flex-col gap-4 justify-start items-start">
      <div>
        <h3 className="text-3xl">DJ Level</h3>
        <StatsCommonTable
          mode={mode}
          data={stats}
          dataType="dj-level"
          view="chart"
        />
      </div>
      <div>
        <h3 className="text-3xl">Clear Lamp</h3>
        <StatsCommonTable
          mode={mode}
          data={stats}
          dataType="lamp"
          view="chart"
        />
      </div>
    </div>
  );
}

function FilterLink({
  mode,
  rating,
  difficulty,
  letter,
  lamp,
  children,
}: {
  mode: string;
  rating?: string;
  difficulty?: string;
  letter?: string;
  lamp?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      to="/viewer/score/$mode/{-$rating}/{-$difficulty}/{-$lamp}/{-$letter}/{-$title}"
      params={{
        mode: mode,
        rating: rating && rating !== "_"
            ? rating
            : difficulty && difficulty !== "_"
              ? "_"
              : lamp && lamp !== "_"
                ? "_"
                : letter && letter !== "_"
                  ? "_"
                  : undefined,
        difficulty: difficulty && difficulty !== "_"
            ? difficulty
            : lamp && lamp !== "_"
              ? "_"
              : letter && letter !== "_"
                ? "_"
                : undefined,
        lamp: lamp && lamp !== "_"
            ? lamp
            : letter && letter !== "_"
              ? "_"
              : undefined,
        letter: letter && letter !== "_" ? letter : undefined,
      }}
      className="hover:bg-(image:--stats-link-active-color) px-2"
    >
      {children}
    </Link>
  );
}

const DJ_LEVELS = ["NO PLAY", "F", "E", "D", "C", "B", "A", "AA", "AAA"];
const CLEAR_LAMPS = [
  "NO PLAY",
  "FAILED",
  "ASSISTED",
  "EASY",
  "CLEAR",
  "HARD",
  "EX HARD",
  "FULL COMBO",
];

function StatsCommonTable({
  mode,
  data,
  dataType,
  view,
}: {
  mode: string;
  data: { total?: StatsDetail } & Partial<RefluxStats>;
  dataType: "dj-level" | "lamp";
  view?: "level" | "chart";
}) {
  const isTotalStats = Object.hasOwn(data, "total");
  return (
    <Table>
      <thead>
        <Table.TR>
          {!isTotalStats && <Table.TH>{view?.toUpperCase()}</Table.TH>}
          <Table.TH>GRAPH</Table.TH>
          {dataType === "dj-level" &&
            DJ_LEVELS.map((djLv, index) => (
              <Table.TH
                key={`letter-th-${index}`}
                className={index === 0 ? "w-20" : "w-16"}
              >
                {djLv}
              </Table.TH>
            ))}
          {dataType === "lamp" &&
            CLEAR_LAMPS.map((lamp, index) => (
              <Table.TH
                key={`lamp-th-${index}`}
                className={index === CLEAR_LAMPS.length - 1 ? "w-26" : "w-20"}
              >
                {lamp}
              </Table.TH>
            ))}
        </Table.TR>
      </thead>
      <tbody>
        {Object.keys(data).map((key) => {
          let firstCell = "";
          let rating = "";
          let difficulty = "";
          if (!isTotalStats) {
            if (key.includes("_")) {
              rating = key.split("_")[1];
              firstCell = "★" + rating;
            } else {
              difficulty = key.split(mode)[1];
              firstCell = key.toUpperCase();
            }
          }
          if (dataType === "dj-level") {
            return (
              <Table.TR key={`letter-tr-${key}`}>
                {!isTotalStats && <Table.TD center>{firstCell}</Table.TD>}
                <Table.TD>
                  <LetterBarGraph data={data[key]} />
                </Table.TD>
                {DJ_LEVELS.map((djLv, index) => {
                  const letterProps = djLv.toLowerCase().replaceAll(" ", "_");
                  const letterParams = djLv.toLowerCase().replaceAll(" ", "-");
                  // const letter = djLv.toLowerCase();
                  return (
                    <Table.TD key={`letter-td-${index}`} center>
                      <FilterLink
                        mode={mode}
                        rating={rating}
                        difficulty={difficulty}
                        lamp={index === 0 ? letterParams : undefined}
                        letter={index === 0 ? undefined : letterParams}
                      >
                        {index === 0
                          ? data[key]?.[letterProps]
                          : data[key]?.[`dj_${letterProps}`]}
                      </FilterLink>
                    </Table.TD>
                  );
                })}
              </Table.TR>
            );
          }
          return (
            <Table.TR key={`lamp-tr-${key}`}>
              {!isTotalStats && <Table.TD center>{firstCell}</Table.TD>}
              <Table.TD>
                <LampBarGraph data={data[key]} />
              </Table.TD>
              {CLEAR_LAMPS.map((lamp, index) => {
                const lampProps = lamp.toLowerCase().replaceAll(" ", "_");
                const lampParams = lamp.toLowerCase().replaceAll(" ", "-");
                return (
                  <Table.TD key={`lamp-td-${index}`} center>
                    <FilterLink
                      mode={mode}
                      rating={rating}
                      difficulty={difficulty}
                      lamp={lampParams}
                    >
                      {data[key]?.[lampProps]}
                    </FilterLink>
                  </Table.TD>
                );
              })}
            </Table.TR>
          );
        })}
      </tbody>
    </Table>
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

function LampBarGraph({ data }: { data?: StatsDetail }) {
  if (!data) {
    return null;
  }
  const { no_play, failed, assisted, easy, clear, hard, ex_hard, full_combo } =
    data;
  const denominator = [
    no_play,
    failed,
    assisted,
    easy,
    clear,
    hard,
    ex_hard,
    full_combo,
  ].reduce((acc, cur) => acc + cur, 0);
  return (
    <div className="flex flex-row">
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

function LetterBarGraph({ data }: { data?: StatsDetail }) {
  if (!data) {
    return null;
  }
  const { no_play, dj_f, dj_e, dj_d, dj_c, dj_b, dj_a, dj_aa, dj_aaa } = data;

  const denominator = [
    no_play,
    dj_f,
    dj_e,
    dj_d,
    dj_c,
    dj_b,
    dj_a,
    dj_aa,
    dj_aaa,
  ].reduce((sum, value) => sum + value, 0);
  return (
    <div className="flex flex-row">
      <StatsGraphFrame>
        <BarSegment numerator={dj_aaa} denominator={denominator} type="aaa" />
        <BarSegment numerator={dj_aa} denominator={denominator} type="aa" />
        <BarSegment numerator={dj_a} denominator={denominator} type="a" />
        <BarSegment numerator={dj_b} denominator={denominator} type="b" />
        <BarSegment numerator={dj_c} denominator={denominator} type="c" />
        <BarSegment numerator={dj_d} denominator={denominator} type="d" />
        <BarSegment numerator={dj_e} denominator={denominator} type="e" />
        <BarSegment numerator={dj_f} denominator={denominator} type="f" />
        <BarSegment
          numerator={no_play}
          denominator={denominator}
          type="no-play"
        />
      </StatsGraphFrame>
    </div>
  );
}
