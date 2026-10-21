import { Link } from "@tanstack/react-router";
import { useRefluxContext } from "@/contexts/reflux-context";

export default function Header() {
  const { isTSVLoaded } = useRefluxContext();
  return (
    <header className="z-10 bg-(--header-bg-color) top-0 sticky flex flex-row items-center justify-between p-[0_1%] font-normal">
      <h1 className="text-[2rem] font-bold">
        INF Reflux Viewer
      </h1>
      <div>{!isTSVLoaded() && <Link to="/demo" replace>DEMO DATA</Link>}</div>
    </header>
  );
}
