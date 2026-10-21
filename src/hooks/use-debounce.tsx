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
        rating:
          rating && rating !== "_"
            ? rating
            : difficulty && difficulty !== "_"
              ? "_"
              : lamp && lamp !== "_"
                ? "_"
                : letter && letter !== "_"
                  ? "_"
                  : debounceTerm
                    ? "_"
                    : undefined,
        difficulty:
          difficulty && difficulty !== "_"
            ? difficulty
            : lamp && lamp !== "_"
              ? "_"
              : letter && letter !== "_"
                ? "_"
                : debounceTerm
                  ? "_"
                  : undefined,
        lamp:
          lamp && lamp !== "_"
            ? lamp
            : letter && letter !== "_"
              ? "_"
              : debounceTerm
                ? "_"
                : undefined,
        letter:
          letter && letter !== "_" ? letter : debounceTerm ? "_" : undefined,
        title: debounceTerm,
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
