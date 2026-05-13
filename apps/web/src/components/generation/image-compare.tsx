import { ImageIcon } from "lucide-react";

export function ImageCompare({ images }: { images: { label: string; url?: string | null }[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {images.map((image) => (
        <figure key={image.label} className="overflow-hidden rounded-md border bg-white">
          <div className="aspect-[3/4] bg-muted">
            {image.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image.url} alt={image.label} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <ImageIcon className="size-8" />
              </div>
            )}
          </div>
          <figcaption className="border-t px-3 py-2 text-xs text-muted-foreground">{image.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}
