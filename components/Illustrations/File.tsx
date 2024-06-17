import { SVGProps } from 'react';

export function File(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="48"
      height="60"
      fill="none"
      viewBox="0 0 48 60"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_di_8027_50959)">
        <path
          d="M10 51L38 51C40.2091 51 42 49.2091 42 47L42 13.6569C42 12.596 41.5786 11.5786 40.8284 10.8284L34.1716 4.17157C33.4214 3.42143 32.404 3 31.3431 3L10 3C7.79086 3 6 4.79086 6 7L6 47C6 49.2091 7.79086 51 10 51Z"
          fill="url(#paint0_linear_8027_50959)"
        />
      </g>
      <rect x="11" y="12" width="12" height="3" rx="1.5" fill="#7F7D83" />
      <rect
        opacity="0.5"
        x="11"
        y="19"
        width="24"
        height="3"
        rx="1.5"
        fill="#7F7D83"
      />
      <rect
        opacity="0.5"
        x="11"
        y="25"
        width="24"
        height="3"
        rx="1.5"
        fill="#7F7D83"
      />
      <defs>
        <filter
          id="filter0_di_8027_50959"
          x="0"
          y="0"
          width="48"
          height="60"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_8027_50959"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_8027_50959"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_8027_50959"
          />
        </filter>
        <linearGradient
          id="paint0_linear_8027_50959"
          x1="21.5"
          y1="94.5"
          x2="19.5"
          y2="-1"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C0C2CB" />
          <stop offset="0.916667" stopColor="#EFF0F2" />
          <stop offset="1" stopColor="#F4F5F7" />
          <stop offset="1" stopColor="#DFE3F1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default File;
