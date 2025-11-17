export function secondsToHHMMSS(totalSeconds: number): string {
  const sign = totalSeconds < 0 ? "-" : "";
  const seconds = Math.abs(Math.floor(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(secs).padStart(2, "0");
  return `${sign}${hh}:${mm}:${ss}`;
}
