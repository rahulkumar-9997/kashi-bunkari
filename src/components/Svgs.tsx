export function ProductSvg({ c1, c2, uid, h = 340 }: { c1: string; c2: string; uid: string; h?: number }) {
  return (
    <svg
      className="w-full h-full"
      viewBox={`0 0 300 ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`pr${uid}`} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor={c2} stopOpacity="0.6" />
          <stop offset="100%" stopColor={c1} stopOpacity="1" />
        </radialGradient>
      </defs>
      <rect width="300" height={h} fill={c1} />
      <rect width="300" height={h} fill={`url(#pr${uid})`} />
    </svg>
  );
}

export function CartItemSvg({ c1, c2, uid }: { c1: string; c2: string; uid: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 300 380"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`cg${uid}`} cx="40%" cy="40%" r="70%">
          <stop offset="0%" stopColor={c2} stopOpacity="0.6" />
          <stop offset="100%" stopColor={c1} stopOpacity="1" />
        </radialGradient>
      </defs>
      <rect width="300" height="380" fill={c1} />
      <rect width="300" height="380" fill={`url(#cg${uid})`} />
    </svg>
  );
}

export function SliderSvg({
  c1,
  c2,
  idx,
}: {
  c1: string;
  c2: string;
  idx: number;
}) {
  return (
    <svg
      className="slide-bg absolute inset-0 w-full h-full"
      viewBox="0 0 1280 700"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`sg${idx}`} cx="65%" cy="42%" r="70%">
          <stop offset="0%" stopColor={c2} stopOpacity="0.75" />
          <stop offset="100%" stopColor={c1} stopOpacity="1" />
        </radialGradient>
      </defs>
      <rect width="1280" height="700" fill={c1} />
      <rect width="1280" height="700" fill={`url(#sg${idx})`} />
      <g fill={c2} opacity="0.07" transform="translate(900,350)">
        <polygon points="0,-220 50,-74 208,-74 85,28 132,182 0,108 -132,182 -85,28 -208,-74 -50,-74" />
      </g>
      <g stroke={c2} strokeWidth="1" opacity="0.05" fill="none">
        <circle cx="900" cy="350" r="280" />
        <circle cx="900" cy="350" r="190" />
      </g>
    </svg>
  );
}

export function CategorySvg({ c1, c2, idx }: { c1: string; c2: string; idx: number }) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`cr${idx}`} cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor={c2} stopOpacity="0.7" />
          <stop offset="100%" stopColor={c1} stopOpacity="1" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="32" fill={c1} />
      <circle cx="32" cy="32" r="32" fill={`url(#cr${idx})`} />
      <g fill={c2} opacity="0.2" transform="translate(32,32)">
        <polygon points="0,-18 4,-6 18,-6 8,2 12,16 0,10 -12,16 -8,2 -18,-6 -4,-6" />
      </g>
    </svg>
  );
}
