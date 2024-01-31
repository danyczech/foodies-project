"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import styles from "./nav-link.module.css";

const NavLink = ({href, children}) => {
    const path = usePathname();
return(
    <Link href={href} className={path.startsWith(href) 
    ? clsx(styles.link, styles.active) 
    : styles.link }>
        {children}
    </Link>
)
}

export default NavLink;
