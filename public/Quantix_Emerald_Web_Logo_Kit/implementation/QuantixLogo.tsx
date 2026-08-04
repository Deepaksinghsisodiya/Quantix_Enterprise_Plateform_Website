import "./quantix-logo.css";

type Props={variant?:"full"|"compact"|"mark";className?:string;priority?:boolean};
const assets={
 full:{light:"/brand/png/full-logo/quantix-full-on-light-native.png",dark:"/brand/png/full-logo/quantix-full-on-dark-native.png"},
 compact:{light:"/brand/png/compact-logo/quantix-compact-on-light-native.png",dark:"/brand/png/compact-logo/quantix-compact-on-dark-native.png"},
 mark:{light:"/brand/png/logo-mark/quantix-mark-color-512x512.png",dark:"/brand/png/logo-mark/quantix-mark-color-512x512.png"}
} as const;
export function QuantixLogo({variant="full",className="",priority=false}:Props){const a=assets[variant];return <span className={`quantix-logo ${className}`}><img className="quantix-logo__light" src={a.light} alt="Quantix" loading={priority?"eager":"lazy"} fetchPriority={priority?"high":"auto"}/><img className="quantix-logo__dark" src={a.dark} alt="" aria-hidden="true" loading={priority?"eager":"lazy"}/></span>}
