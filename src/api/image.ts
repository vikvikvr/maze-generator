function readAsDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function fetchBase64Image(url: string): Promise<string> {
  const response = await fetch(url);

  const blob = await response.blob();

  return readAsDataURL(blob);
}
