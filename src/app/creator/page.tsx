import { Suspense } from "react";

import { CreatorWorkspacePage } from "@/components/marketplace-app";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">正在加载博主工作台...</div>}>
      <CreatorWorkspacePage />
    </Suspense>
  );
}
