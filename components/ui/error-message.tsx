export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-destructive text-destructive-foreground p-2 rounded-md w-fit mx-auto mt-6">
      {message}
    </div>
  );
}
