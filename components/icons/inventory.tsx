import { classNames } from "@/libs";
import { SVGProps } from "react";
import { Template } from "./template";

export interface InventoryProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function Inventory({ size = 20, className, ...props }: InventoryProps) {
  return (
    <Template {...{ size, className, props }}>
      <path
        d="M21.0099 13.5633L21.0106 13.566L21.0106 13.566C21.1772 14.1909 20.8182 14.8696 20.1847 14.992L14.2475 16.5568C14.3213 17.7232 13.5687 18.8124 12.4001 19.1165C11.2319 19.4433 10.0178 18.8703 9.50962 17.8297L8.5302 18.0968L8.52916 18.0971C8.32165 18.1488 8.10596 18.0454 8.05162 17.8294C8.05158 17.8292 8.05154 17.829 8.05149 17.8289L4.05553 3.11528L2.15649 3.59013L2.14436 3.54162L2.15649 3.59013C1.66731 3.71244 1.13052 3.41957 0.983972 2.90648M21.0099 13.5633L1.03205 2.89275M21.0099 13.5633L21.0098 13.5631L20.5698 11.942C20.5697 11.9418 20.5697 11.9416 20.5696 11.9414C20.5153 11.7254 20.2996 11.622 20.0921 11.6738L20.0916 11.6739L18.4478 12.1018L16.6069 5.26782C16.6069 5.26768 16.6068 5.26754 16.6068 5.2674C16.5525 5.05134 16.3368 4.94784 16.1293 4.99963L16.1284 4.99985L12.5382 5.96027L11.5551 2.3247C11.555 2.32454 11.555 2.32438 11.5549 2.32423C11.5006 2.1082 11.2849 2.00472 11.0774 2.05651L11.0768 2.05666L6.44378 3.27226M21.0099 13.5633L6.44378 3.27226M0.983972 2.90648L1.03205 2.89275M0.983972 2.90648C0.983972 2.90648 0.983972 2.90649 0.983972 2.90649L1.03205 2.89275M0.983972 2.90648C0.836647 2.39078 1.15656 1.87821 1.66719 1.73236L1.66886 1.73189L1.66887 1.73192L5.39908 0.805237M1.03205 2.89275C0.893046 2.40618 1.19418 1.91946 1.68092 1.78044L5.41194 0.853563M5.39908 0.805237C5.3988 0.805317 5.39851 0.805399 5.39823 0.80548L5.41194 0.853563M5.39908 0.805237L5.39988 0.805038L5.41194 0.853563M5.39908 0.805237C5.58681 0.752216 5.80062 0.859359 5.85428 1.07282L5.85417 1.07243L5.80587 1.08537M5.41194 0.853563C5.57407 0.807331 5.75948 0.899957 5.80587 1.08537M5.80587 1.08537L5.85438 1.07323M5.80587 1.08537L6.40836 3.33325L5.85438 1.07323M5.85438 1.07323L6.44378 3.27226M5.85438 1.07323L6.44378 3.27226M4.69517 2.57863L4.69525 2.57861L4.69435 2.57593C4.64251 2.42057 4.48703 2.28683 4.3225 2.28683H4.25299V2.28535L4.24109 2.28827L1.97008 2.84449L1.97007 2.84445L1.96825 2.84497C1.90005 2.86444 1.84719 2.85279 1.80848 2.82734C1.76862 2.80114 1.7395 2.75741 1.72618 2.70655C1.69936 2.60417 1.73871 2.49141 1.85649 2.45447L5.21414 1.60938L8.86253 15.0483C8.86257 15.0485 8.86261 15.0487 8.86265 15.0488C8.91699 15.2648 9.13267 15.3683 9.34019 15.3165L9.34063 15.3164L9.80686 15.1955C9.35491 15.7407 9.17691 16.4624 9.27177 17.1303L8.69165 17.2704L4.69517 2.57863ZM10.0945 17.2925L10.0944 17.2924C9.80151 16.3462 10.3419 15.3784 11.2876 15.1308L11.2881 15.1306C12.2795 14.8603 13.2476 15.5142 13.4274 16.4132L13.4274 16.4132L13.4276 16.4141C13.6297 17.3354 13.0464 18.1691 12.1883 18.4177C11.2867 18.6655 10.3643 18.1695 10.0945 17.2925ZM19.9751 14.2927L14.0633 15.8568C13.8146 15.2186 13.2791 14.7014 12.6321 14.4619C13.2558 14.2965 13.9235 14.1196 14.6115 13.9374C16.3832 13.4682 18.2901 12.9631 19.9298 12.5249L20.2644 13.7743L20.2645 13.7745C20.3269 14.0038 20.2027 14.23 19.9761 14.2924C19.9759 14.2924 19.9757 14.2925 19.9755 14.2926L19.9751 14.2927ZM17.7252 12.3126L9.50237 14.4885L7.74419 8.02671L15.967 5.85081L17.7252 12.3126ZM6.65505 4.01763L10.915 2.88463L11.7928 6.14825L7.53271 7.28125L6.65505 4.01763Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.3"
      />
    </Template>
  );
}
