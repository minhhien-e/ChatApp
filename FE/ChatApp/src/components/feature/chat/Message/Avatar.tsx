import { getColor, getInitials } from "@utils/chat";

interface AvatarProps {
  name: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name }) => (
  <div
    className={`w-8 h-8 ${getColor(
      name
    )} rounded-full flex items-center justify-center mr-2`}
  >
    <span className="text-sm font-semibold">{getInitials(name)}</span>
  </div>
);
