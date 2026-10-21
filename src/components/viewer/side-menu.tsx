import { Link, useParams, type LinkProps } from "@tanstack/react-router";
import { memo } from "react";

export default function SideMenu() {
  const { rating, difficulty, lamp, letter, title } = useParams({
    // from: "/viewer/score/$mode/{-$rating}/{-$difficulty}/{-$lamp}/{-$letter}/{-$title}",
    strict: false,
  });
  return (
    <div className="flex flex-col gap-4 overflow-y-auto p-4">
      <div className="flex flex-1 flex-col select-none">
        <div className="border-b-3 border-double">SP STATS</div>
        <ul className="list-none">
          <li>
            <SideMenuLink
              to="/viewer/stats/total/$mode"
              params={{ mode: "sp" }}
              text="In Game Total"
            />
          </li>
          <li>
            <SideMenuLink
              to="/viewer/stats/rating/$mode"
              params={{ mode: "sp" }}
              text="By Level"
            />
          </li>
          <li>
            <SideMenuLink
              to="/viewer/stats/chart/$mode"
              params={{ mode: "sp" }}
              text="By Chart Difficulty"
            />
          </li>
          <li>
            <SideMenuLink
              to="/viewer/stats/subdivided/$mode"
              params={{ mode: "sp" }}
              text="Subdivided DJ Level"
            />
          </li>
        </ul>
      </div>
      <div className="flex flex-1 flex-col select-none">
        <div className="border-b-3 border-double">DP STATS</div>
        <ul className="list-none">
          <li>
            <SideMenuLink
              to="/viewer/stats/total/$mode"
              params={{ mode: "dp" }}
              text="In Game Total"
            />
          </li>
          <li>
            <SideMenuLink
              to="/viewer/stats/rating/$mode"
              params={{ mode: "dp" }}
              text="By Level"
            />
          </li>
          <li>
            <SideMenuLink
              to="/viewer/stats/chart/$mode"
              params={{ mode: "dp" }}
              text="By Chart Difficulty"
            />
          </li>
          <li>
            <SideMenuLink
              to="/viewer/stats/subdivided/$mode"
              params={{ mode: "dp" }}
              text="Subdivided DJ Level"
            />
          </li>
        </ul>
      </div>
      <div className="flex flex-1 flex-col select-none">
        <div className="border-b">SCORE VIEWER</div>
        <ul className="list-none">
          <li>
            <SideMenuLink
              to="/viewer/score/$mode/{-$rating}/{-$difficulty}/{-$lamp}/{-$letter}/{-$title}"
              params={{
                mode: "sp",
                rating: rating
                  ? rating
                  : difficulty
                    ? ""
                    : lamp
                      ? ""
                      : letter
                        ? ""
                        : title
                          ? ""
                          : undefined,
                difficulty: difficulty
                  ? difficulty
                  : lamp
                    ? ""
                    : letter
                      ? ""
                      : title
                        ? ""
                        : undefined,
                lamp: lamp ? lamp : letter ? "" : title ? "" : undefined,
                letter: letter ? letter : title ? "" : undefined,
                title: title,
              }}
              text="Single Play"
              exact={false}
            />
          </li>
          <li>
            <SideMenuLink
              to="/viewer/score/$mode/{-$rating}/{-$difficulty}/{-$lamp}/{-$letter}/{-$title}"
              params={{
                mode: "dp",
                rating: rating
                  ? rating
                  : difficulty
                    ? ""
                    : lamp
                      ? ""
                      : letter
                        ? ""
                        : title
                          ? ""
                          : undefined,
                difficulty: difficulty
                  ? difficulty
                  : lamp
                    ? ""
                    : letter
                      ? ""
                      : title
                        ? ""
                        : undefined,
                lamp: lamp ? lamp : letter ? "" : title ? "" : undefined,
                letter: letter ? letter : title ? "" : undefined,
                title: title,
              }}
              text="Double Play"
              exact={false}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

const SideMenuLink = memo(
  function SideMenuLink({
    to,
    params,
    text,
    exact = true,
  }: {
    to: LinkProps["to"];
    params?: LinkProps["params"];
    text: string;
    exact?: boolean;
  }) {
    return (
      <Link
        to={to}
        params={params}
        className="relative block hover:bg-(image:--link-active-color)"
        activeProps={{
          className:
            "bg-(image:--link-active-color) rounded-xs border-l-4 border-l-white",
        }}
        activeOptions={{ exact: exact }}
      >
        <div className="relative flex items-center m-1 ml-4">{text}</div>
      </Link>
    );
  },
  (prevProps, newProps) => {
    return (
      prevProps.to === newProps.to &&
      prevProps.text === newProps.text &&
      prevProps.exact === newProps.exact &&
      isEqual(
        prevProps.params as Record<string, string>,
        newProps.params as Record<string, string>,
      )
    );
  },
);

function isEqual<T extends Record<string, string>>(obj1: T, obj2: T) {
  if (obj1 === obj2) {
    return true;
  }
  if (
    obj1 === null ||
    obj2 === null ||
    typeof obj1 !== "object" ||
    typeof obj2 !== "object"
  ) {
    return false;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  return keys1.every((key) => obj1[key] === obj2[key]);
}
