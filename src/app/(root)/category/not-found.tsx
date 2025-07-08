export default function ProductNotFound() {
  return (
    //2x h-[calc(100dvh-160px)] of header for similarity
    <div className="flex h-[calc(100dvh-160px)] flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold">Category Not Found</h1>
      <p className="mt-2">
        Sorry, we couldn’t find the category you’re looking for.
      </p>
    </div>
  );
}
