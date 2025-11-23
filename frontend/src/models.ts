export interface Project {
  id: number;
  slug: string;
  title: string;
  desc: string;
  url: string;
  repo_url: string;
  image_url: string;
  extra_image_url: string;
  start_date: Date;
  organization: string;
  organization_url: string;
  my_contributions_url: string;
  roles: string[];
  languages: string[];
}
