import {
	HelpCircle,
	PlugIcon,
	Shield,
	Smartphone,
	Users,
	Calendar,
	Bell,
	Clock,
} from "lucide-react";
import type { LinkItemType } from "@/components/navbar/sheard";

export const productLinks: LinkItemType[] = [
	{
		label: "Mobile App",
		href: "#",
		description: "Explore Hack Club Mobile features",
		icon: Smartphone,
	},
	{
		label: "Hackatime Integration",
		href: "#",
		description: "Track your coding streaks with Hackatime",
		icon: Clock,
	},
	{
		label: "View Events",
		href: "#",
		description: "See upcoming Hack Club events",
		icon: Calendar,
	},
	{
		label: "YSWS Programs",
		href: "#",
		description: "Discover You Ship We Ship programs",
		icon: PlugIcon,
	},
];

export const companyLinks: LinkItemType[] = [
	{
		label: "About Hack Club",
		href: "#",
		description: "Learn about Hack Club and their mission",
		icon: Users,
	},
	{
		label: "Privacy Policy",
		href: "#",
		description: "Read our privacy practices",
		icon: Shield,
	},
];

export const companyLinks2: LinkItemType[] = [
	{
		label: "For YSWS Managers",
		href: "#",
		icon: Bell,
	},
	{
		label: "Help Center",
		href: "#",
		icon: HelpCircle,
	},
	{
		label: "About Us",
		href: "#",
		icon: Users,
	},
];
