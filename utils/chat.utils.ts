import TimeAgo from "javascript-time-ago";

export function chatNameComposer(userIds: string[]) {
  return userIds.sort().join("_");
}

export function chatIdExtractMembers(chatId: string) {
  return chatId.split("_");
}

export function timeAgo(date?: Date) {
  return date ? new TimeAgo("en-US").format(date) : "";
}