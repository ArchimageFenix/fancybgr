let initializationPromise:
  Promise<void> | null = null;

async function requestPersistentStorage(): Promise<void> {
  if (
    !("storage" in navigator) ||
    !navigator.storage.persist
  ) {
    return;
  }

  try {
    const alreadyPersistent =
      await navigator.storage.persisted();

    if (alreadyPersistent) {
      return;
    }

    await navigator.storage.persist();
  } catch {
    // Persistent storage is an optimization.
    // FancyBGR must continue working
    // even if the browser denies it.
  }
}

async function initialize(): Promise<void> {
  if (
    typeof window === "undefined" ||
    !("serviceWorker" in navigator)
  ) {
    return;
  }

  try {
    await navigator.serviceWorker.register(
      "/sw.js",
      {
        scope: "/",
      },
    );

    await navigator.serviceWorker.ready;

    await requestPersistentStorage();
  } catch (error) {
    console.warn(
      "FancyBGR AI asset cache could not be initialized.",
      error,
    );
  }
}

export function initializeAIAssetCache(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise =
      initialize();
  }

  return initializationPromise;
}