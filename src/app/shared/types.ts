import { View } from "./enums";


export type MenuItem = {
    id: View;
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

