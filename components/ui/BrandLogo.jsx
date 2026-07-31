import Image from "next/image";


const LOGO = {
  ar: { dark: "/logo-on-dark.svg", light: "/logo-on-light.svg" },
  en: { dark: "/logo-en-on-dark.svg", light: "/logo-en-on-light.svg" },
};

const WIDTH = 176;
const HEIGHT = 44;


export default function BrandLogo({
  locale = "ar",
  variant = "dark",
  alt = "",
  className = "",
  priority = true,
}) {
  return (
    <Image
      src={LOGO[locale][variant]}
      alt={alt}
      width={WIDTH}
      height={HEIGHT}
      priority={priority}
      unoptimized
      className={`h-9 w-auto shrink-0 sm:h-10 ${className}`}
    />
  );
}
