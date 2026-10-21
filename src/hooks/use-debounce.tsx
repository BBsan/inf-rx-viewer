import { useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function useDebounce() {
  const navigate = useNavigate();
  const { mode, rating, difficulty, lamp, letter } = useParams({
    from: "/_app/viewer/score/$mode/{-$rating}/{-$difficulty}/{-$lamp}/{-$letter}/{-$title}",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceTerm, setDebounceTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    navigate({
      to: "/viewer/score/$mode/{-$rating}/{-$difficulty}/{-$lamp}/{-$letter}/{-$title}",
      params: {
        mode,
        rating: rating
          ? rating
          : difficulty
            ? ""
            : lamp
              ? ""
              : letter
                ? ""
                : debounceTerm ? "" : undefined,
        difficulty: difficulty
          ? difficulty
          : lamp
            ? ""
            : letter
              ? ""
              : debounceTerm ? "" : undefined,
        lamp: lamp ? lamp : letter ? "" : debounceTerm ? "" : undefined,
        letter: letter ? letter : debounceTerm ? "" : undefined,
        title: debounceTerm
      },
    });
  }, [debounceTerm]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  return {
    handleChange,
  };
}
