export async function fetchData<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('');
    const data = await response.json();
    return data;
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
    return null;
  }
}
