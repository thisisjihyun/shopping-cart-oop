export async function safeFetch<T = any>(
  input: RequestInfo,
  init: RequestInit
): Promise<T | null> {
  try {
    const res = await fetch(input, init);

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Network response was not ok");
    }

    return await res.json();
  } catch (error) {
    console.log("Fetch error", error);
    return null;
  }
}
