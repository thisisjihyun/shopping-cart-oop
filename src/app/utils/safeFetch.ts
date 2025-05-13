export async function safeFetch<T = any>(
  input: RequestInfo,
  init: RequestInit
): Promise<T | null | boolean> {
  try {
    const res = await fetch(input, init);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Network response was not ok");
    }
    return res.status === 204 ? true : await res.json();
  } catch (error) {
    return null;
  }
}
