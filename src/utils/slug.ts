export function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // hapus karakter aneh
    .replace(/\s+/g, "-") // spasi jadi -
    .replace(/-+/g, "-"); // double - jadi satu
}
