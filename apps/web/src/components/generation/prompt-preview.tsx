export function PromptPreview({ payload }: { payload: unknown }) {
  return (
    <pre className="max-h-96 overflow-auto rounded-md border bg-neutral-950 p-4 text-xs text-neutral-100">
      {JSON.stringify(payload, null, 2)}
    </pre>
  );
}
