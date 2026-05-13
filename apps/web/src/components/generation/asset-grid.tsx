import type { GeneratedAssetRead } from "@/lib/types";

export function AssetGrid({ assets }: { assets: GeneratedAssetRead[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {assets.map((asset) => (
        <figure key={asset.id} className="overflow-hidden rounded-md border bg-white">
          <div className="aspect-[3/4] bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset.asset_url} alt={asset.asset_type} className="h-full w-full object-cover" />
          </div>
          <figcaption className="flex items-center justify-between border-t px-3 py-2 text-xs">
            <span>{asset.generation_step}</span>
            {asset.is_selected ? <span className="font-medium">Selected</span> : null}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
