export type Message = {
  fromMe: boolean;
  text: string;
  time: string;
};

export type MediaItem = {
  url: string;
  type: string;
  date: string;
};

export type LinkItem = {
  url: string;
  title: string;
  preview: string;
  date: string;
};

export type Member = {
  name: string;
  initials: string;
  isAdmin?: boolean;
};

export type Chat = {
  id: number;
  name: string;
  type: "friend" | "group";
  status: string;
  preview: string;
  time: string;
  unread: number;
  avatar: string;
  online: boolean;
  messages: Message[];
  media: MediaItem[];
  links: LinkItem[];
  members?: Member[];
}; 