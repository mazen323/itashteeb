import Image from "next/image";


export default function CompanyLogo({ company, size, className = "" }) {
  return (
    <Image
      src={company.logo}
      alt={company.name}
      width={size}
      height={size}
      unoptimized
      className={`shrink-0 rounded-xl ring-1 ring-stone-900/5 ${className}`}
    />
  );
}
