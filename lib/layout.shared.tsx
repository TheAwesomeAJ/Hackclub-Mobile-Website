import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { FaSlack } from "react-icons/fa";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "Hack Club Mobile",
    },
    githubUrl: "https://github.com/TheAwesomeAJ/Hackclub-Mobile",
    links: [
      {
        type: "icon",
        icon: <FaSlack />,
        text: "Slack",
        url: "https://hackclub.enterprise.slack.com/archives/C09NTG60T8X",
      },
    ],
  };
}
