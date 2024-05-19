import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import {Link} from "gatsby";

export const Header: React.FC = () => {
    return (
        <header className="header">
            <Link to="/">
                <StaticImage
                    alt="Company Logo"
                    src="../images/company-logo.png"
                    width={60}
                    height={60}
                />
            </Link>
        </header>
    );
}
