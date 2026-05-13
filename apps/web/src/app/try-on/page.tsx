import { Suspense } from "react";

import { TryOnRoomPage } from "@/components/marketplace-app";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <TryOnRoomPage />
    </Suspense>
  );
}
