export const getColor = (name: string) => {
  const colors = [
    "bg-purple-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-pink-500",
    "bg-yellow-500",
    "bg-teal-500",
    "bg-red-500",
  ];
  const sum = name.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  return colors[sum % colors.length];
};

export const getInitials = (name: string) =>
  name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export const formatTime = () => {
  return new Date().toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}; 