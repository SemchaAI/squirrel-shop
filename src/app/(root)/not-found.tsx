export default function NotFound() {
  return (
    <div className="flex h-[calc(100svh-160px)] flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-primary">Page Not Found</h1>
      <p className="mt-2">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
    </div>
  );
}
