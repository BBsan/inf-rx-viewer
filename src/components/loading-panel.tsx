export default function LoadingPanel() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full h-[calc(100vh-64px)]">
      <span className="loader"></span>
      <span className="text-2xl">Loading...</span>
    </div>
  );
}
