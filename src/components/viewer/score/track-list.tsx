import { useEffect, useMemo, useRef, useState } from "react";

import { useParams } from "@tanstack/react-router";
import { useVirtualizer } from "@tanstack/react-virtual";

import { useRefluxContext } from "@/contexts/reflux-context";
import ScoreDetail from "./track-item";
import {
  DIFFICULTY_LETTERS,
  type Chart,
  type Track,
} from "@/lib/types";

export default function TrackList() {
  const [columns, setColumns] = useState(2);
  const { mode, rating, difficulty, lamp, letter, title } = useParams({
    from: "/_app/viewer/score/$mode/{-$rating}/{-$difficulty}/{-$lamp}/{-$letter}/{-$title}",
  });
  const { tracks } = useRefluxContext();
  const parentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!parentRef.current) {
      return;
    }
    parentRef.current.scrollTo({ top: 0 });
  }, [mode, difficulty, letter, lamp, rating]);
  useEffect(() => {
    if (!parentRef.current) {
      return;
    }
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        if (width < 1060) {
          setColumns(1);
        } else if (width < 1580) {
          setColumns(2);
        } else if (width < 2110) {
          setColumns(3);
        } else {
          setColumns(4);
        }
      }
    });
    resizeObserver.observe(parentRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const filteredTracks = useMemo<Partial<Track>[]>(() => {
    let filteredTracks: Partial<Track>[] = [...tracks];
    if (rating) {
      filteredTracks = filteredTracks.filter((track) =>
        ratingFilter(track, mode, rating),
      );
    }
    if (difficulty) {
      filteredTracks = filteredTracks
        .filter((track) => difficultyFilter(track, mode, rating, difficulty))
        .map((track) => reduceTrackByTargetDifficulty(track, mode, difficulty));
    } else if (rating) {
      filteredTracks = filteredTracks.map((track) =>
        reduceTrackByAllDifficulty(track, mode, rating),
      );
    }
    if (lamp) {
      filteredTracks = filteredTracks
        .filter((track) => clearLampFilter(track, mode, lamp))
        .map((track) => reduceTrackByClearLamp(track, mode, lamp));
    }
    if (letter) {
      filteredTracks = filteredTracks
        .filter((track) => letterFilter(track, mode, letter))
        .map((track) => reduceTrackByLetter(track, mode, letter));
    }
    if (title) {
      filteredTracks = filteredTracks.filter((track) =>
        track.title?.match(new RegExp(title, "i")),
      );
    }
    return filteredTracks;
  }, [mode, rating, difficulty, lamp, letter, title]);

  const rows = chunkArray(filteredTracks, columns);
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 5,
  });
  return (
    <>
      <div>
        {filteredTracks.length == 0 && (
          <div className="p-4">
            <h3 className="text-3xl">No matching data found.</h3>
          </div>
        )}
        {filteredTracks.length > 0 && (
          <div className="px-4 py-2">
            <span>{filteredTracks.length} song(s) found.</span>
          </div>
        )}
      </div>
      <div
        ref={parentRef}
        className="flex flex-wrap content-start items-start gap-4 w-full h-[calc(100vh-48px-120px-24px)] overflow-y-auto px-4 pb-4"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
          className="relative"
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              ref={rowVirtualizer.measureElement}
              data-index={virtualItem.index}
              key={virtualItem.key}
              style={{
                transform: `translateY(${virtualItem.start}px)`,
              }}
              className="absolute top-0 left-0 flex gap-2 pb-2"
            >
              {rows[virtualItem.index].map((track, index) => (
                <div
                  key={`t-${index}-${track.title}`}
                  className="bg-(image:--track-item-bg) p-2 px-4 rounded-lg select-none"
                >
                  <span className="text-3xl">{track.title}</span>
                  {DIFFICULTY_LETTERS.map((letter) => {
                    const chart = (mode + letter) as "dpb" & Chart;
                    if (chart === "dpb" || !track[`${chart}_rating`]) {
                      return null;
                    }
                    const isNoPlay = track[`${chart}_lamp`] === "NP";
                    return (
                      <ScoreDetail
                        key={`s-${letter}`}
                        chart={chart}
                        rating={track[`${chart}_rating`] as string}
                        lamp={track[`${chart}_lamp`] as string}
                        letter={isNoPlay ? "-" : track[`${chart}_letter`] as string}
                        missCount={isNoPlay ? "-" : track[`${chart}_miss_count`] as string}
                        score={isNoPlay ? undefined : track[`${chart}_ex_score`]}
                        scoreRate={isNoPlay ? undefined : track[`${chart}_score_rate`]}
                        letterDiff={isNoPlay ? undefined : track[`${chart}_letter_diff`]}
                        scoreDiff={isNoPlay ? undefined : track[`${chart}_score_diff`]}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function chunkArray(arr: any[], size: number) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
}

function reduceTrack(track: Partial<Track>, chart: string) {
  return {
    [`${chart}_rating`]: track[`${chart}_rating`],
    [`${chart}_lamp`]: track[`${chart}_lamp`],
    [`${chart}_letter`]: track[`${chart}_letter`],
    [`${chart}_ex_score`]: track[`${chart}_ex_score`],
    [`${chart}_miss_count`]: track[`${chart}_miss_count`],
    [`${chart}_score_rate`]: track[`${chart}_score_rate`],
    [`${chart}_letter_diff`]: track[`${chart}_letter_diff`],
    [`${chart}_score_diff`]: track[`${chart}_score_diff`],
  } as Partial<Track>;
}

function ratingFilter(track: Partial<Track>, mode: string, rating: string) {
  if (mode === "sp" && track[`${mode}b_rating`] === rating) {
    return true;
  }
  if (
    track[`${mode}n_rating`] === rating ||
    track[`${mode}h_rating`] === rating ||
    track[`${mode}a_rating`] === rating ||
    track[`${mode}l_rating`] === rating
  ) {
    return true;
  }
  return false;
}

function difficultyFilter(
  track: Partial<Track>,
  mode: string,
  rating: string | undefined,
  difficulty: string,
) {
  const chart = mode + difficulty;
  return (
    (!rating && track[`${chart}_rating`]) || track[`${chart}_rating`] === rating
  );
}

function reduceTrackByTargetDifficulty(
  track: Partial<Track>,
  mode: string,
  difficulty: string,
) {
  const chart = mode + difficulty;
  const reducedTrack: Partial<Track> = {
    title: track.title,
    ...reduceTrack(track, chart),
  };
  return reducedTrack;
}

function reduceTrackByAllDifficulty(
  track: Partial<Track>,
  mode: string,
  rating: string,
) {
  let reducedTrack: Partial<Track> = { title: track.title };
  DIFFICULTY_LETTERS.forEach((letter) => {
    const chart = mode + letter;
    if (chart === "dpb") {
      return;
    }
    if (track[`${chart}_rating`] === rating) {
      reducedTrack = {
        ...reducedTrack,
        ...reduceTrack(track, chart),
      };
    }
  });
  return reducedTrack;
}

function convertLamp(lamp: string) {
  switch (lamp) {
    case "no-play":
      return "NP";
    case "failed":
      return "F";
    case "assisted":
      return "AC";
    case "easy":
      return "EC";
    case "clear":
      return "NC";
    case "hard":
      return "HC";
    case "ex-hard":
      return "EX";
    case "full-combo":
      return "FC";
  }
  return "NP";
}
function clearLampFilter(track: Partial<Track>, mode: string, lamp: string) {
  const refluxLamp = convertLamp(lamp);
  if (mode === "sp" && track[`${mode}b_lamp`] === refluxLamp) {
    return true;
  }
  if (
    track[`${mode}n_lamp`] === refluxLamp ||
    track[`${mode}h_lamp`] === refluxLamp ||
    track[`${mode}a_lamp`] === refluxLamp ||
    track[`${mode}l_lamp`] === refluxLamp
  ) {
    return true;
  }
  return false;
}

function reduceTrackByClearLamp(
  track: Partial<Track>,
  mode: string,
  lamp: string,
) {
  let reducedTrack: Partial<Track> = { title: track.title };
  const refluxLamp = convertLamp(lamp);
  DIFFICULTY_LETTERS.forEach((dLetter) => {
    const chart = mode + dLetter;
    if (chart === "dpb") {
      return;
    }
    if (track[`${chart}_lamp`] === refluxLamp) {
      reducedTrack = {
        ...reducedTrack,
        ...reduceTrack(track, chart),
      };
    }
  });
  return reducedTrack;
}

function letterFilter(track: Partial<Track>, mode: string, letter: string) {
  if (letter === "max" || letter.includes("+") || letter.includes("-")) {
    return subdividedFilter(track, mode, letter);
  }
  return djLevelFilter(track, mode, letter);
}

function subdividedFilter(track: Partial<Track>, mode: string, letter: string) {
  const upperCaseLetter = letter.toUpperCase();
  if (mode === "sp" && track[`${mode}b_letter_diff`] === upperCaseLetter) {
    return true;
  }
  if (
    track[`${mode}n_letter_diff`] === upperCaseLetter ||
    track[`${mode}h_letter_diff`] === upperCaseLetter ||
    track[`${mode}a_letter_diff`] === upperCaseLetter ||
    track[`${mode}l_letter_diff`] === upperCaseLetter
  ) {
    return true;
  }
  return false;
}

function djLevelFilter(track: Partial<Track>, mode: string, letter: string) {
  const upperCaseLetter = letter.toUpperCase();
  if (upperCaseLetter !== "LESS") {
    if (mode === "sp" && track[`${mode}b_letter`] === upperCaseLetter) {
      return true;
    }
    if (
      track[`${mode}n_letter`] === upperCaseLetter ||
      track[`${mode}h_letter`] === upperCaseLetter ||
      track[`${mode}a_letter`] === upperCaseLetter ||
      track[`${mode}l_letter`] === upperCaseLetter
    ) {
      return true;
    }
  } else {
    if (
      mode === "sp" &&
      track.hasOwnProperty(`${mode}b_letter`) &&
      track[`${mode}b_letter`] !== "" &&
      !track[`${mode}b_letter`]?.includes("A") &&
      !track[`${mode}b_letter`]?.includes("NP")
    ) {
      return true;
    }
    if (
      (track.hasOwnProperty(`${mode}n_letter`) &&
        track[`${mode}n_letter`] !== "" &&
        !track[`${mode}n_letter`]?.includes("A") &&
        !track[`${mode}n_letter`]?.includes("NP")) ||
      (track.hasOwnProperty(`${mode}h_letter`) &&
        track[`${mode}h_letter`] !== "" &&
        !track[`${mode}h_letter`]?.includes("A") &&
        !track[`${mode}h_letter`]?.includes("NP")) ||
      (track.hasOwnProperty(`${mode}a_letter`) &&
        track[`${mode}a_letter`] !== "" &&
        !track[`${mode}a_letter`]?.includes("A") &&
        !track[`${mode}a_letter`]?.includes("NP")) ||
      (track.hasOwnProperty(`${mode}l_letter`) &&
        track[`${mode}l_letter`] !== "" &&
        !track[`${mode}l_letter`]?.includes("A") &&
        !track[`${mode}l_letter`]?.includes("NP"))
    ) {
      return true;
    }
  }
  return false;
}

function reduceTrackByLetter(
  track: Partial<Track>,
  mode: string,
  letter: string,
) {
  if (letter === "max" || letter.includes("+") || letter.includes("-")) {
    return reduceTrackBySubdivided(track, mode, letter);
  }
  return reduceTrackByDjLevel(track, mode, letter);
}

function reduceTrackBySubdivided(
  track: Partial<Track>,
  mode: string,
  letter: string,
) {
  let reducedTrack: Partial<Track> = { title: track.title };
  DIFFICULTY_LETTERS.forEach((dLetter) => {
    const chart = mode + dLetter;
    if (chart === "dpb") {
      return;
    }
    if (track[`${chart}_letter_diff`] === letter.toUpperCase()) {
      reducedTrack = {
        ...reducedTrack,
        ...reduceTrack(track, chart),
      };
    }
  });
  return reducedTrack;
}

function reduceTrackByDjLevel(
  track: Partial<Track>,
  mode: string,
  letter: string,
) {
  let reducedTrack: Partial<Track> = { title: track.title };
  DIFFICULTY_LETTERS.forEach((dLetter) => {
    const chart = mode + dLetter;
    if (chart === "dpb") {
      return;
    }
    if (letter !== "less") {
      if (track[`${chart}_letter`] === letter.toUpperCase()) {
        reducedTrack = {
          ...reducedTrack,
          ...reduceTrack(track, chart),
        };
      }
    } else {
      if (
        !track[`${chart}_letter`]?.includes("A") &&
        !track[`${chart}_letter`]?.includes("NP")
      ) {
        reducedTrack = {
          ...reducedTrack,
          ...reduceTrack(track, chart),
        };
      }
    }
  });
  return reducedTrack;
}
