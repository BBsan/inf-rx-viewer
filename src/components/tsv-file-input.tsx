import { useRefluxContext } from "@/contexts/reflux-context";

export default function TSVFileInput() {
  const { handleDragOver, handleDrop, handleFileChange } = useRefluxContext();
  return (
    <label
      htmlFor="file"
      className="flex flex-col items-center justify-center w-full h-[calc(100vh-64px)] bg-gray-700 border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-gray-500"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <p className="text-4xl">
        Click to select or drop Reflux tracker.tsv file.
      </p>
      <input
        type="file"
        name="file"
        id="file"
        accept=".tsv"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
  );
}
