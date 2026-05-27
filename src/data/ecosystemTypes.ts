export type EcosystemEntry = {
  name: string;
  summary: string;
  href?: string;
  avatar?: string;
  avatarAlt?: string;
  badge?: string;
  status?: string;
};

export type EcosystemCategory = {
  id: string;
  title: string;
  description: string;
  entries: EcosystemEntry[];
};
