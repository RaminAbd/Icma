export function getTimeAgo(createdAt: string): string {
  const now = new Date();
  const pastDate = new Date(createdAt);

  const diffMs = now.getTime() - pastDate.getTime();

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  const hours = diffHours % 24;

  let result = '';

  if (diffDays > 0) {
    result += `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    if (hours > 0) {
      result += ` ${hours} hour${hours > 1 ? 's' : ''}`;
    }
  } else if (diffHours > 0) {
    result += `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    const minutes = diffMinutes % 60;
    if (minutes > 0) {
      result += ` ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
  } else if (diffMinutes > 0) {
    result += `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
  } else {
    result += `${diffSeconds} second${diffSeconds > 1 ? 's' : ''}`;
  }

  return result + ' ago';
}
