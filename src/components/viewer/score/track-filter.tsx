import { Link, useParams, type LinkProps } from "@tanstack/react-router";

import { DIFFICULTY_LETTERS } from "@/lib/types";
import useDebounce from "@/hooks/use-debounce";

export default function TrackListFilter() {
  const { mode, rating, difficulty, lamp, letter, title } = useParams({
    from: "/_app/viewer/score/$mode/{-$rating}/{-$difficulty}/{-$lamp}/{-$letter}/{-$title}",
  });
  const { handleChange } = useDebounce();
  return (
    <div className="px-2 pt-4 text-nowrap flex flex-col gap-2 select-none">
      <div className="flex flex-row gap-2">
        <ul className="list-none flex flex-row gap-2 text-center">
          <li>
            <FilterMenuLink
              params={{
                mode,
                rating: difficulty
                  ? "_"
                  : lamp
                    ? "_"
                    : letter
                      ? "_"
                      : title
                        ? "_"
                        : undefined,
                difficulty: difficulty
                  ? difficulty
                  : lamp
                    ? "_"
                    : letter
                      ? "_"
                      : title
                        ? "_"
                        : undefined,
                lamp: lamp ? lamp : letter ? "_" : title ? "_" : undefined,
                letter: letter ? letter : title ? "_" : undefined,
                title: title,
              }}
            >
              ALL LEVEL
            </FilterMenuLink>
          </li>
          {[...new Array(12)].map((_, i) => (
            <li key={`filter-rating-${i + 1}`}>
              <FilterMenuLink
                params={{
                  mode,
                  rating: (i + 1).toString(),
                  difficulty: difficulty
                    ? difficulty
                    : lamp
                      ? "_"
                      : letter
                        ? "_"
                        : title
                          ? "_"
                          : undefined,
                  lamp: lamp ? lamp : letter ? "_" : title ? "_" : undefined,
                  letter: letter ? letter : title ? "_" : undefined,
                }}
              >
                <span className="inline-block w-7">★ {i + 1}</span>
              </FilterMenuLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-row gap-2">
        <ul className="list-none flex flex-row gap-2 text-center">
          <li>
            <FilterMenuLink
              params={{
                mode,
                rating: rating && rating !== "_"
                  ? rating
                  : lamp
                    ? "_"
                    : letter
                      ? "_"
                      : title
                        ? "_"
                        : undefined,
                difficulty: lamp ? "_" : letter ? "_" : title ? "_" : undefined,
                lamp: lamp ? lamp : letter ? "_" : title ? "_" : undefined,
                letter: letter ? letter : title ? "_" : undefined,
                title: title,
              }}
            >
              ALL DIFFICULTY
            </FilterMenuLink>
          </li>
          {DIFFICULTIES.map((diffy, index) => {
            if (mode === "dp" && DIFFICULTY_LETTERS[index] === "b") {
              return null;
            }
            return (
              <li key={`filter-difficulty-${index}`}>
                <FilterMenuLink
                  params={{
                    mode,
                    rating: rating ? rating : "_",
                    difficulty: DIFFICULTY_LETTERS[index],
                    lamp: lamp ? lamp : letter ? "_" : title ? "_" : undefined,
                    letter: letter ? letter : title ? "_" : undefined,
                    title: title,
                  }}
                >
                  <span className="inline-block">{diffy}</span>
                </FilterMenuLink>
              </li>
            );
          })}
        </ul>
        <ul className="list-none flex flex-row gap-2 text-center">
          <li>
            <FilterMenuLink
              params={{
                mode,
                rating: rating && rating !== "_"
                  ? rating
                  : difficulty && difficulty !== "_"
                    ? "_"
                    : lamp && lamp !== "_"
                      ? "_"
                      : title
                        ? "_"
                        : undefined,
                difficulty: difficulty && difficulty !== "_"
                  ? difficulty
                  : lamp && lamp !== "_"
                    ? "_"
                    : title
                      ? "_"
                      : undefined,
                lamp: lamp && lamp !== "_" ? lamp : title ? "_" : undefined,
                letter: title ? "_" : undefined,
                title: title,
              }}
            >
              <span className="inline-block">ALL DJ LEVEL</span>
            </FilterMenuLink>
          </li>
          <li>
            <FilterMenuLink
              params={{
                mode,
                rating: rating ? rating : "_",
                difficulty: difficulty ? difficulty : "_",
                lamp: lamp ? lamp : "_",
                letter: "less",
                title: title,
              }}
            >
              <span className="inline-block">B or LESS</span>
            </FilterMenuLink>
          </li>
          <li>
            <FilterMenuLink
              params={{
                mode,
                rating: rating ? rating : "_",
                difficulty: difficulty ? difficulty : "_",
                lamp: lamp ? lamp : "_",
                letter: "a",
                title: title,
              }}
            >
              <span className="inline-block w-7">A</span>
            </FilterMenuLink>
          </li>
          <li>
            <FilterMenuLink
              params={{
                mode,
                rating: rating ? rating : "_",
                difficulty: difficulty ? difficulty : "_",
                lamp: lamp ? lamp : "_",
                letter: "aa",
                title: title,
              }}
            >
              <span className="inline-block w-7">AA</span>
            </FilterMenuLink>
          </li>
          <li>
            <FilterMenuLink
              params={{
                mode,
                rating: rating ? rating : "_",
                difficulty: difficulty ? difficulty : "_",
                lamp: lamp ? lamp : "_",
                letter: "aaa",
                title: title,
              }}
            >
              <span className="inline-block w-7">AAA</span>
            </FilterMenuLink>
          </li>
        </ul>
      </div>
      <div className="flex flex-row gap-2">
        <ul className="list-none flex flex-row gap-2 text-center">
          <li>
            <FilterMenuLink
              params={{
                mode,
                rating: rating && rating !== "_"
                  ? rating
                  : difficulty && difficulty !== "_"
                    ? "_"
                    : letter && letter !== "_"
                      ? "_"
                      : title
                        ? "_"
                        : undefined,
                difficulty: difficulty && difficulty !== "_"
                  ? difficulty
                  : letter && letter !== "_"
                    ? "_"
                    : title
                      ? "_"
                      : undefined,
                lamp: letter ? "_" : title ? "_" : undefined,
                letter: letter ? letter : title ? "_" : undefined,
                title: title,
              }}
            >
              <span className="inline-block">ALL LAMP</span>
            </FilterMenuLink>
          </li>
          {LAMPS.map((_lamp, index) => {
            const lampParams = _lamp.toLowerCase().replaceAll(" ", "-");
            return (
              <li key={`filter-lamp-${index}`}>
                <FilterMenuLink
                  params={{
                    mode,
                    rating: rating ? rating : "_",
                    difficulty: difficulty ? difficulty : "_",
                    lamp: lampParams,
                    letter: letter ? letter : title ? "_" : undefined,
                    title: title,
                  }}
                >
                  <span className="inline-block">{_lamp}</span>
                </FilterMenuLink>
              </li>
            );
          })}
        </ul>
        <div>
          <form
            role="search"
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="title-search">TITLE:</label>
            <input
              id="title-search"
              type="text"
              className="bg-gray-900 ml-2 pl-1 w-40"
              onChange={handleChange}
              defaultValue={title}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

const DIFFICULTIES = ["BEGINNER", "NORMAL", "HYPER", "ANOTHER", "LEGGENDARIA"];
const LAMPS = [
  "NO PLAY",
  "FAILED",
  "ASSISTED",
  "EASY",
  "CLEAR",
  "HARD",
  "EX HARD",
  "FULL COMBO",
];

function FilterMenuLink({
  params,
  exact = true,
  children,
}: {
  params?: LinkProps["params"];
  exact?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Link
      to="/viewer/score/$mode/{-$rating}/{-$difficulty}/{-$lamp}/{-$letter}/{-$title}"
      params={params}
      className="hover:bg-(image:--link-active-color) py-1 px-2"
      activeProps={{
        className: "bg-(image:--link-active-color) border-y border-white",
      }}
      activeOptions={{ exact: exact }}
    >
      {children}
    </Link>
  );
}
